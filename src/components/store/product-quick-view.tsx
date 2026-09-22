"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, discountPercent, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

interface QuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export function ProductQuickView({ product, open, onOpenChange }: QuickViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0 sm:rounded-xl">
        <DialogTitle className="sr-only">{product?.name ?? "Producto"}</DialogTitle>
        <DialogDescription className="sr-only">
          {product?.description ?? "Detalle del producto"}
        </DialogDescription>
        {product && (
          <QuickViewBody key={product.id} product={product} onOpenChange={onOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function QuickViewBody({
  product,
  onOpenChange,
}: {
  product: Product;
  onOpenChange: (o: boolean) => void;
}) {
  const add = useCart((s) => s.add);
  const [size, setSize] = useState<string>(product.sizes[0] ?? "");
  const [color, setColor] = useState<string>(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative aspect-[3/4] bg-muted md:aspect-auto">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>
          )}
          {discount && (
            <Badge className="bg-sale text-sale-foreground">-{discount}%</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {product.gender === "hombre" ? "Hombre" : "Mujer"} · {product.category}
          </p>
          <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
            {product.name}
          </h2>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount && (
            <Badge className="bg-sale text-sale-foreground">Ahorro {discount}%</Badge>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Colors */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Color:{" "}
            <span className="font-normal normal-case text-muted-foreground">{color}</span>
          </p>
          <div className="flex items-center gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setColor(c.name)}
                className={cn(
                  "relative h-7 w-7 rounded-full border transition-transform",
                  color === c.name
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-zinc-300 hover:scale-110"
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              >
                {color === c.name && (
                  <Check className="absolute inset-0 m-auto h-3.5 w-3.5 text-white mix-blend-difference" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Talle:{" "}
            <span className="font-normal normal-case text-muted-foreground">{size}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-10 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                  size === s
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-border bg-background text-foreground hover:border-zinc-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Qty + Add */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <div className="flex items-center rounded-md border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Restar"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Sumar"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="flex-1 gap-2 bg-zinc-950 text-white hover:bg-zinc-800"
            onClick={() => {
              add(product, size, color, qty);
              onOpenChange(false);
            }}
          >
            <ShoppingBag className="h-4 w-4" /> Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
