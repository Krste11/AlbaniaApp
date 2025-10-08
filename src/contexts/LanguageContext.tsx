import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mk' | 'al';

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // Conversion rate from MKD
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getCurrency: () => Currency;
  formatPrice: (price: number) => string;
  convertPrice: (priceInMKD: number) => number;
}

const translations = {
  en: {
    // Header
    'nav.computers': 'Computers',
    'nav.phones': 'Phones',
    'nav.components': 'Components',
    'nav.marketplace': 'Marketplace',
    'nav.pcBuilder': 'PC Builder',
    'nav.services': 'Services',
    
    // Hero
    'hero.title': 'Build Your Dream PC',
    'hero.subtitle': 'Premium computer parts & electronics marketplace',
    'hero.buildNow': 'Build Now',
    'hero.browseProducts': 'Browse Products',
    'hero.stat1': 'Products',
    'hero.stat2': 'Happy Customers',
    'hero.stat3': 'Brands',
    
    // Products
    'products.featured': 'Featured Products',
    'products.computers': 'Computers',
    'products.phones': 'Phones',
    'products.viewDetails': 'View Details',
    'products.addToCart': 'Add to Cart',
    'products.inStock': 'In Stock',
    'products.outOfStock': 'Out of Stock',
    'products.shop': 'Shop',
    
    // PC Builder
    'builder.title': 'PC Builder Tool',
    'builder.subtitle': 'Build your custom PC step by step',
    'builder.cpu': 'Processor (CPU)',
    'builder.gpu': 'Graphics Card (GPU)',
    'builder.ram': 'Memory (RAM)',
    'builder.storage': 'Storage',
    'builder.motherboard': 'Motherboard',
    'builder.psu': 'Power Supply',
    'builder.case': 'Case',
    'builder.select': 'Select',
    'builder.selected': 'Selected',
    'builder.totalPrice': 'Total Price',
    'builder.buyNow': 'Buy Now',
    'builder.reset': 'Reset Build',
    
    // Services
    'services.title': 'Our Services',
    'services.assembly.title': 'PC Assembly',
    'services.assembly.desc': 'Professional PC building service. We assemble your custom PC for an additional fee.',
    'services.repair.title': 'PC Repair',
    'services.repair.desc': 'Expert repair services for all computer issues. Fast and reliable.',
    'services.delivery.title': 'Home Delivery',
    'services.delivery.desc': 'Fast and secure delivery to your doorstep.',
    'services.pickup.title': 'Self Pickup',
    'services.pickup.desc': 'Pick up your order from our physical store at your convenience.',
    
    // C2C Marketplace
    'c2c.title': 'C2C Marketplace',
    'c2c.subtitle': 'Buy and sell used computer parts',
    'c2c.sellYourItem': 'Sell Your Item',
    'c2c.condition': 'Condition',
    'c2c.excellent': 'Excellent',
    'c2c.good': 'Good',
    'c2c.fair': 'Fair',
    'c2c.contactSeller': 'Contact Seller',
    
    // Footer
    'footer.about': 'About Us',
    'footer.aboutText': 'Your trusted partner for computer parts, electronics, and custom PC builds.',
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Support',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Subscribe to get special offers and updates',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',
    'cart.itemAdded': 'Item added to cart!',
    
    // Product Details
    'details.specifications': 'Specifications',
    'details.description': 'Description',
    'details.availability': 'Availability',
    'details.close': 'Close',
  },
  mk: {
    // Header
    'nav.computers': 'Компјутери',
    'nav.phones': 'Телефони',
    'nav.components': 'Компоненти',
    'nav.marketplace': 'Маркетплејс',
    'nav.pcBuilder': 'PC Конфигуратор',
    'nav.services': 'Услуги',
    
    // Hero
    'hero.title': 'Изгради го твојот сонуван PC',
    'hero.subtitle': 'Премиум компјутерски делови и електроника',
    'hero.buildNow': 'Изгради сега',
    'hero.browseProducts': 'Разгледај производи',
    'hero.stat1': 'Производи',
    'hero.stat2': 'Задоволни клиенти',
    'hero.stat3': 'Брендови',
    
    // Products
    'products.featured': 'Препорачани производи',
    'products.computers': 'Компјутери',
    'products.phones': 'Телефони',
    'products.viewDetails': 'Погледни детали',
    'products.addToCart': 'Додади во кошничка',
    'products.inStock': 'На залиха',
    'products.outOfStock': 'Нема залиха',
    'products.shop': 'Продавница',
    
    // PC Builder
    'builder.title': 'PC Конфигуратор',
    'builder.subtitle': 'Изгради го твојот PC чекор по чекор',
    'builder.cpu': 'Процесор (CPU)',
    'builder.gpu': 'Графичка картичка (GPU)',
    'builder.ram': 'Меморија (RAM)',
    'builder.storage': 'Стораж',
    'builder.motherboard': 'Матична плоча',
    'builder.psu': 'Напојување',
    'builder.case': 'Кутија',
    'builder.select': 'Избери',
    'builder.selected': 'Избрано',
    'builder.totalPrice': 'Вкупна цена',
    'builder.buyNow': 'Купи сега',
    'builder.reset': 'Ресетирај',
    
    // Services
    'services.title': 'Наши услуги',
    'services.assembly.title': 'Склопување на PC',
    'services.assembly.desc': 'Професионална услуга за склопување. Ние го склопуваме вашиот PC за дополнителна сума.',
    'services.repair.title': 'PC Поправка',
    'services.repair.desc': 'Експертска услуга за поправка на сите компјутерски проблеми. Брзо и сигурно.',
    'services.delivery.title': 'Достава',
    'services.delivery.desc': 'Брза и сигурна достава до вашиот дом.',
    'services.pickup.title': 'Самоподигање',
    'services.pickup.desc': 'Подигнете ја вашата нарачка од нашата продавница.',
    
    // C2C Marketplace
    'c2c.title': 'C2C Маркетплејс',
    'c2c.subtitle': 'Купувај и продавај половни делови',
    'c2c.sellYourItem': 'Продади ја твојата опрема',
    'c2c.condition': 'Состојба',
    'c2c.excellent': 'Одлична',
    'c2c.good': 'Добра',
    'c2c.fair': 'Средна',
    'c2c.contactSeller': 'Контактирај продавач',
    
    // Footer
    'footer.about': 'За нас',
    'footer.aboutText': 'Ваш доверлив партнер за компјутерски делови, електроника и PC конфигурации.',
    'footer.quickLinks': 'Брзи линкови',
    'footer.support': 'Поддршка',
    'footer.newsletter': 'Билтен',
    'footer.newsletterText': 'Претплатете се за специјални понуди',
    'footer.subscribe': 'Претплати се',
    'footer.rights': 'Сите права задржани.',
    
    // Cart
    'cart.title': 'Кошничка',
    'cart.empty': 'Вашата кошничка е празна',
    'cart.total': 'Вкупно',
    'cart.checkout': 'Заврши нарачка',
    'cart.remove': 'Отстрани',
    'cart.itemAdded': 'Производот е додаден во кошничка!',
    
    // Product Details
    'details.specifications': 'Спецификации',
    'details.description': 'Опис',
    'details.availability': 'Достапност',
    'details.close': 'Затвори',
  },
  al: {
    // Header
    'nav.computers': 'Kompjuterë',
    'nav.phones': 'Telefonë',
    'nav.components': 'Komponentë',
    'nav.marketplace': 'Treg',
    'nav.pcBuilder': 'PC Ndërtues',
    'nav.services': 'Shërbime',
    
    // Hero
    'hero.title': 'Ndërto PC-në tënde të ëndrrave',
    'hero.subtitle': 'Pjesë kompjuteri premium & treg elektronike',
    'hero.buildNow': 'Ndërto tani',
    'hero.browseProducts': 'Shfleto produktet',
    'hero.stat1': 'Produkte',
    'hero.stat2': 'Klientë të lumtur',
    'hero.stat3': 'Marka',
    
    // Products
    'products.featured': 'Produktet e zgjedhura',
    'products.computers': 'Kompjuterë',
    'products.phones': 'Telefonë',
    'products.viewDetails': 'Shiko detajet',
    'products.addToCart': 'Shto në shportë',
    'products.inStock': 'Në stok',
    'products.outOfStock': 'Jashtë stokut',
    'products.shop': 'Dyqan',
    
    // PC Builder
    'builder.title': 'Mjet për ndërtimin e PC',
    'builder.subtitle': 'Ndërto PC-në tënde hap pas hapi',
    'builder.cpu': 'Procesori (CPU)',
    'builder.gpu': 'Karta grafike (GPU)',
    'builder.ram': 'Memoria (RAM)',
    'builder.storage': 'Ruajtja',
    'builder.motherboard': 'Pllaka bazë',
    'builder.psu': 'Furnizimi me energji',
    'builder.case': 'Kuti',
    'builder.select': 'Zgjidh',
    'builder.selected': 'Zgjedhur',
    'builder.totalPrice': 'Çmimi total',
    'builder.buyNow': 'Bli tani',
    'builder.reset': 'Rivendos',
    
    // Services
    'services.title': 'Shërbimet tona',
    'services.assembly.title': 'Montimi i PC',
    'services.assembly.desc': 'Shërbim profesional i ndërtimit të PC. Ne e montojmë PC-në tënde për një pagesë shtesë.',
    'services.repair.title': 'Riparimi i PC',
    'services.repair.desc': 'Shërbime eksperte riparimi për të gjitha problemet e kompjuterit. I shpejtë dhe i besueshëm.',
    'services.delivery.title': 'Dërgesa në shtëpi',
    'services.delivery.desc': 'Dërgesa e shpejtë dhe e sigurt deri në derën tuaj.',
    'services.pickup.title': 'Marrje vetë',
    'services.pickup.desc': 'Merrni porosinë tuaj nga dyqani ynë fizik sipas lehtësisë suaj.',
    
    // C2C Marketplace
    'c2c.title': 'Tregu C2C',
    'c2c.subtitle': 'Bli dhe shit pjesë kompjuteri të përdorura',
    'c2c.sellYourItem': 'Shit artikullin tënd',
    'c2c.condition': 'Gjendja',
    'c2c.excellent': 'E shkëlqyer',
    'c2c.good': 'E mirë',
    'c2c.fair': 'Mesatare',
    'c2c.contactSeller': 'Kontakto shitësin',
    
    // Footer
    'footer.about': 'Rreth nesh',
    'footer.aboutText': 'Partneri juaj i besuar për pjesë kompjuteri, elektronikë dhe ndërtime PC personalizuara.',
    'footer.quickLinks': 'Lidhje të shpejta',
    'footer.support': 'Mbështetje',
    'footer.newsletter': 'Buletini',
    'footer.newsletterText': 'Abonohu për oferta speciale dhe përditësime',
    'footer.subscribe': 'Abonohu',
    'footer.rights': 'Të gjitha të drejtat e rezervuara.',
    
    // Cart
    'cart.title': 'Shporta',
    'cart.empty': 'Shporta juaj është bosh',
    'cart.total': 'Totali',
    'cart.checkout': 'Përfundo blerjen',
    'cart.remove': 'Hiq',
    'cart.itemAdded': 'Artikulli u shtua në shportë!',
    
    // Product Details
    'details.specifications': 'Specifikimet',
    'details.description': 'Përshkrimi',
    'details.availability': 'Disponueshmëria',
    'details.close': 'Mbyll',
  },
};

// Currency configurations for each language
const currencies: Record<Language, Currency> = {
  en: { code: 'USD', symbol: '$', rate: 0.018 }, // 1 MKD = 0.018 USD
  mk: { code: 'MKD', symbol: 'ден', rate: 1 },    // Base currency
  al: { code: 'ALL', symbol: 'Lek', rate: 1.8 },  // 1 MKD = 1.8 ALL
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const getCurrency = (): Currency => {
    return currencies[language];
  };

  const convertPrice = (priceInMKD: number): number => {
    const currency = getCurrency();
    return Math.round(priceInMKD * currency.rate);
  };

  const formatPrice = (priceInMKD: number): string => {
    const currency = getCurrency();
    const convertedPrice = convertPrice(priceInMKD);
    
    // Format with thousand separators
    const formatted = convertedPrice.toLocaleString(
      language === 'en' ? 'en-US' : language === 'mk' ? 'mk-MK' : 'sq-AL'
    );
    
    // Place symbol based on currency
    if (currency.code === 'USD') {
      return `${currency.symbol}${formatted}`;
    } else {
      return `${formatted} ${currency.symbol}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCurrency, formatPrice, convertPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
