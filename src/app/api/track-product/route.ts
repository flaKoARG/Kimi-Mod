import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Registrar una vista de producto en el Quick View
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = body?.productId;
    const productName = body?.productName;
    const visitorId = body?.visitorId || "anon";

    if (!productId || !productName) {
      return NextResponse.json({ ok: false, error: "missing_data" }, { status: 400 });
    }

    await db.productView.create({
      data: { productId, productName, visitorId },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "tracking_failed" }, { status: 200 });
  }
}
