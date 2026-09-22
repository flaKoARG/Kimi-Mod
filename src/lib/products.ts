export type Gender = "hombre" | "mujer";
export type CategoryId = "pantalones" | "remeras" | "camperas" | "polleras";

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
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean;
  description: string;
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
    description: "Jeans, chinos y pantalones con corte y comfort.",
    image: "/images/cat-pantalones.png",
  },
  {
    id: "remeras",
    name: "Remeras",
    description: "Básicas y estampadas, algodón premium.",
    image: "/images/cat-remeras.png",
  },
  {
    id: "camperas",
    name: "Camperas",
    description: "Abrigos urbanos para todo el año.",
    image: "/images/cat-camperas.png",
  },
  {
    id: "polleras",
    name: "Polleras",
    description: "Faldas lápiz, jean y plisadas.",
    image: "/images/cat-polleras.png",
  },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  pantalones: "Pantalones",
  remeras: "Remeras",
  camperas: "Camperas",
  polleras: "Polleras",
};

const SIZES_UPPER = ["S", "M", "L", "XL"];
const SIZES_WAIST = ["36", "38", "40", "42", "44"];
const SIZES_SKIRT = ["36", "38", "40", "42"];

export const PRODUCTS: Product[] = [
  // ---------------- HOMBRE ----------------
  {
    id: "h-remera-negra",
    name: "Remera Esencial Negra",
    gender: "hombre",
    category: "remeras",
    price: 14990,
    originalPrice: 18990,
    image: "/images/products/h-remera-negra.png",
    colors: [
      { name: "Negro", hex: "#111111" },
      { name: "Azul", hex: "#1d4ed8" },
    ],
    sizes: SIZES_UPPER,
    isNew: true,
    description: "Remera de algodón peinado 24.1, corte regular fit y cuello reforzado.",
  },
  {
    id: "h-remera-azul",
    name: "Remera Slim Azul",
    gender: "hombre",
    category: "remeras",
    price: 19990,
    image: "/images/products/h-remera-azul.png",
    colors: [
      { name: "Azul", hex: "#1d4ed8" },
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_UPPER,
    description: "Remera slim fit en jersey elásticoico, ideal para uso diario.",
  },
  {
    id: "h-jean-azul",
    name: "Jean Slim Azul",
    gender: "hombre",
    category: "pantalones",
    price: 27990,
    originalPrice: 34990,
    image: "/images/products/h-jean-azul.png",
    colors: [
      { name: "Azul", hex: "#1e3a8a" },
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_WAIST,
    description: "Jean slim de denim 12oz con elastano, tiro medio y lavado stone.",
  },
  {
    id: "h-chino-negro",
    name: "Pantalón Chino Negro",
    gender: "hombre",
    category: "pantalones",
    price: 32990,
    image: "/images/products/h-chino-negro.png",
    colors: [
      { name: "Negro", hex: "#111111" },
      { name: "Azul", hex: "#1e3a8a" },
    ],
    sizes: SIZES_WAIST,
    description: "Chino de sarga peinada, pinza delantera y corte recto moderno.",
  },
  {
    id: "h-campera-jean",
    name: "Campera de Jean Índigo",
    gender: "hombre",
    category: "camperas",
    price: 49990,
    image: "/images/products/h-campera-jean.png",
    colors: [
      { name: "Índigo", hex: "#1e3a8a" },
    ],
    sizes: SIZES_UPPER,
    isNew: true,
    description: "Campera trucker de denim pesado con bolsillos plaqué y botones metálicos.",
  },
  {
    id: "h-campera-negra",
    name: "Campera Bomber Negra",
    gender: "hombre",
    category: "camperas",
    price: 39990,
    originalPrice: 54990,
    image: "/images/products/h-campera-negra.png",
    colors: [
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_UPPER,
    description: "Bomber con interior térmico, puños acanalados y cierre frontal.",
  },
  // ---------------- MUJER ----------------
  {
    id: "m-remera-blanca",
    name: "Remera Básica Blanca",
    gender: "mujer",
    category: "remeras",
    price: 17990,
    image: "/images/products/m-remera-blanca.png",
    colors: [
      { name: "Blanco", hex: "#f8f8f8" },
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_UPPER,
    isNew: true,
    description: "Remera cropped de algodón modal, caída suave y tiras finas.",
  },
  {
    id: "m-remera-roja",
    name: "Remera Roja",
    gender: "mujer",
    category: "remeras",
    price: 14990,
    originalPrice: 19990,
    image: "/images/products/m-remera-roja.png",
    colors: [
      { name: "Rojo", hex: "#dc2626" },
    ],
    sizes: SIZES_UPPER,
    description: "Remera manga corta en rojo intenso, cuello redondo y corte entallado.",
  },
  {
    id: "m-jean",
    name: "Jean Mom Azul",
    gender: "mujer",
    category: "pantalones",
    price: 32990,
    image: "/images/products/m-jean.png",
    colors: [
      { name: "Azul", hex: "#1e3a8a" },
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_WAIST,
    description: "Jean mom fit de tiro alto, denim con elastano para mayor comodidad.",
  },
  {
    id: "m-pollera-negra",
    name: "Pollera Lápiz Negra",
    gender: "mujer",
    category: "polleras",
    price: 19990,
    originalPrice: 26990,
    image: "/images/products/m-pollera-negra.png",
    colors: [
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_SKIRT,
    description: "Pollera lápiz por debajo de la rodilla, tejido sarga con abertura posterior.",
  },
  {
    id: "m-pollera-azul",
    name: "Pollera Jean Azul",
    gender: "mujer",
    category: "polleras",
    price: 28990,
    image: "/images/products/m-pollera-azul.png",
    colors: [
      { name: "Azul", hex: "#1e3a8a" },
    ],
    sizes: SIZES_SKIRT,
    isNew: true,
    description: "Mini pollera de denim con botones delanteros y cintura alta.",
  },
  {
    id: "m-campera",
    name: "Campera Lino",
    gender: "mujer",
    category: "camperas",
    price: 34990,
    originalPrice: 46990,
    image: "/images/products/m-campera.png",
    colors: [
      { name: "Lino", hex: "#d8cdb5" },
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SIZES_UPPER,
    description: "Sobrecampera de lino entallada, abierta con cartera y botones forrados.",
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
