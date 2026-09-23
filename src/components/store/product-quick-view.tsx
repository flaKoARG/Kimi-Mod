"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  formatPrice,
  discountPercent,
  getProductImages,
  type Product,
} from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ImageLightbox } from "./image-lightbox";

interface QuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export function ProductQuickView({ product, open, onOpenChange }: QuickViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl overflow-hidden p-0 sm:rounded-xl">
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

  const images = getProductImages(product);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const discount = discountPercent(product.price, product.originalPrice);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="grid h-auto grid-cols-1 overflow-y-auto md:h-[85vh] md:grid-cols-2 md:overflow-hidden">
      {/* === Galería de imágenes === */}
      <div className="flex flex-col gap-3 bg-muted p-4 md:h-full md:overflow-y-auto md:p-5 scrollbar-thin">
        <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-background md:aspect-[4/5]">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ampliar imagen"
            className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
          />
          <img
            src={images[active]}
            alt={`${product.name} - foto ${active + 1}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {/* Botón de zoom (esquina inferior derecha) */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ver imagen ampliada"
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-brown-dark/70 px-3 py-1.5 text-xs font-medium text-white opacity-90 backdrop-blur transition-opacity hover:opacity-100"
          >
            <ZoomIn className="h-4 w-4" /> Ampliar
          </button>

          {/* Badges */}
          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-primary text-sm font-semibold text-primary-foreground">
                Nuevo
              </Badge>
            )}
            {discount && (
              <Badge className="bg-sale text-sm font-semibold text-sale-foreground">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Flechas (solo si hay más de una imagen) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Imagen anterior"
                className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Imagen siguiente"
                className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow transition-colors hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Contador de imágenes */}
          {images.length > 1 && (
            <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-brown-dark/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {active + 1} / {images.length}
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActive(i)}
                aria-label={`Ver foto ${i + 1}`}
                className={cn(
                  "relative h-16 w-16 flex-none overflow-hidden rounded-lg border-2 bg-background transition-all",
                  active === i
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* === Detalle del producto === */}
      <div className="flex h-auto flex-col gap-4 overflow-visible p-6 scrollbar-thin md:h-full md:overflow-y-auto md:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.gender === "hombre" ? "Hombre" : "Mujer"} · {product.category}
          </p>
          <h2 className="mt-1.5 text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl">
            {product.name}
          </h2>
        </div>

        {/* Precio */}
        <div className="flex flex-wrap items-baseline gap-2.5">
          <span className="text-3xl font-black text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount && (
            <Badge className="bg-sale px-2.5 py-1 text-sm font-bold text-sale-foreground">
              Ahorro {discount}%
            </Badge>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Colors */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Color:{" "}
            <span className="font-normal normal-case text-muted-foreground">{color}</span>
          </p>
          <div className="flex items-center gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setColor(c.name)}
                className={cn(
                  "relative h-8 w-8 rounded-full border-2 transition-transform",
                  color === c.name
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-zinc-300 hover:scale-110"
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              >
                {color === c.name && (
                  <Check className="absolute inset-0 m-auto h-4 w-4 text-white mix-blend-difference" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Talle:{" "}
            <span className="font-normal normal-case text-muted-foreground">{size}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-11 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors",
                  size === s
                    ? "border-brown-dark bg-brown-dark text-white"
                    : "border-border bg-background text-foreground hover:border-zinc-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Qty + Add (sticky al fondo del panel en desktop) */}
        <div className="mt-auto flex items-center gap-3 pt-3">
          <div className="flex items-center rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-none"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Restar"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center text-base font-bold">{qty}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-none"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Sumar"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="lg"
            className="flex-1 gap-2 bg-brown-dark text-base text-white hover:bg-brown-dark/90"
            onClick={() => {
              add(product, size, color, qty);
              onOpenChange(false);
            }}
          >
            <ShoppingBag className="h-5 w-5" /> Agregar al carrito
          </Button>
        </div>
      </div>

      {/* Lightbox de pantalla completa */}
      <ImageLightbox
        key={lightboxOpen ? `open-${active}` : "closed"}
        images={images}
        startIndex={active}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActive}
        alt={product.name}
      />
    </div>
  );
}
