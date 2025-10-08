import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Layers, 
  Battery, 
  Fan,
  ShoppingCart,
  Check,
  AlertCircle
} from 'lucide-react';

interface Component {
  id: string;
  name: string;
  price: number;
  specs: string;
  inStock: boolean;
}

const components = {
  cpu: [
    { id: 'cpu1', name: 'AMD Ryzen 9 7950X', price: 599, specs: '16 Cores, 32 Threads, 5.7GHz', inStock: true },
    { id: 'cpu2', name: 'Intel Core i9-14900K', price: 649, specs: '24 Cores, 32 Threads, 6.0GHz', inStock: true },
    { id: 'cpu3', name: 'AMD Ryzen 7 7800X3D', price: 449, specs: '8 Cores, 16 Threads, 5.0GHz', inStock: true },
    { id: 'cpu4', name: 'Intel Core i7-14700K', price: 499, specs: '20 Cores, 28 Threads, 5.6GHz', inStock: false }
  ],
  gpu: [
    { id: 'gpu1', name: 'NVIDIA RTX 4080 Super', price: 1199, specs: '16GB GDDR6X, 2550MHz', inStock: true },
    { id: 'gpu2', name: 'AMD RX 7900 XTX', price: 999, specs: '24GB GDDR6, 2500MHz', inStock: true },
    { id: 'gpu3', name: 'NVIDIA RTX 4070 Ti', price: 799, specs: '12GB GDDR6X, 2610MHz', inStock: true }
  ],
  ram: [
    { id: 'ram1', name: 'Corsair Vengeance 32GB DDR5', price: 149, specs: '6000MHz, CL30, RGB', inStock: true },
    { id: 'ram2', name: 'G.Skill Trident Z5 32GB', price: 169, specs: '6400MHz, CL32, RGB', inStock: true },
    { id: 'ram3', name: 'Kingston Fury 64GB DDR5', price: 279, specs: '5600MHz, CL36', inStock: true }
  ],
  storage: [
    { id: 'ssd1', name: 'Samsung 990 PRO 2TB', price: 179, specs: 'NVMe Gen4, 7450MB/s', inStock: true },
    { id: 'ssd2', name: 'WD Black SN850X 2TB', price: 159, specs: 'NVMe Gen4, 7300MB/s', inStock: true },
    { id: 'ssd3', name: 'Crucial T700 4TB', price: 349, specs: 'NVMe Gen5, 12400MB/s', inStock: true }
  ],
  motherboard: [
    { id: 'mb1', name: 'ASUS ROG Strix X670E', price: 399, specs: 'AM5, DDR5, PCIe 5.0', inStock: true },
    { id: 'mb2', name: 'MSI MPG Z790 Carbon', price: 449, specs: 'LGA1700, DDR5, WiFi 7', inStock: true },
    { id: 'mb3', name: 'Gigabyte B650 Aorus Elite', price: 249, specs: 'AM5, DDR5, PCIe 4.0', inStock: true }
  ],
  psu: [
    { id: 'psu1', name: 'Corsair RM1000e', price: 179, specs: '1000W, 80+ Gold, Modular', inStock: true },
    { id: 'psu2', name: 'EVGA SuperNOVA 850W', price: 149, specs: '850W, 80+ Platinum', inStock: true },
    { id: 'psu3', name: 'Seasonic Prime TX 1300W', price: 349, specs: '1300W, 80+ Titanium', inStock: true }
  ]
};

export function PCBuilder() {
  const { t, formatPrice, convertPrice } = useLanguage();
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({});

  const handleSelectComponent = (category: string, component: Component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce((sum, comp) => sum + comp.price, 0);
  };

  const isComplete = () => {
    return ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu'].every(
      category => selectedComponents[category]
    );
  };

  return (
    <section id="pc-builder" className="py-16 bg-gradient-to-b from-muted/30 via-accent/5 to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-accent to-primary text-white">{t('builder.title')}</Badge>
          <h2 className="mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{t('builder.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('builder.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle>{t('builder.select')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cpu" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 bg-muted">
                    <TabsTrigger value="cpu" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Cpu className="w-4 h-4" />
                      <span className="hidden sm:inline">CPU</span>
                    </TabsTrigger>
                    <TabsTrigger value="gpu" className="gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                      <Layers className="w-4 h-4" />
                      <span className="hidden sm:inline">GPU</span>
                    </TabsTrigger>
                    <TabsTrigger value="ram" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-white">
                      <MemoryStick className="w-4 h-4" />
                      <span className="hidden sm:inline">RAM</span>
                    </TabsTrigger>
                    <TabsTrigger value="storage" className="gap-2 data-[state=active]:bg-info data-[state=active]:text-white">
                      <HardDrive className="w-4 h-4" />
                      <span className="hidden sm:inline">Storage</span>
                    </TabsTrigger>
                    <TabsTrigger value="motherboard" className="gap-2 data-[state=active]:bg-warning data-[state=active]:text-white">
                      <Fan className="w-4 h-4" />
                      <span className="hidden sm:inline">MB</span>
                    </TabsTrigger>
                    <TabsTrigger value="psu" className="gap-2 data-[state=active]:bg-success data-[state=active]:text-white">
                      <Battery className="w-4 h-4" />
                      <span className="hidden sm:inline">PSU</span>
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(components).map(([category, items]) => (
                    <TabsContent key={category} value={category} className="space-y-3">
                      {items.map((component) => (
                        <div
                          key={component.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedComponents[category]?.id === component.id
                              ? 'border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-md'
                              : 'hover:border-primary/50 hover:shadow-sm'
                          } ${!component.inStock ? 'opacity-50' : ''}`}
                          onClick={() => component.inStock && handleSelectComponent(category, component)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4>{component.name}</h4>
                                {selectedComponents[category]?.id === component.id && (
                                  <Check className="w-5 h-5 text-success" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{component.specs}</p>
                            </div>
                            <div className="text-right">
                              <div className="whitespace-nowrap font-semibold text-primary">
                                {formatPrice(component.price * 55)}
                              </div>
                              {!component.inStock && (
                                <Badge variant="destructive" className="mt-1">
                                  {t('products.outOfStock')}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Build Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-accent/30 shadow-xl bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('builder.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu'].map((category) => {
                  const component = selectedComponents[category];
                  const icons: Record<string, any> = {
                    cpu: Cpu,
                    gpu: Layers,
                    ram: MemoryStick,
                    storage: HardDrive,
                    motherboard: Fan,
                    psu: Battery
                  };
                  const Icon = icons[category];
                  
                  return (
                    <div key={category} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <Icon className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground uppercase mb-1">
                          {t(`builder.${category}`)}
                        </div>
                        {component ? (
                          <>
                            <div className="text-sm truncate">{component.name}</div>
                            <div className="text-sm font-semibold text-primary">
                              {formatPrice(component.price * 55)}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">{t('builder.select')}</div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <span className="font-medium">{t('builder.totalPrice')}:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {formatPrice(getTotalPrice() * 55)}
                    </span>
                  </div>

                  {isComplete() ? (
                    <div className="space-y-2">
                      <Button 
                        className="w-full gap-2 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90" 
                        size="lg"
                        onClick={() => {
                          toast.success('PC Build added to cart! Proceed to checkout.');
                          setSelectedComponents({});
                        }}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {t('builder.buyNow')}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        + {formatPrice(29 * 55)} {t('services.assembly.title')}
                      </p>
                      <Button variant="outline" className="w-full" size="sm" onClick={() => setSelectedComponents({})}>
                        {t('builder.reset')}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-warning-foreground">
                        {t('builder.subtitle')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
