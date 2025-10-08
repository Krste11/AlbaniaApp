import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, MapPin, Clock, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

const listings = [
  {
    id: 1,
    title: 'RTX 3080 Ti - Excellent Condition',
    price: 45000,
    location: 'Skopje, Center',
    timeAgo: '2h ago',
    seller: 'Marko P.',
    condition: 'excellent',
    image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=800',
    featured: true
  },
  {
    id: 2,
    title: 'iPhone 14 Pro 128GB Purple',
    price: 52000,
    location: 'Bitola',
    timeAgo: '5h ago',
    seller: 'Ana M.',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'
  },
  {
    id: 3,
    title: 'ROG Gaming Laptop i7 RTX 3070',
    price: 75000,
    location: 'Skopje, Karpos',
    timeAgo: 'Yesterday',
    seller: 'Darko T.',
    condition: 'excellent',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
    featured: true
  },
  {
    id: 4,
    title: 'Corsair 32GB DDR4 3600MHz RAM',
    price: 8500,
    location: 'Tetovo',
    timeAgo: '1 day ago',
    seller: 'Igor S.',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800'
  }
];

export function C2CMarketplace() {
  const { t, formatPrice } = useLanguage();

  const getConditionBadge = (condition: string) => {
    const badges: Record<string, { text: string, color: string }> = {
      'excellent': { text: t('c2c.excellent'), color: 'bg-success text-success-foreground' },
      'good': { text: t('c2c.good'), color: 'bg-info text-info-foreground' },
      'fair': { text: t('c2c.fair'), color: 'bg-warning text-warning-foreground' }
    };
    return badges[condition] || badges['good'];
  };

  return (
    <section id="marketplace" className="py-16 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-accent to-secondary text-white">
              {t('c2c.title')}
            </Badge>
            <h2 className="mb-4 bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              {t('c2c.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('c2c.subtitle')}
            </p>
          </div>
          <Button 
            size="lg" 
            className="gap-2 bg-gradient-to-r from-accent to-secondary hover:opacity-90"
            onClick={() => toast.info('Sell item feature coming soon! Please contact us for more info.')}
          >
            <Plus className="w-5 h-5" />
            {t('c2c.sellYourItem')}
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {listings.map((listing) => {
            const conditionBadge = getConditionBadge(listing.condition);
            return (
              <Card key={listing.id} className="group hover:shadow-xl transition-all overflow-hidden border-2 hover:border-accent/20">
                <div className="relative">
                  <ImageWithFallback
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {listing.featured && (
                    <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground shadow-lg">
                      Featured
                    </Badge>
                  )}
                  <Badge className={`absolute top-3 left-3 ${conditionBadge.color} shadow-lg`}>
                    {conditionBadge.text}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="mb-3 line-clamp-2">{listing.title}</h4>
                  <div className="text-2xl mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    {formatPrice(listing.price)}
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {listing.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      {listing.seller}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      {listing.timeAgo}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-accent to-secondary hover:opacity-90"
                    onClick={() => toast.success(`Contact request sent to ${listing.seller}. They will respond soon!`)}
                  >
                    {t('c2c.contactSeller')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-2">
            {t('products.viewDetails')}
          </Button>
        </div>
      </div>
    </section>
  );
}
