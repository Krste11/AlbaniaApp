import { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gradient-to-br from-primary via-accent to-secondary text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4 [&>div]:text-white [&>div>div>span]:text-white [&>div>div>span]:from-white [&>div>div>span]:to-white/80">
              <Logo />
            </div>
            <p className="text-white/80 mb-4">
              {t('footer.aboutText')}
            </p>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-white/10 text-white"
                onClick={() => window.open('https://facebook.com', '_blank')}
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-white/10 text-white"
                onClick={() => window.open('https://instagram.com', '_blank')}
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-white/10 text-white"
                onClick={() => window.open('https://youtube.com', '_blank')}
              >
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#computers" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.computers')}
                </a>
              </li>
              <li>
                <a href="#phones" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.phones')}
                </a>
              </li>
              <li>
                <a href="#pc-builder" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.pcBuilder')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#marketplace" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.marketplace')}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-white">{t('footer.support')}</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Warranty</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Vasil Glavinov 12, Skopje 1000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+389 2 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@techmarket.mk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="mb-2 text-white">{t('footer.newsletter')}</h3>
            <p className="text-white/80 mb-4 text-sm">
              {t('footer.newsletterText')}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => {
                  if (email) {
                    toast.success('Successfully subscribed to newsletter!');
                    setEmail('');
                  } else {
                    toast.error('Please enter a valid email');
                  }
                }}
              >
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <p>&copy; 2025 TechMarket.mk. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
