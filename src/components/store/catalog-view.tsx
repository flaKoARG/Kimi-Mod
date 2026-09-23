"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABEL,
  CATEGORIES,
  type CategoryId,
  type Product,
} from "@/lib/products";
import { ProductGrid } from "./product-grid";

interface CatalogViewProps {
  title: string;
  subtitle: string;
  products: Product[];
  onQuickView: (p: Product) => void;
}

export function CatalogView({ title, subtitle, products, onQuickView }: CatalogViewProps) {
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  const availableCats = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return CATEGORIES.filter((c) => set.has(c.id));
  }, [products]);

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Filter chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          Todos
        </Chip>
        {availableCats.map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {CATEGORY_LABEL[c.id]}
          </Chip>
        ))}
        <span className="ml-auto self-center text-xs text-muted-foreground">
          {filtered.length} producto{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-6">
        <ProductGrid products={filtered} onQuickView={onQuickView} />
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-brown-dark bg-brown-dark text-white"
          : "border-border bg-background text-foreground hover:border-zinc-400"
      )}
    >
      {children}
    </button>
  );
}
