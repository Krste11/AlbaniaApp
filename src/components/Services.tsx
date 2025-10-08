import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Settings, Package, Truck, Wrench } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Settings,
      titleKey: 'services.assembly.title',
      descKey: 'services.assembly.desc',
      gradient: 'from-primary to-accent'
    },
    {
      icon: Wrench,
      titleKey: 'services.repair.title',
      descKey: 'services.repair.desc',
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Truck,
      titleKey: 'services.delivery.title',
      descKey: 'services.delivery.desc',
      gradient: 'from-accent to-primary'
    },
    {
      icon: Package,
      titleKey: 'services.pickup.title',
      descKey: 'services.pickup.desc',
      gradient: 'from-success to-info'
    }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-secondary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {t(service.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t(service.descKey)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Highlight */}
        <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 lg:p-12 order-2 md:order-1">
              <h3 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('services.assembly.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('services.assembly.desc')}
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90"
                onClick={() => toast.success('Support request received! Our team will contact you shortly.')}
              >
                {t('footer.support')}
              </Button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800"
                alt="PC Repair Service"
                className="w-full h-full object-cover min-h-[300px] rounded-lg"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
