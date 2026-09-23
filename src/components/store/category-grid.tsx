"use client";

import { ArrowRight } from "lucide-react";
import { CATEGORIES, type CategoryId } from "@/lib/products";

interface CategoryGridProps {
  onSelect: (c: CategoryId) => void;
}

export function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-xl border border-border text-left transition-all hover:shadow-lg"
        >
          <img
            src={c.image}
            alt={c.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/85 via-brown-dark/25 to-transparent" />
          <div className="relative mt-auto p-4 text-white">
            <h3 className="text-lg font-bold leading-tight">{c.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-xs text-zinc-200">{c.description}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white">
              Ver todo <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
