import { Navigation } from '@/components/navigation';
import { ProjectTrackingDashboard } from '@/components/project-tracking-dashboard';
import { useLanguage } from '@/components/language-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import backgroundImage from '@assets/image_1753623059363.png';

export default function Dashboard() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for authentication state
    const checkAuth = () => {
      const storedId = localStorage.getItem('alphaG8Id');
      const sessionActive = localStorage.getItem('sessionActive');
      
      if (storedId && sessionActive === 'true') {
        setIsAuthenticated(true);
        setAlphaG8Id(storedId);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
    
    // Listen for auth changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen relative flex items-center justify-center p-4"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Main content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Glass morphism card */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            {/* Header with logo styling */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">
                FAGRI.Digital
              </h1>
              <div className="w-16 h-0.5 bg-emerald-400 mx-auto mb-6"></div>
              <h2 className="text-xl font-light text-white/90 mb-4">
                {t('access-restricted')}
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('dashboard-requires-authentication')}
              </p>
            </div>

            {/* Access requirements */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-400/30">
                  <Lock className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-white font-medium mb-2">{t('required-access')}</h3>
                <p className="text-white/70 text-sm">
                  {t('valid-alphag8-id-required')}
                </p>
              </div>

              {/* Return button */}
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-emerald-600/80 hover:bg-emerald-600 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('return-home')}
              </button>
            </div>

            {/* Features showcase */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-white/70">
                <div className="text-xs font-medium text-emerald-400 mb-1">CO₂ Certification</div>
                <div className="text-xs">EUFD2025-001</div>
                <div className="text-xs">Standard</div>
              </div>
              <div className="text-white/70">
                <div className="text-xs font-medium text-emerald-400 mb-1">Blockchain</div>
                <div className="text-xs">Secure &</div>
                <div className="text-xs">Transparent</div>
              </div>
              <div className="text-white/70">
                <div className="text-xs font-medium text-emerald-400 mb-1">Global Network</div>
                <div className="text-xs">Agricultural</div>
                <div className="text-xs">Excellence</div>
              </div>
            </div>
          </div>

          {/* Photo credit */}
          <div className="mt-4 text-center">
            <p className="text-white/60 text-xs">
              Foto By Gildo Cancelli
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('project-tracking-dashboard')}
                </h1>
                <p className="text-gray-600">
                  {t('monitor-co2-certification-projects')}
                </p>
              </div>
              <div className="text-right">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  <Shield className="h-4 w-4 inline mr-1" />
                  {t('authenticated-session')}
                </div>
                <p className="text-sm text-gray-600">
                  ID: {alphaG8Id}
                </p>
              </div>
            </div>
          </div>
          <ProjectTrackingDashboard userId={alphaG8Id} />
        </div>
      </main>
    </div>
  );
}