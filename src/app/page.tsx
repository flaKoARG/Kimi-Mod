"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header, type TabId } from "@/components/store/header";
import { Hero } from "@/components/store/hero";
import { HomeSection } from "@/components/store/home-section";
import { CategoryGrid } from "@/components/store/category-grid";
import { CatalogView } from "@/components/store/catalog-view";
import { ProductGrid } from "@/components/store/product-grid";
import { Footer } from "@/components/store/footer";
import { CartDrawer } from "@/components/store/cart-drawer";
import { ProductQuickView } from "@/components/store/product-quick-view";
import { SearchDialog } from "@/components/store/search-dialog";
import {
  getProductsByGender,
  getSaleProducts,
  getProductsByCategory,
  CATEGORY_LABEL,
  type CategoryId,
  type Product,
} from "@/lib/products";

export default function Home() {
  const [tab, setTab] = useState<TabId>("inicio");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Reset category drill-down when leaving "categorias"
  const goTab = (t: TabId) => {
    setTab(t);
    if (t !== "categorias") setSelectedCategory(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCategory = (c: CategoryId) => {
    setSelectedCategory(c);
    setTab("categorias");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to top on tab change (covers cases where goTab isn't used)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header active={tab} onTab={goTab} onSearch={() => setSearchOpen(true)} />

      <main className="flex-1">
        {tab === "inicio" && (
          <>
            <Hero onTab={goTab} />
            <HomeSection
              onTab={goTab}
              onCategory={openCategory}
              onQuickView={setQuickView}
            />
          </>
        )}

        {tab === "hombre" && (
          <CatalogView
            title="Hombre"
            subtitle="Remeras, pantalones y camperas con corte moderno"
            products={getProductsByGender("hombre")}
            onQuickView={setQuickView}
          />
        )}

        {tab === "mujer" && (
          <CatalogView
            title="Mujer"
            subtitle="Remeras, pantalones, camperas y polleras"
            products={getProductsByGender("mujer")}
            onQuickView={setQuickView}
          />
        )}

        {tab === "sale" && (
          <CatalogView
            title="Sale"
            subtitle="Aprovechá las mejores ofertas antes de que se agoten"
            products={getSaleProducts()}
            onQuickView={setQuickView}
          />
        )}

        {tab === "categorias" &&
          (selectedCategory ? (
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 gap-1 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedCategory(null)}
              >
                <ArrowLeft className="h-4 w-4" /> Volver a categorías
              </Button>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {CATEGORY_LABEL[selectedCategory]}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Todos los productos de la categoría {CATEGORY_LABEL[selectedCategory].toLowerCase()}
                </p>
              </div>
              <div className="mt-6">
                <ProductGrid
                  products={getProductsByCategory(selectedCategory)}
                  onQuickView={setQuickView}
                />
              </div>
            </section>
          ) : (
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  Categorías
                </h2>
                <p className="text-sm text-muted-foreground">
                  Elegí una categoría para ver todos los productos
                </p>
              </div>
              <div className="mt-6">
                <CategoryGrid onSelect={openCategory} />
              </div>
            </section>
          ))}
      </main>

      <Footer onTab={goTab} />

      <CartDrawer />
      <ProductQuickView
        product={quickView}
        open={!!quickView}
        onOpenChange={(o) => !o && setQuickView(null)}
      />
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={setQuickView}
      />
    </div>
  );
}
