"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface CartLine {
  id: string; // product id + size + color
  product: Product;
  size: string;
  color: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, size: string, color: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      setOpen: (open) => set({ isOpen: open }),
      add: (product, size, color, qty = 1) => {
        const id = `${product.id}-${size}-${color}`;
        const existing = get().lines.find((l) => l.id === id);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.id === id ? { ...l, qty: l.qty + qty } : l
            ),
            isOpen: true,
          });
        } else {
          set({
            lines: [...get().lines, { id, product, size, color, qty }],
            isOpen: true,
          });
        }
      },
      remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
      setQty: (id, qty) =>
        set({
          lines: get()
            .lines.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l))
            .filter((l) => l.qty > 0),
        }),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((s, l) => s + l.qty, 0),
      total: () => get().lines.reduce((s, l) => s + l.qty * l.product.price, 0),
    }),
    { name: "kimi-mod-cart" }
  )
);
