"use client";

import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryGrid } from "./category-grid";
import { ProductCard } from "./product-card";
import type { TabId } from "./header";
import {
  getNewProducts,
  getSaleProducts,
  formatPrice,
  type CategoryId,
  type Product,
} from "@/lib/products";

interface HomeSectionProps {
  onTab: (t: TabId) => void;
  onCategory: (c: CategoryId) => void;
  onQuickView: (p: Product) => void;
}

export function HomeSection({ onTab, onCategory, onQuickView }: HomeSectionProps) {
  const news = getNewProducts().slice(0, 4);
  const saleTop = getSaleProducts().slice(0, 1)[0];

  return (
    <div>
      {/* Novedades */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Novedades
            </h2>
            <p className="text-sm text-muted-foreground">
              Lo último que llegó a la tienda
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-primary hover:text-primary"
            onClick={() => onTab("mujer")}
          >
            Ver todo <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {news.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
          ))}
        </div>
      </section>

      {/* Sale banner */}
      {saleTop && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onTab("sale")}
            className="group relative flex w-full flex-col items-start gap-3 overflow-hidden rounded-2xl bg-zinc-950 p-6 text-left text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sale px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-sale-foreground">
                <Flame className="h-3.5 w-3.5" /> Sale
              </span>
              <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                Hasta 40% OFF
              </h3>
              <p className="mt-1 max-w-md text-sm text-zinc-300">
                Remeras, camperas, jeans y polleras con descuento. Stock limitado.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition-transform group-hover:translate-x-1">
              Comprar ofertas <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </section>
      )}

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Comprar por categoría
            </h2>
            <p className="text-sm text-muted-foreground">
              Encontrá lo que buscás más rápido
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-primary hover:text-primary"
            onClick={() => onTab("categorias")}
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6">
          <CategoryGrid onSelect={onCategory} />
        </div>
      </section>
    </div>
  );
}
