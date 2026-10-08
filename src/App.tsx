import { useState } from "react";
import { StoreProvider } from "./context/StoreContext";
import type { CollectionTab } from "./data/catalog";
import { scrollToId } from "./lib/utils";

import Header from "./components/layout/Header";
import MobileMenu from "./components/layout/MobileMenu";
import Footer from "./components/layout/Footer";
import InfoModal from "./components/layout/InfoModal";
import CartDrawer from "./components/cart/CartDrawer";
import SearchOverlay from "./components/search/SearchOverlay";
import { Toast } from "./components/ui/Primitives";

import Hero from "./components/home/Hero";
import Ribbon from "./components/home/Ribbon";
import BrandIntro from "./components/home/BrandIntro";
import StoryTabs from "./components/home/StoryTabs";
import FeaturedCollections from "./components/home/FeaturedCollections";
import BestSellers from "./components/home/BestSellers";
import Trust from "./components/home/Trust";
import StoreLocator from "./components/home/StoreLocator";
import Social from "./components/home/Social";
import Newsletter from "./components/home/Newsletter";

import ProductGrid from "./components/products/ProductGrid";
import QuickView from "./components/products/QuickView";
import ProductDetail from "./components/products/ProductDetail";
import NotifyModal from "./components/products/NotifyModal";
import BundleBuilder from "./components/bundle/BundleBuilder";

function Storefront() {
  const [collection, setCollection] = useState<CollectionTab>("all");

  // Featured collection tiles and footer links set the grid filter, then glide to the shop.
  const selectCollection = (tab: CollectionTab) => {
    setCollection(tab);
    scrollToId("shop");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory text-bark">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bark focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Ribbon />
        <BrandIntro />
        <StoryTabs />
        <FeaturedCollections onSelect={selectCollection} />
        <BestSellers />
        <ProductGrid collection={collection} onCollection={setCollection} />
        <BundleBuilder />
        <Trust />
        <StoreLocator />
        <Social />
        <Newsletter />
      </main>

      <Footer onCollection={selectCollection} />

      {/* Overlays & layers */}
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <QuickView />
      <ProductDetail />
      <NotifyModal />
      <InfoModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}
