import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, Check, Store, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart, Product } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { t, formatPrice } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product);
      toast.success(t('cart.itemAdded'));
    }
  };

  // Get shop color based on shop name
  const getShopColor = (shop: string) => {
    const colors: Record<string, string> = {
      'Anhoch': 'bg-primary text-primary-foreground',
      'Setec': 'bg-secondary text-secondary-foreground',
      'Neptune': 'bg-accent text-accent-foreground',
      'TechnoMarket': 'bg-info text-info-foreground',
      'AMC': 'bg-warning text-warning-foreground',
      'default': 'bg-muted text-muted-foreground'
    };
    return colors[shop] || colors['default'];
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/20">
      <div className="relative overflow-hidden bg-muted">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.inStock && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground gap-1 shadow-lg">
            <Check className="w-3 h-3" />
            {t('products.inStock')}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <Button
            size="sm"
            variant="secondary"
            className="gap-2"
            onClick={() => onViewDetails(product)}
          >
            <Eye className="w-4 h-4" />
            {t('products.viewDetails')}
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{product.category}</span>
          <Badge variant="outline" className={`text-xs gap-1 ${getShopColor(product.shop)}`}>
            <Store className="w-3 h-3" />
            {product.shop}
          </Badge>
        </div>
        <h3 className="line-clamp-2 mb-3 min-h-[3rem]">{product.name}</h3>
        <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {formatPrice(product.price)}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4" />
          {t('products.addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
