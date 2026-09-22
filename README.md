# Kimi Mod — Tienda de Indumentaria

Tienda online de ropa urbana para mujer y hombre (pantalones, remeras, camperas y polleras).
Construida con **Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui + Zustand**.

## ✨ Características

- 🛍️ Catálogos: **Hombre**, **Mujer**, **Categorías** y **Sale** (ofertas)
- 🔍 Búsqueda en vivo de productos
- 👕 Vista rápida de producto (selector de talle, color y cantidad)
- 🛒 Carrito lateral con contador, total en ARS y persistencia (localStorage)
- 🏷️ Badges de "Nuevo" y % de descuento
- 📱 Responsive (PC y móvil) con menú hamburguesa
- 🎨 Paleta de colores azul / rojo / negro

## 🚀 Cómo correrlo localmente

### Requisitos
- Node.js 18+ o [Bun](https://bun.sh) (recomendado)
- Git

### Pasos

```bash
# 1. Clonar (o descomprimir) el proyecto
git clone https://github.com/flaKoARG/Kimi-Mod.git
cd Kimi-Mod

# 2. Instalar dependencias
bun install        # o: npm install

# 3. (Opcional) Inicializar la base de datos SQLite
bun run db:push    # o: npx prisma db push

# 4. Levantar el servidor de desarrollo
bun run dev        # o: npm run dev
```

Abrí 👉 **http://localhost:3000**

### Scripts disponibles

| Script | Descripción |
|---|---|
| `bun run dev` | Servidor de desarrollo (puerto 3000) |
| `bun run build` | Build de producción |
| `bun run start` | Servidor de producción |
| `bun run lint` | ESLint |
| `bun run db:push` | Sincroniza el schema de Prisma con SQLite |

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz (metadata, fuentes)
│   ├── page.tsx            # Página principal con tabs de catálogos
│   └── globals.css         # Paleta de colores + estilos globales
├── components/
│   ├── store/              # Componentes de la tienda
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-quick-view.tsx
│   │   ├── category-grid.tsx
│   │   ├── catalog-view.tsx
│   │   ├── home-section.tsx
│   │   ├── cart-drawer.tsx
│   │   ├── search-dialog.tsx
│   │   └── footer.tsx
│   └── ui/                 # Componentes shadcn/ui
├── lib/
│   ├── products.ts         # 📦 Catálogo de productos (editá acá)
│   ├── cart.ts             # Store del carrito (Zustand)
│   ├── db.ts               # Cliente Prisma
│   └── utils.ts            # Helpers (cn, etc.)
└── hooks/
    ├── use-toast.ts
    └── use-mobile.ts

public/images/
├── hero.png                # Imagen del hero
├── cat-*.png               # Imágenes de categorías
└── products/               # Fotos de productos

prisma/
└── schema.prisma           # Schema de la base de datos
```

## 🖼️ Cómo agregar o cambiar productos

Editá el archivo **`src/lib/products.ts`**. Cada producto tiene esta estructura:

```ts
{
  id: "h-campera-brave",
  name: "Campera Clusterman Brave",
  gender: "hombre",              // "hombre" | "mujer"
  category: "camperas",          // "pantalones" | "remeras" | "camperas" | "polleras"
  price: 54990,                  // Precio actual en ARS
  originalPrice: 69990,          // (Opcional) precio tachado para oferta
  image: "/images/products/h-campera-brave.jpg",
  colors: [{ name: "Negro", hex: "#111111" }],
  sizes: ["S", "M", "L", "XL"],
  isNew: true,                   // (Opcional) muestra badge "Nuevo"
  description: "Campera bomber de nylon acolchado...",
}
```

Luego agregá la foto del producto en **`public/images/products/`** con el mismo nombre que pusiste en el campo `image`.

## 🛠️ Stack técnico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4 + shadcn/ui (New York)
- **Estado**: Zustand (carrito) + React state
- **Iconos**: Lucide React
- **Base de datos**: Prisma ORM + SQLite (configurado, opcional para el catálogo actual)
- **Fuentes**: Geist (next/font)

## 📝 Licencia

Proyecto de uso privado para Kimi Mod.
