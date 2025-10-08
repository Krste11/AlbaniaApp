import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-accent to-secondary text-white px-4 py-2 rounded-full shadow-lg">
              <Zap className="w-4 h-4" />
              <span className="text-sm">{t('nav.pcBuilder')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              {t('hero.title')}<br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                PC
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={() => document.getElementById('pc-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.buildNow')}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2"
                onClick={() => document.querySelector('.featured-products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.browseProducts')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">5000+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stat1')}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="text-3xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stat2')}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-3xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stat3')}</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-accent/30 to-secondary/30 rounded-3xl blur-3xl" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200"
              alt="Gaming Setup"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-2 border-primary/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
