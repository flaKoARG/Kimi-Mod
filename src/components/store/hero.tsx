"use client";

import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TabId } from "./header";

interface HeroProps {
  onTab: (t: TabId) => void;
}

export function Hero({ onTab }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Colección Kimi Mod"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 lg:min-h-[640px] lg:px-8 lg:pb-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
            Nueva colección · Otoño/Invierno
          </span>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Moda urbana para
            <br />
            <span className="text-primary">vivir tu estilo</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-zinc-200 sm:text-base">
            Pantalones, remeras, camperas y polleras en negro, azul y rojo.
            Diseño propio para mujer y hombre. Hasta 40% OFF en seleccionados.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onTab("mujer")}
            >
              Ver Mujer <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 border border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => onTab("hombre")}
            >
              Ver Hombre
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-sale hover:bg-sale/10 hover:text-sale"
              onClick={() => onTab("sale")}
            >
              Ir al Sale
            </Button>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-xs">
            <Feature icon={<Truck className="h-4 w-4" />} title="Envíos" desc="A todo el país" />
            <Feature icon={<RefreshCw className="h-4 w-4" />} title="Cambios" desc="30 días" />
            <Feature icon={<ShieldCheck className="h-4 w-4" />} title="Pago" desc="100% seguro" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
      <span className="text-primary">{icon}</span>
      <div className="leading-tight">
        <p className="font-semibold text-white">{title}</p>
        <p className="text-zinc-300">{desc}</p>
      </div>
    </div>
  );
}
