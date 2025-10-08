import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductDetails } from './ProductDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../contexts/CartContext';

const computerParts: Product[] = [
  {
    id: '1',
    name: 'AMD Ryzen 9 7950X - 16 Core Processor',
    price: 45990,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    category: 'Процесор / Processor / Procesor',
    shop: 'Anhoch',
    inStock: true,
    specs: {
      'Cores': '16',
      'Threads': '32',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.7 GHz',
      'TDP': '170W'
    },
    description: 'High-performance processor perfect for gaming and content creation with 16 cores and 32 threads.'
  },
  {
    id: '2',
    name: 'NVIDIA RTX 4080 Super 16GB GDDR6X',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=800',
    category: 'Графичка Картичка / GPU / Karta grafike',
    shop: 'Setec',
    inStock: true,
    specs: {
      'Memory': '16GB GDDR6X',
      'Core Clock': '2550 MHz',
      'Memory Speed': '22.4 Gbps',
      'TDP': '320W'
    },
    description: 'Premium graphics card for 4K gaming and professional workloads.'
  },
  {
    id: '3',
    name: 'Corsair Vengeance RGB 32GB DDR5 6000MHz',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800',
    category: 'RAM Меморија / Memory / Kujtesa',
    shop: 'Neptune',
    inStock: true,
    specs: {
      'Capacity': '32GB (2x16GB)',
      'Speed': '6000MHz',
      'Latency': 'CL30',
      'RGB': 'Yes'
    },
    description: 'High-speed DDR5 memory with stunning RGB lighting.'
  },
  {
    id: '4',
    name: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800',
    category: 'SSD Диск / Storage / Ruajtja',
    shop: 'TechnoMarket',
    inStock: false,
    specs: {
      'Capacity': '2TB',
      'Interface': 'PCIe Gen 4.0 x4',
      'Read Speed': '7450 MB/s',
      'Write Speed': '6900 MB/s'
    },
    description: 'Ultra-fast NVMe SSD with exceptional performance.'
  }
];

const phones: Product[] = [
  {
    id: '5',
    name: 'iPhone 15 Pro Max 256GB Titanium',
    price: 94990,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
    category: 'Смартфон / Smartphone / Telefon',
    shop: 'AMC',
    inStock: true,
    specs: {
      'Storage': '256GB',
      'Display': '6.7" Super Retina XDR',
      'Chip': 'A17 Pro',
      'Camera': '48MP Main'
    },
    description: 'Latest iPhone with titanium design and powerful A17 Pro chip.'
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
    category: 'Смартфон / Smartphone / Telefon',
    shop: 'Setec',
    inStock: true,
    specs: {
      'Storage': '512GB',
      'Display': '6.8" Dynamic AMOLED',
      'Chip': 'Snapdragon 8 Gen 3',
      'Camera': '200MP Main'
    },
    description: 'Flagship Samsung phone with S Pen and incredible camera.'
  },
  {
    id: '7',
    name: 'Google Pixel 8 Pro 256GB',
    price: 64990,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
    category: 'Смартфон / Smartphone / Telefon',
    shop: 'Neptune',
    inStock: true,
    specs: {
      'Storage': '256GB',
      'Display': '6.7" LTPO OLED',
      'Chip': 'Google Tensor G3',
      'Camera': '50MP Main'
    },
    description: 'Pure Android experience with best-in-class AI features.'
  },
  {
    id: '8',
    name: 'OnePlus 12 16GB RAM 512GB',
    price: 54990,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    category: 'Смартфон / Smartphone / Telefon',
    shop: 'Anhoch',
    inStock: true,
    specs: {
      'RAM': '16GB',
      'Storage': '512GB',
      'Display': '6.82" AMOLED 120Hz',
      'Chip': 'Snapdragon 8 Gen 3'
    },
    description: 'Flagship killer with incredible specs at great price.'
  }
];

export function FeaturedProducts() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="featured-products py-16 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t('products.featured')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="parts" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted/50">
            <TabsTrigger value="parts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              {t('products.computers')}
            </TabsTrigger>
            <TabsTrigger value="phones" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-accent data-[state=active]:text-white">
              {t('products.phones')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="parts">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {computerParts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="phones">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {phones.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ProductDetails
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
