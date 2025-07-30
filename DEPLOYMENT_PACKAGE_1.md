# FAGRI DIGITAL - Deployment Package Part 1/3

## 🔐 Authentication System Components

### 1. Main Authentication Hook
**File: `client/src/hooks/use-authentication.ts`**
```typescript
import { useState, useEffect, useCallback } from 'react';

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('fagri-authenticated');
    localStorage.removeItem('fagri-auth-timestamp');
    localStorage.removeItem('fagri-last-activity');
    setIsAuthenticated(false);
  }, []);

  const checkSessionExpiry = useCallback(() => {
    const authStatus = localStorage.getItem('fagri-authenticated');
    const authTimestamp = localStorage.getItem('fagri-auth-timestamp');
    const lastActivity = localStorage.getItem('fagri-last-activity');
    
    if (authStatus === 'true' && authTimestamp) {
      const now = Date.now();
      const authTime = parseInt(authTimestamp);
      const lastActivityTime = lastActivity ? parseInt(lastActivity) : authTime;
      
      if (now - lastActivityTime > SESSION_TIMEOUT) {
        logout();
        window.dispatchEvent(new CustomEvent('sessionExpired'));
        return false;
      }
      
      localStorage.setItem('fagri-last-activity', now.toString());
      return true;
    }
    
    return false;
  }, [logout]);

  const updateActivity = useCallback(() => {
    if (localStorage.getItem('fagri-authenticated') === 'true') {
      localStorage.setItem('fagri-last-activity', Date.now().toString());
    }
  }, []);

  useEffect(() => {
    const isValidSession = checkSessionExpiry();
    setIsAuthenticated(isValidSession);
    setIsLoading(false);

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const setupActivityListeners = () => {
      activityEvents.forEach(event => {
        document.addEventListener(event, updateActivity, true);
      });
    };

    const removeActivityListeners = () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };

    if (isValidSession) {
      setupActivityListeners();
    }

    const intervalId = setInterval(() => {
      const authStatus = localStorage.getItem('fagri-authenticated');
      if (authStatus === 'true') {
        const isValid = checkSessionExpiry();
        if (!isValid && isAuthenticated) {
          setIsAuthenticated(false);
          removeActivityListeners();
        }
      }
    }, 60000);

    return () => {
      removeActivityListeners();
      clearInterval(intervalId);
    };
  }, [checkSessionExpiry, updateActivity, isAuthenticated]);

  const authenticate = () => {
    const now = Date.now();
    localStorage.setItem('fagri-authenticated', 'true');
    localStorage.setItem('fagri-auth-timestamp', now.toString());
    localStorage.setItem('fagri-last-activity', now.toString());
    setIsAuthenticated(true);
  };

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
  };
}
```

### 2. Language Provider Component
**File: `client/src/components/language-provider.tsx`**
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/translations';

