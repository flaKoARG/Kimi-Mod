"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Eye,
  Users,
  Calendar,
  TrendingUp,
  ShoppingBag,
  LogOut,
  Monitor,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getVisitorId } from "@/lib/auth";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

interface Stats {
  totalVisits: number;
  todayVisits: number;
  yesterdayVisits: number;
  uniqueVisitors: number;
  sections: { section: string; count: number }[];
  byDay: { date: string; count: number }[];
  devices: { device: string; count: number }[];
  topProducts: { productId: string; productName: string; views: number }[];
  totalProductViews: number;
  dbError?: boolean;
}

const SECTION_LABELS: Record<string, string> = {
  inicio: "Inicio",
  hombre: "Hombre",
  mujer: "Mujer",
  categorias: "Categorías",
};

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Verificar si ya hay sesión activa al abrir
  useEffect(() => {
    if (!open) return;
    checkSession();
  }, [open]);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        setAuthed(true);
        loadStats();
      }
    } catch {
      // no autenticado
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthed(true);
        setUsername("");
        setPassword("");
        loadStats();
      } else {
        setError(data.error || "Error al iniciar sesión");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setStats(null);
  };

  const loadStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // error silencioso
    } finally {
      setLoadingStats(false);
    }
  }, []);

  if (!open) return null;

  const maxDay = stats?.byDay?.length
    ? Math.max(...stats.byDay.map((d) => d.count), 1)
    : 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl scrollbar-thin">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Panel de Administración
              </h2>
              <p className="text-xs text-muted-foreground">Kimi Mod</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {authed && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={loadStats}
                  disabled={loadingStats}
                  aria-label="Actualizar"
                  className="h-9 w-9"
                >
                  <RefreshCw className={cn("h-4 w-4", loadingStats && "animate-spin")} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" /> Salir
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Cerrar"
              className="h-9 w-9"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {!authed ? (
            <LoginForm
              username={username}
              password={password}
              error={error}
              loading={loading}
              onUsername={setUsername}
              onPassword={setPassword}
              onSubmit={handleLogin}
            />
          ) : (
            <Dashboard stats={stats} loading={loadingStats} maxDay={maxDay} onRefresh={loadStats} />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm({
  username,
  password,
  error,
  loading,
  onUsername,
  onPassword,
  onSubmit,
}: {
  username: string;
  password: string;
  error: string;
  loading: boolean;
  onUsername: (v: string) => void;
  onPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="mx-auto max-w-sm py-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Monitor className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Acceso restringido</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Ingresá tus credenciales de administrador
        </p>
      </div>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="admin-user">Usuario</Label>
          <Input
            id="admin-user"
            value={username}
            onChange={(e) => onUsername(e.target.value)}
            placeholder="KimiAdmin"
            autoComplete="username"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="admin-pass">Contraseña</Label>
          <Input
            id="admin-pass"
            type="password"
            value={password}
            onChange={(e) => onPassword(e.target.value)}
            placeholder="••••••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard({
  stats,
  loading,
  maxDay,
  onRefresh,
}: {
  stats: Stats | null;
  loading: boolean;
  maxDay: number;
  onRefresh: () => void;
}) {
  if (loading && !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          Reintentar
        </Button>
      </div>
    );
  }

  const trend =
    stats.yesterdayVisits > 0
      ? ((stats.todayVisits - stats.yesterdayVisits) / stats.yesterdayVisits) * 100
      : null;

  return (
    <div className="space-y-6">
      {stats.dbError && (
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-700 dark:text-yellow-400">
          ⚠️ La base de datos no está disponible. Las métricas se muestran vacías.
          En producción (Vercel) necesitás configurar una base de datos PostgreSQL.
        </div>
      )}

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          icon={<Eye className="h-5 w-5" />}
          label="Visitas totales"
          value={stats.totalVisits.toLocaleString("es-AR")}
        />
        <MetricCard
          icon={<Calendar className="h-5 w-5" />}
          label="Visitas hoy"
          value={stats.todayVisits.toLocaleString("es-AR")}
          trend={trend}
        />
        <MetricCard
          icon={<Users className="h-5 w-5" />}
          label="Visitantes únicos"
          value={stats.uniqueVisitors.toLocaleString("es-AR")}
        />
        <MetricCard
          icon={<ShoppingBag className="h-5 w-5" />}
          label="Productos vistos"
          value={stats.totalProductViews.toLocaleString("es-AR")}
        />
      </div>

      {/* Gráfico de visitas (últimos 7 días) */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-bold text-foreground">
          Visitas de los últimos 7 días
        </h3>
        <div className="flex h-40 items-end gap-2">
          {stats.byDay.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count > 0 ? "4px" : "0" }}
                  title={`${d.count} visitas`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Visitas por sección */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-bold text-foreground">
            Visitas por sección (7 días)
          </h3>
          <div className="space-y-3">
            {stats.sections.length === 0 ? (
              <p className="text-xs text-muted-foreground">Sin datos</p>
            ) : (
              stats.sections
                .sort((a, b) => b.count - a.count)
                .map((s) => {
                  const max = Math.max(...stats.sections.map((x) => x.count), 1);
                  return (
                    <div key={s.section}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground">
                          {SECTION_LABELS[s.section] || s.section}
                        </span>
                        <span className="text-muted-foreground">{s.count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(s.count / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Dispositivos */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-bold text-foreground">
            Dispositivos (7 días)
          </h3>
          <div className="space-y-2">
            {stats.devices.length === 0 ? (
              <p className="text-xs text-muted-foreground">Sin datos</p>
            ) : (
              stats.devices.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    {d.device}
                  </span>
                  <span className="font-semibold text-foreground">{d.count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Productos más vistos */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-bold text-foreground">
          Productos más vistos (Top 10)
        </h3>
        {stats.topProducts.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Todavía no hay productos vistos en el Quick View.
          </p>
        ) : (
          <div className="space-y-2">
            {stats.topProducts.map((p, i) => (
              <div
                key={p.productId}
                className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-sm font-medium text-foreground">
                  {p.productName}
                </span>
                <span className="flex-none text-sm font-semibold text-muted-foreground">
                  {p.views} {p.views === 1 ? "vista" : "vistas"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: number | null;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-black text-foreground">{value}</p>
      {trend !== undefined && trend !== null && (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            trend >= 0 ? "text-green-600" : "text-red-600"
          )}
        >
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(0)}% vs ayer
        </p>
      )}
    </div>
  );
}
