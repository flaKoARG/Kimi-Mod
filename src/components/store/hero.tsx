"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TabId } from "./header";

interface HeroProps {
  onTab: (t: TabId) => void;
}

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: { label: string; tab: TabId; primary?: boolean }[];
}

const SLIDES: Slide[] = [
  {
    image: "/images/logo/bannerkimi.jpeg",
    alt: "Kimi Mod — Tu esencia. Tu estilo.",
    eyebrow: "Todo lo Nuevo · Otoño/Invierno",
    title: "Tu esencia.",
    highlight: "Tu estilo.",
    description:
      "Pantalones, remeras, camperas y polleras. Diseño propio para mujer y hombre. Hasta 40% OFF en seleccionados.",
    cta: [
      { label: "Ver Mujer", tab: "mujer", primary: true },
      { label: "Ver Hombre", tab: "hombre" },
      { label: "Ir al Sale", tab: "sale" },
    ],
  },
  {
    image: "/images/products/h-campera-brave.jpg",
    alt: "Campera Clusterman Brave",
    eyebrow: "Camperas y Buzos · Hombre",
    title: "Clusterman",
    highlight: "Brave",
    description:
      "Bomber de nylon acolchado en negro, con estampado gráfico blanco y piping contrastante. Cierre frontal y puños acanalados.",
    cta: [
      { label: "Ver Camperas", tab: "categorias", primary: true },
      { label: "Ver Hombre", tab: "hombre" },
    ],
  },
  {
    image: "/images/products/h-buzo-mixed.jpg",
    alt: "Buzo Mixed Feelings",
    eyebrow: "Camperas y Buzos · Hombre",
    title: "Buzo Mixed",
    highlight: "Feelings",
    description:
      "Quarter-zip negro de frizado con estampado 'Mixed Feelings London'. Cuello alto, media cremillera y fit oversize unisex.",
    cta: [
      { label: "Ver Buzos", tab: "categorias", primary: true },
      { label: "Ver Hombre", tab: "hombre" },
    ],
  },
  {
    image: "/images/products/PantalonJean5.jpeg",
    alt: "Jean Roto Negro con Cadena",
    eyebrow: "Pantalones · Mujer",
    title: "Jean Roto",
    highlight: "con Cadena",
    description:
      "Jean negro de corte relajado con roturas en las rodillas y cadena decorativa. Estilo urbano con detalle de hardware.",
    cta: [
      { label: "Ver Pantalones", tab: "categorias", primary: true },
      { label: "Ver Mujer", tab: "mujer" },
    ],
  },
  {
    image: "/images/products/h-campera-opposite.jpg",
    alt: "Campera Opposite",
    eyebrow: "Camperas y Buzos · Hombre",
    title: "Campera",
    highlight: "Opposite",
    description:
      "Frizado verde bosque con paneles color-block crema en espalda. Cuello alto, media cremillera y fit relajado.",
    cta: [
      { label: "Ver Camperas", tab: "categorias", primary: true },
      { label: "Ver Hombre", tab: "hombre" },
    ],
  },
];

const AUTOPLAY_MS = 5000;

export function Hero({ onTab }: HeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay: se reinicia el timer tras cada cambio (manual o automático)
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [paused, count, active]);

  const slide = SLIDES[active];
  const isBanner = active === 0;

  return (
    <section
      className="relative overflow-hidden bg-brown-dark text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides de fondo */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.image}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              i === active ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={s.image}
              alt={s.alt}
              className={cn(
                "h-full w-full",
                isBanner && i === 0 ? "object-contain" : "object-cover object-center"
              )}
            />
            {/* Overlay para legibilidad del texto */}
            {!isBanner && (
              <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/90 via-brown-dark/60 to-brown-dark/30" />
            )}
            {isBanner && (
              <div className="absolute inset-0 bg-brown-dark/40" />
            )}
          </div>
        ))}
        {/* Glow decorativo */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]" />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:min-h-[640px] lg:px-8">
        <span
          key={`eyebrow-${active}`}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur"
        >
          {slide.eyebrow}
        </span>

        <h1
          key={`title-${active}`}
          className="animate-in fade-in slide-in-from-bottom-3 duration-700 mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {slide.title}
          <br />
          <span className="text-primary">{slide.highlight}</span>
        </h1>

        {/* La descripción solo se muestra en el slide del banner (no en las prendas) */}
        {isBanner && (
          <p
            key={`desc-${active}`}
            className="animate-in fade-in slide-in-from-bottom-2 duration-700 mt-4 max-w-md text-sm text-zinc-100 sm:text-base"
          >
            {slide.description}
          </p>
        )}

        <div className={cn("flex flex-wrap justify-center gap-3", isBanner ? "mt-6" : "mt-8")}>
          {slide.cta.map((c) => (
            <Button
              key={c.label}
              size="lg"
              variant={c.primary ? "default" : "secondary"}
              className={cn(
                "gap-2",
                c.primary
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => onTab(c.tab)}
            >
              {c.label} {c.primary && <ArrowRight className="h-4 w-4" />}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-3 text-xs">
          <Feature icon={<Truck className="h-4 w-4" />} title="Envíos" desc="A todo el país" />
          <Feature icon={<RefreshCw className="h-4 w-4" />} title="Cambios" desc="30 días" />
          <Feature icon={<ShieldCheck className="h-4 w-4" />} title="Pago" desc="100% seguro" />
        </div>
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:left-4"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        aria-label="Slide siguiente"
        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:right-4"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Puntos indicadores */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === active
                ? "w-8 bg-primary"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
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
