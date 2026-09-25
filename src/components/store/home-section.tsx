"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "./category-grid";
import { ProductCard } from "./product-card";
import { HowToBuy } from "./how-to-buy";
import type { TabId } from "./header";
import {
  getNewProducts,
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

      {/* Cómo comprar */}
      <HowToBuy />
    </div>
  );
}
