"use client";

import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import type { TabId } from "./header";

interface FooterProps {
  onTab: (t: TabId) => void;
}

export function Footer({ onTab }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-white/10 bg-brown-dark text-zinc-300">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <img
            src="/images/logo/Rojo.png"
            alt="Kimi Mod"
            className="h-14 w-auto rounded-lg object-contain"
          />
          <p className="mt-3 max-w-xs text-sm text-zinc-400">
            Indumentaria urbana para mujer y hombre. Diseño urbano y estilo nuevo, tela premium
            y precios accesibles.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.instagram.com/kimi.mod"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-primary hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-primary hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Tienda */}
        <div>
          <h3 className="text-sm font-semibold text-white">Tienda</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <button onClick={() => onTab("hombre")} className="hover:text-primary">
                Hombre
              </button>
            </li>
            <li>
              <button onClick={() => onTab("mujer")} className="hover:text-primary">
                Mujer
              </button>
            </li>
            <li>
              <button onClick={() => onTab("categorias")} className="hover:text-primary">
                Categorías
              </button>
            </li>
            <li>
              <button onClick={() => onTab("sale")} className="text-sale hover:text-sale">
                Sale
              </button>
            </li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h3 className="text-sm font-semibold text-white">Ayuda</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><a href="#" className="hover:text-white">Guía de talles</a></li>
            <li><a href="#" className="hover:text-white">Envíos y entregas</a></li>
            <li><a href="#" className="hover:text-white">Cambios y devoluciones</a></li>
            <li><a href="#" className="hover:text-white">Preguntas frecuentes</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold text-white">Contacto</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> hola@kimimod.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +54 11 5555-0123
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Santa Lucía, San Juan
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Kimi Mod. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300">Términos</a>
            <a href="#" className="hover:text-zinc-300">Privacidad</a>
            <a href="#" className="hover:text-zinc-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
