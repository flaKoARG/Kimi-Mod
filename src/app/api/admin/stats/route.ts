import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

// Obtener estadísticas para el panel de admin (protegido)
export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Total de visitas
    const totalVisits = await db.visit.count();

    // Visitas de hoy
    const todayVisits = await db.visit.count({
      where: { createdAt: { gte: todayStart } },
    });

    // Visitas de ayer (para comparar)
    const yesterdayVisits = await db.visit.count({
      where: {
        createdAt: { gte: yesterdayStart, lt: todayStart },
      },
    });

    // Visitantes únicos
    const uniqueVisitors = await db.visit.groupBy({
      by: ["visitorId"],
      _count: { visitorId: true },
    });

    // Visitas por sección (últimos 7 días)
    const sectionStats = await db.visit.groupBy({
      by: ["section"],
      _count: { section: true },
      where: { createdAt: { gte: weekAgo } },
    });

    // Visitas por día (últimos 7 días)
    const recentVisits = await db.visit.findMany({
      where: { createdAt: { gte: weekAgo } },
      select: { createdAt: true },
    });

    const byDay: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = recentVisits.filter(
        (v) => v.createdAt >= d && v.createdAt < next
      ).length;
      byDay.push({
        date: d.toLocaleDateString("es-AR", { weekday: "short", day: "numeric" }),
        count,
      });
    }

    // Dispositivos más usados (últimos 7 días)
    const deviceStats = await db.visit.groupBy({
      by: ["device"],
      _count: { device: true },
      where: { createdAt: { gte: weekAgo } },
      orderBy: { _count: { device: "desc" } },
      take: 5,
    });

    // Productos más vistos (top 10)
    const topProducts = await db.productView.groupBy({
      by: ["productId", "productName"],
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: 10,
    });

    // Total de productos vistos
    const totalProductViews = await db.productView.count();

    return NextResponse.json({
      totalVisits,
      todayVisits,
      yesterdayVisits,
      uniqueVisitors: uniqueVisitors.length,
      sections: sectionStats.map((s) => ({
        section: s.section,
        count: s._count.section,
      })),
      byDay,
      devices: deviceStats.map((d) => ({
        device: d.device || "desconocido",
        count: d._count.device,
      })),
      topProducts: topProducts.map((p) => ({
        productId: p.productId,
        productName: p.productName,
        views: p._count.productId,
      })),
      totalProductViews,
    });
  } catch {
    // Si la DB no está disponible, devolver estructura vacía
    return NextResponse.json({
      totalVisits: 0,
      todayVisits: 0,
      yesterdayVisits: 0,
      uniqueVisitors: 0,
      sections: [],
      byDay: [],
      devices: [],
      topProducts: [],
      totalProductViews: 0,
      dbError: true,
    });
  }
}
