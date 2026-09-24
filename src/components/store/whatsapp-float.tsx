"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const PHONE_INTL = "542645034198"; // +54 9 264 503-4198
const WHATSAPP_URL = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
  "Hola Kimi Mod! Quiero hacer una consulta sobre una prenda."
)}`;

const STORAGE_KEY = "kimi-mod-wa-dismissed";

export function WhatsAppFloat() {
  const [dismissed, setDismissed] = useState(true);

  // Mostrar el botón después de 3 segundos (si no fue cerrado antes)
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === "true";
    if (wasDismissed) return;
    const timer = setTimeout(() => setDismissed(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
  };

  if (dismissed) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-5 left-5 z-[60] flex items-center"
    >
      <div className="relative flex items-center">
        {/* Botón principal */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <MessageCircle className="h-7 w-7 text-white" fill="currentColor" />
        </div>

        {/* Botón cerrar (X) */}
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-700 shadow-md ring-2 ring-[#25D366] transition-colors hover:bg-zinc-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </a>
  );
}
