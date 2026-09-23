"use client";

import { ProductCard } from "./product-card";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  onQuickView: (p: Product) => void;
}

export function ProductGrid({ products, onQuickView }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border p-8 text-center">
        <p className="text-sm font-medium text-foreground">No hay productos en esta selección.</p>
        <p className="text-xs text-muted-foreground">Pronto sumaremos nuevas prendas. Volvé pronto.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
