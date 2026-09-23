export type Gender = "hombre" | "mujer";
export type CategoryId =
  | "pantalones"
  | "remeras"
  | "camperas"
  | "polleras"
  | "tops";

export interface Product {
  id: string;
  name: string;
  gender: Gender;
  category: CategoryId;
  /** Precio actual (ARS). Si está en oferta, es el precio rebajado. */
  price: number;
  /** Precio original tachado cuando el producto está en oferta. */
  originalPrice?: number;
  image: string;
  /** Galería de imágenes adicionales para la vista rápida. Si se omite, se usa solo `image`. */
  gallery?: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean;
  /** Marca del producto (ej: Opposite, Icono, JJO). */
  brand?: string;
  /** Tipo de corte/fit (ej: Baggy, Wide Leg, Barrel). */
  fit?: string;
  description: string;
}

/** Devuelve todas las imágenes de un producto (imagen principal + galería). */
export function getProductImages(p: Product): string[] {
  if (p.gallery && p.gallery.length > 0) {
    return [p.image, ...p.gallery.filter((g) => g !== p.image)];
  }
  return [p.image];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "pantalones",
    name: "Pantalones",
    description: "Jeans y pantalones con cortes modernos.",
    image: "/images/products/PantalonJean1.jpeg",
  },
  {
    id: "remeras",
    name: "Remeras",
    description: "Algodón premium con diseños únicos.",
    image: "/images/products/remera-hombre-1-1.jpeg",
  },
  {
    id: "camperas",
    name: "Camperas y Buzos",
    description: "Abrigos urbanos: camperas y buzos para todo el año.",
    image: "/images/products/h-campera-brave.jpg",
  },
  {
    id: "tops",
    name: "Tops y Blusas",
    description: "Tops y blusas con diseños femeninos y modernos.",
    image: "/images/products/burgundy.jpeg",
  },
  {
    id: "polleras",
    name: "Polleras y Shorts",
    description: "Polleras y shorts con estilos urbanos y de oficina.",
    image: "/images/products/dark-cherry.jpeg",
  },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  pantalones: "Pantalones",
  remeras: "Remeras",
  camperas: "Camperas y Buzos",
  tops: "Tops y Blusas",
  polleras: "Polleras y Shorts",
};

const SIZES_UPPER = ["S", "M", "L", "XL"];
const SIZES_WAIST = ["36", "38", "40", "42", "44"];

