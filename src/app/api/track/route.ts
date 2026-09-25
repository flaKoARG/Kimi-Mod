import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseDevice } from "@/lib/auth";

// Registrar una visita a una sección de la página
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const section = body?.section || "inicio";
    const visitorId = body?.visitorId || "anon";
    const device = parseDevice(req.headers.get("user-agent"));

    await db.visit.create({
      data: { section, visitorId, device },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Si la DB no está disponible (ej: Vercel sin DB), no romper
    return NextResponse.json({ ok: false, error: "tracking_failed" }, { status: 200 });
  }
}
