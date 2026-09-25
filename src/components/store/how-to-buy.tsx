"use client";

import { MessageCircle, MousePointerClick, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_INTL = "542645034198";
const WHATSAPP_URL = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
  "Hola Kimi Mod! Quiero hacer un pedido de compra."
)}`;

const STEPS = [
  {
    icon: MousePointerClick,
    title: "1. Elegí tu prenda",
    desc: "Explorá el catálogo, elegí el talle y el color que más te guste.",
  },
  {
    icon: MessageCircle,
    title: "2. Escribinos por WhatsApp",
    desc: "Tocá el botón de WhatsApp y contanos qué prenda querés pedir.",
  },
  {
    icon: Truck,
    title: "3. Coordinamos el envío",
    desc: "Te pasamos toda la info de envío: costo, forma y tiempos de entrega.",
  },
  {
    icon: CreditCard,
    title: "4. Elegí el pago",
    desc: "Te indicamos los métodos de pago disponibles y abonás tu compra.",
  },
];

export function HowToBuy() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Cómo comprar
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Para realizar un pedido tenés que hablar por WhatsApp, donde te
            daremos toda la información de envío y el método de pago a realizar.
          </p>
        </div>

        {/* Pasos */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center rounded-2xl bg-background p-5 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA WhatsApp */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button
            size="lg"
            asChild
            className="gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5d]"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hacer pedido por WhatsApp"
            >
              <MessageCircle className="h-5 w-5" fill="currentColor" />
              Hacer pedido por WhatsApp
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Respondemos rápido · Lunes a sábado de 9 a 20 hs
          </p>
        </div>
      </div>
    </section>
  );
}
