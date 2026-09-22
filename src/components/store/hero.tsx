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
      {/* Glow decorativo de fondo */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-sale/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:min-h-[640px] lg:px-8">
        {/* Logo central */}
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <img
            src="/images/logo/Rojo.png"
            alt="Kimi Mod — Tu esencia. Tu estilo."
            className="mx-auto h-40 w-auto rounded-2xl object-contain shadow-2xl shadow-primary/20 sm:h-52 lg:h-60"
          />
        </div>

        <span className="mt-8 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
          Nueva colección · Otoño/Invierno
        </span>

        <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          Tu esencia. Tu estilo.
        </h1>

        <p className="mt-4 max-w-md text-sm text-zinc-200 sm:text-base">
          Pantalones, remeras, camperas y polleras. Diseño propio para mujer y
          hombre. Hasta 40% OFF en seleccionados.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
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

        <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-3 text-xs">
          <Feature icon={<Truck className="h-4 w-4" />} title="Envíos" desc="A todo el país" />
          <Feature icon={<RefreshCw className="h-4 w-4" />} title="Cambios" desc="30 días" />
          <Feature icon={<ShieldCheck className="h-4 w-4" />} title="Pago" desc="100% seguro" />
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