type Language = 'it' | 'en';
type TranslationKey = keyof typeof translations.it;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('it');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'it' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    console.log('Switching language to:', lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
    console.log('Language state updated to:', lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.it[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
```

### 3. Dashboard Component (Fixed Authentication)
**File: `client/src/pages/dashboard.tsx`**
```typescript
import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ArrowLeft, Key, LogIn, Activity, Calendar, FileText, Users, TrendingUp, MapPin, Leaf, Zap, Building } from 'lucide-react';
import { useLocation } from 'wouter';

// Background image import
import backgroundImage from '@assets/Bildschirmfoto 2025-07-30 um 17.40.16_1753890018629.png';

export default function Dashboard() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [loginId, setLoginId] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userProjects, setUserProjects] = useState<any[]>([]);

  // Test project data for demonstration
  const testProjects = [
    {
      id: 'PROJ-001',
      name: 'Renewable Energy Farm - Tuscany',
      type: 'Renewable Energy',
      status: 'active',
      co2Reduction: 450,
      location: 'Tuscany, Italy',
      certification: 'EUFD2025-001',
      nextMilestone: '2025-08-15',
      hectares: 85,
      energyType: 'Solar Photovoltaic'
    },
    {
      id: 'PROJ-002', 
      name: 'Sustainable Agriculture - Emilia',
      type: 'Farming',
      status: 'pending',
      co2Reduction: 320,
      location: 'Emilia-Romagna, Italy',
      certification: 'ISO 14064-2',
      nextMilestone: '2025-08-10',
      hectares: 120,
      crops: 'Organic Wheat & Barley'
    },
    {
      id: 'PROJ-003',
      name: 'Forest Carbon Project - Umbria',
      type: 'Forest',
      status: 'completed',
      co2Reduction: 680,
      location: 'Umbria, Italy',
      certification: 'EUFD2025-001',
      completedDate: '2025-07-20',
      hectares: 200,
      treeSpecies: 'Oak & Beech'
    }
  ];

  const loadUserData = (userId: string) => {
    localStorage.setItem('userProjects', JSON.stringify(testProjects));
    setUserProjects(testProjects);
  };

  useEffect(() => {
    localStorage.setItem('userProjects', JSON.stringify(testProjects));
    
    let storedId = localStorage.getItem('alphaG8Id');
    const sessionActive = localStorage.getItem('sessionActive');
    const fagriAuth = localStorage.getItem('fagri-authenticated');
    
    if (storedId && storedId.startsWith('ALPHAG8-')) {
      const newId = storedId.replace('ALPHAG8-', 'FAGRI-');
      localStorage.setItem('alphaG8Id', newId);
      storedId = newId;
    }
    
    if (storedId && (sessionActive === 'true' || fagriAuth === 'true')) {
      setIsAuthenticated(true);
      setAlphaG8Id(storedId);
      loadUserData(storedId);
    } else {
      setIsAuthenticated(false);
    }
    
    const handleStorageChange = () => {
      let storedId = localStorage.getItem('alphaG8Id');
      const sessionActive = localStorage.getItem('sessionActive');
      const fagriAuth = localStorage.getItem('fagri-authenticated');
      
      if (storedId && storedId.startsWith('ALPHAG8-')) {
        const newId = storedId.replace('ALPHAG8-', 'FAGRI-');
        localStorage.setItem('alphaG8Id', newId);
        storedId = newId;
      }
      
      if (storedId && (sessionActive === 'true' || fagriAuth === 'true')) {
        setIsAuthenticated(true);
        setAlphaG8Id(storedId);
        loadUserData(storedId);
      } else {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleReturnHome = () => {
    setLocation('/');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginId.trim()) return;
    setIsLoggingIn(true);
    
    if (loginId.trim().length >= 8) {
      let processedId = loginId.trim();
      if (processedId.startsWith('ALPHAG8-')) {
        processedId = processedId.replace('ALPHAG8-', 'FAGRI-');
      }
      
      localStorage.setItem('alphaG8Id', processedId);
      localStorage.setItem('sessionActive', 'true');
      
      const now = Date.now();
      localStorage.setItem('fagri-authenticated', 'true');
      localStorage.setItem('fagri-auth-timestamp', now.toString());
      localStorage.setItem('fagri-last-activity', now.toString());
      
      setAlphaG8Id(processedId);
      loadUserData(processedId);
      
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoggingIn(false);
      }, 100);
      
      return;
    }
    setIsLoggingIn(false);
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen relative flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">FAGRI.Digital</h1>
              <div className="w-16 h-0.5 bg-emerald-400 mx-auto mb-6"></div>
              <h2 className="text-xl font-light text-white/90 mb-4">{t('access-restricted')}</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('dashboard-requires-authentication')}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                <Input
                  type="text"
                  placeholder="FAGRI-XXXXXXXX-XXXXXXXX-XX"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-emerald-400"
                  disabled={isLoggingIn}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoggingIn || !loginId.trim()}
                className="w-full bg-emerald-600/80 hover:bg-emerald-600 disabled:opacity-50"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {isLoggingIn ? t('authenticating') + '...' : t('access-dashboard')}
              </Button>
            </form>

            <div className="text-center mb-6">
              <p className="text-white/60 text-xs mb-2">{t('test-account')}</p>
              <p className="text-emerald-300 font-mono text-xs">FAGRI-TEST001-TEST001-T1</p>
            </div>

            <button
              onClick={handleReturnHome}
              className="w-full flex items-center justify-center space-x-2 text-white/80 hover:text-white transition-colors py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">{t('return-home')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div 
        className="relative h-48 sm:h-60 overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-800/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-light text-white mb-2 sm:mb-3">
                {t('project-tracking-dashboard')}
              </h1>
              <p className="text-emerald-100 text-sm sm:text-lg font-light mb-3 sm:mb-4">
                {t('monitor-co2-certification-projects')}
              </p>
              <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-6 sm:py-3 border border-white/30">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-300 flex-shrink-0" />
                    <span className="text-white font-medium text-sm sm:text-base">{t('authenticated-session')}</span>
                  </div>
                </div>
                <div className="bg-emerald-600/30 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-6 sm:py-3 border border-emerald-400/50 w-full sm:w-auto sm:min-w-[280px]">
                  <div className="text-xs text-emerald-200 font-medium">ALPHAG8 ID KEY</div>
                  <div className="text-white font-mono text-xs sm:text-sm truncate">{alphaG8Id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative -mt-12 sm:-mt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-8 mt-16 sm:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-light text-slate-900 mb-1 sm:mb-2">
                  {t('platform-workspace')}
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {t('access-co2-certification-tools')}
                </p>
              </div>
            </div>

            {/* Project Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-emerald-900">{t('total-projects')}</h3>
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="text-2xl font-light text-emerald-800">{userProjects.length}</p>
                <p className="text-emerald-600 text-xs sm:text-sm">{t('active-certifications')}</p>
              </div>
              
              <div className="p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-900">{t('co2-saved')}</h3>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-light text-blue-800">
                  {userProjects.reduce((total, project) => total + project.co2Reduction, 0)} {t('tons')}
                </p>
                <p className="text-blue-600 text-xs sm:text-sm">{t('annual-reduction')}</p>
              </div>
              
              <div className="p-4 sm:p-6 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-amber-900">{t('certificates')}</h3>
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-2xl font-light text-amber-800">
                  {userProjects.filter(p => p.status === 'completed').length}
                </p>
                <p className="text-amber-600 text-xs sm:text-sm">{t('issued-this-year')}</p>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-900">{t('your-projects')}</h3>
              {userProjects.map((project) => (
                <div key={project.id} className="bg-white p-4 sm:p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h4 className="font-medium text-slate-900">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status === 'active' ? t('active') : 
                           project.status === 'pending' ? t('pending') : t('completed')}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Leaf className="h-3 w-3" />
                          <span>{project.co2Reduction} {t('tons')} CO₂</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {project.type === 'Renewable Energy' ? <Zap className="h-3 w-3" /> : 
                           project.type === 'Farming' ? <Leaf className="h-3 w-3" /> : 
                           <Building className="h-3 w-3" />}
                          <span>{project.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{project.nextMilestone || project.completedDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      {t('view-details')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

**THIS IS PART 1 OF 3**
Continue to DEPLOYMENT_PACKAGE_2.md for more components...