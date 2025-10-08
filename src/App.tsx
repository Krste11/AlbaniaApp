import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { PCBuilder } from './components/PCBuilder';
import { Services } from './components/Services';
import { C2CMarketplace } from './components/C2CMarketplace';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Hero />
            <FeaturedProducts />
            <PCBuilder />
            <Services />
            <C2CMarketplace />
          </main>
          <Footer />
        </div>
        <Toaster />
      </CartProvider>
    </LanguageProvider>
  );
}
