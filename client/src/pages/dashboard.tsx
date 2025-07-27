import { Navigation } from '@/components/navigation';
import { ProjectTrackingDashboard } from '@/components/project-tracking-dashboard';
import { useLanguage } from '@/components/language-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ArrowLeft, Key, LogIn, User, Folder, FileText } from 'lucide-react';
import { useLocation } from 'wouter';
import backgroundImage from '@assets/image_1753623059363.png';

export default function Dashboard() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Start with false for faster loading
  const [loginId, setLoginId] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Fast authentication check - immediate, no loading delay
    const storedId = localStorage.getItem('alphaG8Id');
    const sessionActive = localStorage.getItem('sessionActive');
    
    if (storedId && sessionActive === 'true') {
      setIsAuthenticated(true);
      setAlphaG8Id(storedId);
    } else {
      setIsAuthenticated(false);
    }
    
    // Listen for auth changes
    const handleStorageChange = () => {
      const storedId = localStorage.getItem('alphaG8Id');
      const sessionActive = localStorage.getItem('sessionActive');
      
      if (storedId && sessionActive === 'true') {
        setIsAuthenticated(true);
        setAlphaG8Id(storedId);
      } else {
        setIsAuthenticated(false);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleGoHome = () => {
    // Use fast SPA navigation instead of page reload
    setLocation('/');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginId.trim()) return;
    
    setIsLoggingIn(true);
    
    // Instant authentication for better UX
    if (loginId.trim().length >= 8) { // Basic validation
      localStorage.setItem('alphaG8Id', loginId);
      localStorage.setItem('sessionActive', 'true');
      setIsAuthenticated(true);
      setAlphaG8Id(loginId);
    }
    setIsLoggingIn(false);
  };

  // Removed loading state for instant page rendering

  // Replace the empty second screen with functional dashboard navigation
  const handleViewProjects = () => {
    // Navigate to projects view
    console.log('View Projects clicked');
  };

  const handleUploadProject = () => {
    // Open project upload modal
    console.log('Upload Project clicked');
  };

  const handleMyInformation = () => {
    // Open user information modal
    console.log('My Information clicked');
  };

  const handleViewKeyCard = () => {
    // Display ALPHAG8 ID KEY with one-year validity
    console.log('View Key Card clicked');
  };

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
                  {t('enter-alphag8-id-key-to-access')}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 mb-6">
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                  <Input
                    type="text"
                    placeholder="ALPHAG8 ID KEY"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:border-emerald-400 focus:ring-emerald-400"
                    disabled={isLoggingIn}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn || !loginId.trim()}
                  className="w-full bg-emerald-600/80 hover:bg-emerald-600 disabled:bg-gray-500/50 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-emerald-500/30 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      {t('authenticating')}...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      {t('access-dashboard')}
                    </>
                  )}
                </button>
              </form>

              {/* Return button */}
              <button
                onClick={handleGoHome}
                className="w-full bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 border border-gray-500/30 flex items-center justify-center gap-2"
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
          {/* Header with Navigation Options */}
          <div className="mb-8 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
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
                <p className="text-sm text-gray-600 mb-1">
                  ID: {alphaG8Id}
                </p>
                <p className="text-xs text-emerald-600 font-medium">
                  {t('valid-for-one-year')}
                </p>
              </div>
            </div>
            
            {/* Navigation Options */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={handleViewKeyCard}
                className="flex items-center justify-center space-x-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 transition-all duration-200"
              >
                <Key className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">{t('view-id-key-card')}</span>
              </button>
              
              <button
                onClick={handleViewProjects}
                className="flex items-center justify-center space-x-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl p-4 transition-all duration-200"
              >
                <Folder className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-800 font-medium">{t('my-projects')}</span>
              </button>
              
              <button
                onClick={handleUploadProject}
                className="flex items-center justify-center space-x-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4 transition-all duration-200"
              >
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">{t('upload-new-project')}</span>
              </button>
              
              <button
                onClick={handleMyInformation}
                className="flex items-center justify-center space-x-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 transition-all duration-200"
              >
                <User className="h-5 w-5 text-slate-600" />
                <span className="text-slate-800 font-medium">{t('my-information')}</span>
              </button>
            </div>
          </div>
          
          <ProjectTrackingDashboard userId={alphaG8Id} />
        </div>
      </main>
    </div>
  );
}