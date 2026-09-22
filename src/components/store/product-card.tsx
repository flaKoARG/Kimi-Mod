"use client";

import { useState } from "react";
import { ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, discountPercent, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const add = useCart((s) => s.add);
  const discount = discountPercent(product.price, product.originalPrice);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground shadow-sm">Nuevo</Badge>
          )}
          {discount && (
            <Badge className="bg-sale text-sale-foreground shadow-sm">-{discount}%</Badge>
          )}
        </div>
        {/* Quick view overlay */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Vista rápida de ${product.name}`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow">
            <Eye className="h-3.5 w-3.5" /> Vista rápida
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
            {product.name}
          </h3>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => setColor(c.name)}
              className={cn(
                "h-4 w-4 rounded-full border transition-transform",
                color === c.name
                  ? "border-primary ring-2 ring-primary/30 scale-110"
                  : "border-zinc-300 hover:scale-110"
              )}
              style={{ backgroundColor: c.hex }}
              aria-label={`Color ${c.name}`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          className="mt-2 w-full gap-1.5 bg-zinc-950 text-white hover:bg-zinc-800"
          onClick={() =>
            add(product, product.sizes[0], color)
          }
        >
          <ShoppingBag className="h-4 w-4" /> Agregar
        </Button>
      </div>
    </div>
  );
}
