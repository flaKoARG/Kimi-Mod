import { db } from "@/lib/db";

// Credenciales del administrador
// Usuario: KimiAdmin
// Password: &ALMv-57LqZ-y2#&8-#sKyr
export const ADMIN_USER = "KimiAdmin";
export const ADMIN_PASSWORD = "&ALMv-57LqZ-y2#&8-#sKyr";

// Clave para firmar la cookie de sesión (en producción usar una env var)
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "kimi-mod-admin-secret-2024-change-in-prod";
const SESSION_COOKIE = "kimi_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

/** Verifica las credenciales del admin */
export function verifyCredentials(user: string, pass: string): boolean {
  return user === ADMIN_USER && pass === ADMIN_PASSWORD;
}

/** Crea un token de sesión simple (base64 del payload firmado) */
export function createSessionToken(): string {
  const payload = {
    user: ADMIN_USER,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const data = JSON.stringify(payload);
  const b64 = Buffer.from(data).toString("base64");
  const signature = Buffer.from(b64 + SESSION_SECRET)
    .toString("base64")
    .slice(0, 32);
  return `${b64}.${signature}`;
}

/** Valida un token de sesión */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [b64, signature] = token.split(".");
  if (!b64 || !signature) return false;
  const expectedSignature = Buffer.from(b64 + SESSION_SECRET)
    .toString("base64")
    .slice(0, 32);
  if (signature !== expectedSignature) return false;
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64").toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE;

// === TRACKING DE VISITAS ===

const VISITOR_ID_KEY = "kimi_visitor_id";

/** Genera o recupera el ID anónimo del visitante (para no duplicar) */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

/** Registra una visita a una sección (client → API) */
export async function trackVisit(section: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const visitorId = getVisitorId();
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, visitorId }),
    });
  } catch {
    // silencioso: el tracking no debe romper la UX
  }
}

/** Registra una vista de producto en el Quick View (client → API) */
export async function trackProductView(
  productId: string,
  productName: string
): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const visitorId = getVisitorId();
    await fetch("/api/track-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, productName, visitorId }),
    });
  } catch {
    // silencioso
  }
}

/** Resumen del dispositivo desde el user-agent */
export function parseDevice(ua: string | null): string {
  if (!ua) return "desconocido";
  let browser = "Otro";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/")) browser = "Safari";

  let os = "Otro";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  return `${browser} · ${os}`;
}
