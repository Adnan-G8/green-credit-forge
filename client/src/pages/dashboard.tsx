import { Navigation } from '@/components/navigation';
import { ProjectTrackingDashboard } from '@/components/project-tracking-dashboard';
import { useLanguage } from '@/components/language-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Lock, ArrowLeft } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('access-restricted')}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t('dashboard-requires-authentication')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center text-emerald-800 mb-2">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-medium">{t('required-access')}</span>
                  </div>
                  <p className="text-sm text-emerald-700">
                    {t('valid-alphag8-id-required')}
                  </p>
                </div>
                
                <Button 
                  onClick={handleGoHome}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('return-home')}
                </Button>
              </div>
            </div>
          </div>
        </main>
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