export const PRODUCTS: Product[] = [
  // ---------------- HOMBRE ----------------
  {
    id: "h-remera-1",
    name: "Blue Legacy",
    gender: "hombre",
    category: "remeras",
    price: 25000,
    image: "/images/products/remera-hombre-1-1.jpeg",
    gallery: [
      "/images/products/remera-hombre-1-2.jpeg",
      "/images/products/remera-hombre-1-3.jpeg",
    ],
    colors: [
      { name: "Azul", hex: "#1e3a8a" },
    ],
    sizes: ["M"],
    brand: "Icono",
    fit: "Deportiva Retro",
    isNew: true,
    description:
      "Remera retro deportiva en azul con detalles en crema: cuello tipo polo, puños y piping laterales. Estampado gráfico en pecho con tipografía cursiva y emblemas vintage. Fit relajado y tela suave transpirable.",
  },
  {
    id: "h-remera-2",
    name: "Worn Fate",
    gender: "hombre",
    category: "remeras",
    price: 15000,
    image: "/images/products/remera-hombre-2-1.jpeg",
    gallery: [
      "/images/products/remera-hombre-2-2.jpeg",
      "/images/products/remera-hombre-2-3.jpeg",
    ],
    colors: [
      { name: "Taupe", hex: "#8b7d6b" },
    ],
    sizes: ["L"],
    brand: "Opposite",
    fit: "Algodón",
    isNew: true,
    description:
      "Remera de algodón en color taupe con estampado gótico negro en el pecho, flanqueado por alas y detalles ornamentales. Fit oversize con hombros caídos y largo extendido. Estilo streetwear urbano alternativo.",
  },
  {
    id: "h-remera-3",
    name: "Off Duty",
    gender: "hombre",
    category: "remeras",
    price: 15000,
    image: "/images/products/remera-hombre-3-1.jpeg",
    gallery: [
      "/images/products/remera-hombre-3-2.jpeg",
      "/images/products/remera-hombre-3-3.jpeg",
    ],
    colors: [
      { name: "Blanco", hex: "#f5f5f5" },
    ],
    sizes: ["L"],
    brand: "Soviet",
    fit: "Algodón",
    description:
      "Remera oversize blanca de algodón con gráficos minimalistas en pecho: 'NOT TOMORROW NOT DAY' en negro y 'THE ART OF Doing Nothing' en verde. Etiqueta de marca SOVIET en espalda. Fit relajado streetwear.",
  },
  {
    id: "h-jean-1",
    name: "Vintage Blue · Baggy",
    gender: "hombre",
    category: "pantalones",
    price: 35000,
    image: "/images/products/PantalonJean1.jpeg",
    gallery: [
      "/images/products/PantalonJean1-2.jpeg",
      "/images/products/PantalonJean1-3.jpeg",
    ],
    colors: [
      { name: "Azul Vintage", hex: "#4a6fa5" },
    ],
    sizes: ["44"],
    brand: "Opposite",
    fit: "Baggy",
    isNew: true,
    description:
      "Jean baggy de lavado azul vintage con corte recto holgado. Cinco bolsillos con costuras visibles y lavado desgastado sutil.",
  },
  {
    id: "h-jean-2",
    name: "Ice Wash · Barrel",
    gender: "hombre",
    category: "pantalones",
    price: 35000,
    image: "/images/products/PantalonJean2.jpeg",
    gallery: [
      "/images/products/PantalonJean2-2.jpeg",
      "/images/products/PantalonJean2-3.jpeg",
    ],
    colors: [
      { name: "Celeste Hielo", hex: "#9bb5d6" },
    ],
    sizes: ["42"],
    brand: "Opposite",
    fit: "Barrel",
    isNew: true,
    description:
      "Jean barrel fit de lavado celeste hielo con pierna curva y tiro medio. Cinco bolsillos con costuras visibles.",
  },
  {
    id: "h-jean-3",
    name: "Shadow Relaxed · Relaxed Fit",
    gender: "hombre",
    category: "pantalones",
    price: 35000,
    image: "/images/products/PantalonJean3.jpeg",
    gallery: [
      "/images/products/PantalonJean3-2.jpeg",
      "/images/products/PantalonJean3-3.jpeg",
    ],
    colors: [
      { name: "Celeste", hex: "#9bb5d6" },
    ],
    sizes: ["40"],
    brand: "JJO",
    fit: "Relaxed Fit",
    description:
      "Jean relaxed fit de lavado celeste con tiro alto y pierna ancha. Cinco bolsillos, pliegues marcados y look relajado oversize.",
  },
  {
    id: "h-campera-brave",
    name: "Brave",
    gender: "hombre",
    category: "camperas",
    price: 40000,
    image: "/images/products/h-campera-brave.jpg",
    gallery: [
      "/images/products/h-campera-brave-2.jpg",
      "/images/products/h-campera-brave-3.jpg",
      "/images/products/h-campera-brave-4.jpg",
    ],
    colors: [
      { name: "Negro", hex: "#111111" },
    ],
    sizes: ["L"],
    brand: "ClusterUrban",
    fit: "Rompeviento Forrada",
    isNew: true,
    description:
      "Campera rompeviento forrada de nylon acolchado en negro, con estampado gráfico blanco y piping contrastante. Cierre frontal, puños acanalados y bolsillos laterales.",
  },
  {
    id: "h-campera-opposite",
    name: "Forest",
    gender: "hombre",
    category: "camperas",
    price: 25000,
    image: "/images/products/h-campera-opposite.jpg",
    gallery: ["/images/products/h-campera-opposite-2.jpg"],
    colors: [
      { name: "Verde Bosque", hex: "#2f4f3a" },
    ],
    sizes: ["L"],
    brand: "Opposite",
    fit: "Algodón",
    description:
      "Campera de algodón (frizado/french terry) verde bosque con paneles color-block crema en espalda. Cuello alto, media cremillera y puños acanalados, fit relajado.",
  },
  {
    id: "h-buzo",
    name: "Concrete Wings",
    gender: "hombre",
    category: "camperas",
    price: 20000,
    image: "/images/products/h-buzo.jpg",
    gallery: [
      "/images/products/h-buzo-2.jpg",
      "/images/products/h-buzo-3.jpg",
    ],
    colors: [
      { name: "Gris", hex: "#b8b3a8" },
    ],
    sizes: ["XL"],
    brand: "Opposite",
    fit: "Algodón",
    isNew: true,
    description:
      "Buzo de algodón (frizado) en gris claro (oatmeal), con capucha sin cordones, bolsillo canguro y puños acanalados. Hombros caídos y fit oversize para un look streetwear cómodo.",
  },
  {
    id: "h-buzo-mixed",
    name: "Black Tiger",
    gender: "hombre",
    category: "camperas",
    price: 25000,
    image: "/images/products/h-buzo-mixed.jpg",
    gallery: [
      "/images/products/h-buzo-mixed-2.jpg",
      "/images/products/h-buzo-mixed-3.jpg",
    ],
    colors: [
      { name: "Negro", hex: "#111111" },
    ],
    sizes: ["L"],
    brand: "ClusterUrban",
    fit: "Algodón con Cierre",
    isNew: true,
    description:
      "Buzo de algodón con cierre en cuello, negro de frizado con estampado gráfico blanco en el pecho. Cuello alto con media cremillera, hombros caídos, puños acanalados y fit oversize unisex.",
  },
  // ---------------- MUJER ----------------
  {
    id: "m-jean-4",
    name: "Denim Drift · Baggy Skater",
    gender: "mujer",
    category: "pantalones",
    price: 35000,
    image: "/images/products/PantalonJean4.jpeg",
    gallery: [
      "/images/products/PantalonJean4-2.jpeg",
      "/images/products/PantalonJean4-3.jpeg",
    ],
    colors: [
      { name: "Celeste Vintage", hex: "#a8b8d0" },
    ],
    sizes: ["42"],
    brand: "Icono",
    fit: "Baggy Skater",
    isNew: true,
    description:
      "Jean baggy skater de lavado celeste vintage con tiro alto y corte holgado. Cinco bolsillos clásicos, look retro y caída cómoda.",
  },
  {
    id: "m-jean-5",
    name: "Leg Sky · Wide Leg",
    gender: "mujer",
    category: "pantalones",
    price: 35000,
    image: "/images/products/PantalonJean5.jpeg",
    gallery: [
      "/images/products/PantalonJean5-2.jpeg",
      "/images/products/PantalonJean5-3.jpeg",
      "/images/products/PantalonJean5-4.jpeg",
      "/images/products/PantalonJean5-5.jpeg",
    ],
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
    ],
    sizes: ["42"],
    brand: "Opposite",
    fit: "Wide Leg",
    isNew: true,
    description:
      "Jean wide leg negro de corte relajado con roturas en las rodillas y cadena decorativa en el bolsillo lateral. Estilo urbano con detalle de hardware.",
  },
  {
    id: "m-jean-6",
    name: "Stone Blue · Wide Leg",
    gender: "mujer",
    category: "pantalones",
    price: 35000,
    image: "/images/products/PantalonJean6.jpeg",
    gallery: [
      "/images/products/PantalonJean6-2.jpeg",
      "/images/products/PantalonJean6-3.jpeg",
    ],
    colors: [
      { name: "Índigo", hex: "#1e3a5f" },
    ],
    sizes: ["40"],
    brand: "Opposite",
    fit: "Wide Leg",
    description:
      "Jean wide leg de lavado índigo oscuro con corte de pierna ancha y cinco bolsillos. Acabado limpio sin desgastes, ideal para combinar con todo.",
  },
  {
    id: "m-campera-noir",
    name: "Noir",
    gender: "mujer",
    category: "camperas",
    price: 25000,
    image: "/images/products/noir.jpeg",
    gallery: [
      "/images/products/noir-2.jpeg",
      "/images/products/noir-3.jpeg",
    ],
    colors: [
      { name: "Negro Cuero", hex: "#0D0D0D" },
    ],
    sizes: ["M"],
    brand: "Icono",
    fit: "Campera Engomada",
    isNew: true,
    description:
      "Campera biker de cuero sintético negro con cierre frontal asimétrico y cuello solapa con botones a presión. Costuras curvas, ajuste entallado y look urbano motero.",
  },
  // ---------------- MUJER: TOPS Y BLUSAS ----------------
  {
    id: "m-mocha-muse",
    name: "Mocha Muse",
    gender: "mujer",
    category: "tops",
    price: 10000,
    image: "/images/products/mocha-muse.jpeg",
    colors: [
      { name: "Mocha", hex: "#a08060" },
    ],
    sizes: ["M"],
    brand: "Opposite",
    fit: "Top con detalles en encaje",
    isNew: true,
    description:
      "Top con detalles en encaje en tono mocha. Tejido suave con terminaciones delicadas, ideal para looks femeninos y elegantes.",
  },
  {
    id: "m-burgundy",
    name: "Burgundy Veil",
    gender: "mujer",
    category: "tops",
    price: 15000,
    image: "/images/products/burgundy.jpeg",
    colors: [
      { name: "Borgoña", hex: "#6B1F2A" },
    ],
    sizes: ["XS"],
    brand: "Alaniz",
    fit: "Blusa con escote translúcido",
    isNew: true,
    description:
      "Blusa con escote translúcido en color borgoña. Tejido fluido con detalle de transparencia en el escote, look sofisticado y sensual.",
  },
  {
    id: "m-wild",
    name: "Wild Affair",
    gender: "mujer",
    category: "tops",
    price: 15000,
    image: "/images/products/wild.jpeg",
    colors: [
      { name: "Animal Print", hex: "#8a6a4a" },
    ],
    sizes: ["L"],
    brand: "Alaniz",
    fit: "Blusa animal print",
    isNew: true,
    description:
      "Blusa con estampado animal print. Tejido ligero y caída fluida, look atrevido y moderno para el día o la noche.",
  },
  {
    id: "m-lemon",
    name: "Lemon Bloom",
    gender: "mujer",
    category: "tops",
    price: 10000,
    image: "/images/products/lemon.jpeg",
    colors: [
      { name: "Lemon", hex: "#F4E04D" },
    ],
    sizes: ["M"],
    brand: "Opposite",
    fit: "Top translúcido",
    isNew: true,
    description:
      "Top translúcido en color amarillo lemon. Tejido liviano con transparencia sutil, fresco y veraniego, ideal para combinar con tops básicos.",
  },
  // ---------------- MUJER: POLLERAS Y SHORTS ----------------
  {
    id: "m-urban-pocket",
    name: "Urban Pocket",
    gender: "mujer",
    category: "polleras",
    price: 25000,
    image: "/images/products/urban-pocket.jpeg",
    colors: [
      { name: "Azul Jean", hex: "#4a6fa5" },
    ],
    sizes: ["S"],
    brand: "Opposite",
    fit: "Pollera de Jean",
    isNew: true,
    description:
      "Pollera de jean con bolsillos delanteros. Denim rígido con lavado medio, largo por encima de la rodilla y look urbano casual.",
  },
  {
    id: "m-midnight",
    name: "Midnight Stripe",
    gender: "mujer",
    category: "polleras",
    price: 20000,
    image: "/images/products/midnight.jpeg",
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
    ],
    sizes: ["S"],
    brand: "Icono",
    fit: "Pollera estilo oficina",
    isNew: true,
    description:
      "Pollera estilo oficina con detalles a rayas. Largo midi, corte entallado y tejido con caída, ideal para looks formales y de oficina.",
  },
  {
    id: "m-dark-cherry",
    name: "Dark Cherry",
    gender: "mujer",
    category: "polleras",
    price: 25000,
    image: "/images/products/dark-cherry.jpeg",
    colors: [
      { name: "Negro Cuero", hex: "#0D0D0D" },
    ],
    sizes: ["S"],
    brand: "Opposite",
    fit: "Short engomado",
    isNew: true,
    description:
      "Short engomado de cuero sintético en negro. Ajuste entallado, look urbano y atrevido, ideal para combinar con tops y blusas.",
  },
];

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(price: number, original?: number): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export function getProductsByGender(gender: Gender): Product[] {
  return PRODUCTS.filter((p) => p.gender === gender);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getSaleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price);
}

export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}
