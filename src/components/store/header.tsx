"use client";

import { useState } from "react";
import { Menu, ShoppingBag, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export type TabId = "inicio" | "hombre" | "mujer" | "categorias" | "sale";

const NAV: { id: TabId; label: string; sale?: boolean }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "hombre", label: "Hombre" },
  { id: "mujer", label: "Mujer" },
  { id: "categorias", label: "Categorías" },
  { id: "sale", label: "Sale", sale: true },
];

interface HeaderProps {
  active: TabId;
  onTab: (t: TabId) => void;
  onSearch: () => void;
}

export function Header({ active, onTab, onSearch }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.setOpen);

  const go = (t: TabId) => {
    onTab(t);
    setMobileOpen(false);
  };

  // En mobile: si no estamos en inicio, mostramos botón "atrás" en lugar del menú hamburguesa
  const showBackOnMobile = active !== "inicio";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brown-dark text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:px-6 lg:px-8">
        {/* Mobile: botón atrás o menú hamburguesa */}
        {showBackOnMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => go("inicio")}
            className="text-white hover:bg-white/10 md:hidden"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 md:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-white/10 bg-brown-dark p-0 text-white">
              <div className="px-6 pt-6">
                <img
                  src="/images/logo/Rojo.png"
                  alt="Kimi Mod"
                  className="h-14 w-auto rounded-lg object-contain"
                />
              </div>
              <SheetTitle className="sr-only">Menú Kimi Mod</SheetTitle>
              <nav className="mt-4 flex flex-col">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => go(n.id)}
                    className={cn(
                      "flex items-center justify-between border-l-2 px-6 py-3 text-left text-base font-medium transition-colors",
                      active === n.id
                        ? "border-primary bg-white/5 text-white"
                        : "border-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
                      n.sale && "text-sale"
                    )}
                  >
                    {n.label}
                    {n.sale && (
                      <span className="rounded bg-sale px-1.5 py-0.5 text-[10px] font-bold uppercase">
                        Ofertas
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}

        {/* Logo (en mobile se achica si hay botón atrás para dejar espacio al carrito) */}
        <button
          onClick={() => go("inicio")}
          className="flex select-none items-center"
          aria-label="Kimi Mod inicio"
        >
          <img
            src="/images/logo/Rojo.png"
            alt="Kimi Mod"
            className={cn(
              "h-11 w-auto rounded-lg object-contain sm:h-12",
              showBackOnMobile ? "h-9 sm:h-12" : "h-11"
            )}
          />
        </button>

        {/* Desktop nav */}
        <nav className="ml-6 hidden flex-1 items-center gap-1 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onTab(n.id)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active === n.id
                  ? "bg-white/10 text-white"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white",
                n.sale && active !== n.id && "text-sale hover:text-sale"
              )}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Acciones: buscar + carrito SIEMPRE visibles */}
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearch}
            className="text-white hover:bg-white/10"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openCart(true)}
            className="relative text-white hover:bg-white/10"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
