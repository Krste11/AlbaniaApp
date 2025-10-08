import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, Check, X, Store } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetails({ product, isOpen, onClose }: ProductDetailsProps) {
  const { t, formatPrice } = useLanguage();
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(t('cart.itemAdded'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            {product.inStock ? (
              <Badge className="absolute top-3 right-3 bg-success text-success-foreground gap-1">
                <Check className="w-3 h-3" />
                {t('products.inStock')}
              </Badge>
            ) : (
              <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground gap-1">
                <X className="w-3 h-3" />
                {t('products.outOfStock')}
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
              <div className="flex items-center gap-2 mb-3">
                <Store className="w-4 h-4 text-muted-foreground" />
                <Badge variant="secondary" className="gap-1">
                  {t('products.shop')}: <span className="font-semibold">{product.shop}</span>
                </Badge>
              </div>
              <div className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="mb-2">{t('details.description')}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div>
                <h3 className="mb-2">{t('details.specifications')}</h3>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm border-b pb-2">
                      <span className="text-muted-foreground">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="mb-2">{t('details.availability')}</h4>
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <Check className="w-5 h-5 text-success" />
                    <span className="text-sm text-success">{t('products.inStock')}</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-destructive">{t('products.outOfStock')}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                className="flex-1 gap-2 bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4" />
                {t('products.addToCart')}
              </Button>
              <Button variant="outline" onClick={onClose}>
                {t('details.close')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
