"use client";

import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const open = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.total());
  const count = useCart((s) => s.count());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" />
            Tu carrito
            {count > 0 && (
              <span className="text-sm font-normal text-muted-foreground">({count})</span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Productos agregados a tu carrito de compras
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">El carrito está vacío</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Agregá productos para continuar con la compra.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Seguir comprando
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-3">
              <div className="flex flex-col gap-3 py-3">
                {lines.map((l) => (
                  <div
                    key={l.id}
                    className="flex gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <img
                      src={l.product.image}
                      alt={l.product.name}
                      className="h-24 w-20 flex-none rounded-md object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="line-clamp-2 text-sm font-semibold text-foreground">
                          {l.product.name}
                        </h4>
                        <button
                          onClick={() => remove(l.id)}
                          className="text-muted-foreground hover:text-sale"
                          aria-label="Quitar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Talle {l.size} · {l.color}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => setQty(l.id, l.qty - 1)}
                            aria-label="Restar"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold">{l.qty}</span>
                          <button
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => setQty(l.id, l.qty + 1)}
                            aria-label="Sumar"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {formatPrice(l.product.price * l.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={clear}
                  className="mx-auto flex w-fit items-center gap-1.5 text-xs text-muted-foreground hover:text-sale"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Vaciar carrito
                </button>
              </div>
            </ScrollArea>

            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Envíos a todo el país · 3 cuotas sin interés
              </p>
              <Button className="mt-3 w-full bg-brown-dark text-white hover:bg-brown-dark/90">
                Finalizar compra
              </Button>
              <Button
                variant="outline"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Seguir comprando
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
