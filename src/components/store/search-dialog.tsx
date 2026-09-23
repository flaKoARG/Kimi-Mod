"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  PRODUCTS,
  CATEGORY_LABEL,
  formatPrice,
  type Product,
} from "@/lib/products";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSelect: (p: Product) => void;
}

export function SearchDialog({ open, onOpenChange, onSelect }: SearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0 sm:rounded-xl">
        <DialogTitle className="sr-only">Buscar productos</DialogTitle>
        <DialogDescription className="sr-only">
          Buscá remeras, pantalones, camperas y polleras en Kimi Mod.
        </DialogDescription>
        {open && (
          <SearchBody
            onSelect={(p) => {
              onSelect(p);
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function SearchBody({ onSelect }: { onSelect: (p: Product) => void }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return PRODUCTS.slice(0, 6);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.gender.toLowerCase().includes(term) ||
        CATEGORY_LABEL[p.category].toLowerCase().includes(term)
    ).slice(0, 8);
  }, [q]);

  return (
    <>
      <div className="flex items-center gap-2 border-b border-border px-4">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <Input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar remeras, pantalones, camperas, polleras…"
          className="h-12 border-0 px-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
        {results.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">
            No encontramos resultados para “{q}”.
          </p>
        ) : (
          <ul className="flex flex-col">
            {results.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => onSelect(p)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-accent"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-14 w-12 flex-none rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.gender === "hombre" ? "Hombre" : "Mujer"} ·{" "}
                      {CATEGORY_LABEL[p.category]}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-foreground">
                      {formatPrice(p.price)}
                    </span>
                    {p.originalPrice && (
                      <Badge className="bg-sale text-sale-foreground">Sale</Badge>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
