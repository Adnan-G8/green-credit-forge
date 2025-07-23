import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';
import heroImage from '@assets/image_1753265882850.png';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

  const correctPassword = 'FAGRI2025'; // You can change this password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief loading time
    setTimeout(() => {
      if (password === correctPassword) {
        localStorage.setItem('fagri-authenticated', 'true');
        onAuthenticated();
        toast({
          title: t('password-success'),
          description: t('password-success-desc'),
        });
      } else {
        toast({
          title: t('password-error'),
          description: t('password-error-desc'),
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beautiful Agricultural Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/20">
          <button
            onClick={() => setLanguage('it')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              language === 'it' 
                ? 'bg-white text-emerald-700' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            IT
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              language === 'en' 
                ? 'bg-white text-emerald-700' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
            
            {/* Logo/Title */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
                {t('password-title')}
              </h1>
              <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
            </div>

            {/* Welcome Message */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-light text-emerald-100 mb-6">
                {t('password-subtitle')}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
                {t('password-description')}
              </p>
            </div>

            {/* Access Form */}
            <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-emerald-500 rounded-full">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-medium text-white mb-6">
                {t('password-access-title')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('password-placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-12 py-3 text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-medium disabled:opacity-50"
                >
                  {isLoading ? t('password-verifying') : t('password-button')}
                </Button>
              </form>
              
              <p className="text-white/60 text-sm mt-6">
                {t('password-contact')}
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">{t('password-feature1')}</h4>
                <p className="text-white/70 text-sm">{t('password-feature1-desc')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">{t('password-feature2')}</h4>
                <p className="text-white/70 text-sm">{t('password-feature2-desc')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">{t('password-feature3')}</h4>
                <p className="text-white/70 text-sm">{t('password-feature3-desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}