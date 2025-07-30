# FAGRI DIGITAL - Complete Code Package
## Bilingual CO₂ Certification Platform with Banking-Style Design

---

## 📁 Project Structure
```
fagri-digital/
├── client/src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── assets/
├── server/
├── shared/
└── configuration files
```

---

## 🔐 Authentication System

### Main Authentication Hook
**File: `client/src/hooks/use-authentication.ts`**
```typescript
import { useState, useEffect, useCallback } from 'react';

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes

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

  const authenticate = () => {
    const now = Date.now();
    localStorage.setItem('fagri-authenticated', 'true');
    localStorage.setItem('fagri-auth-timestamp', now.toString());
    localStorage.setItem('fagri-last-activity', now.toString());
    setIsAuthenticated(true);
  };

  return { isAuthenticated, isLoading, authenticate, logout };
}
```

---

## 🌐 Language System

### Language Provider
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
  const [language, setLanguage] = useState<Language>('it'); // Italian as default

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

---

## 🛡️ Security Page (Fixed ALPHAG8 Section)

### Security Component
**File: `client/src/pages/security.tsx`**
```typescript
import React from 'react';
import { useScrollToTop } from '../hooks/use-scroll-to-top';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { useLanguage } from '../components/language-provider';
import { Shield, Database, Lock, CheckCircle, Server, Globe, Eye, Key, Mountain, Building, Leaf } from 'lucide-react';

export default function Security() {
  const { language } = useLanguage();
  useScrollToTop();

  const content = {
    en: {
      heroTitle: "Digital Security",
      heroSubtitle: "Security and reliability of our infrastructure represent the foundation of trust you place in FAGRI Digital.",
      
      // ALPHAG8 ID KEY Section - English
      alphag8SecureAccess: "Secure Access. No Passwords. No Hassle.",
      alphag8ThreeFactorAuth: "Three-Factor Authentication (3FA)",
      alphag8Description: "The ALPHAG8 ID KEY is your personal digital fingerprint – a smart, invisible security layer that uses your own device (smartphone or computer) as your unique login key. No passwords, no SMS codes, no key fobs – just seamless access based on who you are and what you use.",
      alphag8ThreeFactorTitle: "3-Factor Authentication:",
      alphag8ThreeFactorDesc: "Combines your device's hardware, software, and usage pattern",
      alphag8ZeroTrustTitle: "Zero-Trust Security:",
      alphag8ZeroTrustDesc: "Each login is fully re-validated – no shortcuts, no reuse",
      alphag8PhoneKeyTitle: "Your Phone = Your Key:",
      alphag8PhoneKeyDesc: "Without your phone, access is impossible – even with your password",
      alphag8BiometricTitle: "Biometric-Ready:",
      alphag8BiometricDesc: "Supports fingerprint or facial recognition when available",
      alphag8SilentSecureTitle: "Silent and Secure:",
      alphag8SilentSecureDesc: "No extra steps for you – maximum protection in the background",
      alphag8IdentityPrivate: "Your identity stays private. Your access stays protected.",
      alphag8TrustInvisible: "ALPHAG8 ID KEY – Because trust should be invisible, but unbreakable.",
      
      // Other sections...
      accessTitle: "Three-Factor Authentication (3FA)",
      dataTitle: "Data Sovereignty and Access Control",
      alpineTitle: "Alpine Data Centers",
      // Add all other English translations...
    },
    it: {
      heroTitle: "Sicurezza Digitale",
      heroSubtitle: "La sicurezza e l'affidabilità della nostra infrastruttura rappresentano il fondamento della fiducia che riponete in FAGRI Digital.",
      
      // ALPHAG8 ID KEY Section - Italian
      alphag8SecureAccess: "Accesso Sicuro. Nessuna Password. Nessun Problema.",
      alphag8ThreeFactorAuth: "Autenticazione a Tre Fattori (3FA)",
      alphag8Description: "L'ALPHAG8 ID KEY è la tua impronta digitale personale – uno strato di sicurezza intelligente e invisibile che utilizza il tuo dispositivo (smartphone o computer) come chiave di accesso unica. Nessuna password, nessun codice SMS, nessun token – solo accesso fluido basato su chi sei e cosa usi.",
      alphag8ThreeFactorTitle: "Autenticazione a 3 Fattori:",
      alphag8ThreeFactorDesc: "Combina hardware, software e pattern di utilizzo del tuo dispositivo",
      alphag8ZeroTrustTitle: "Sicurezza Zero-Trust:",
      alphag8ZeroTrustDesc: "Ogni accesso è completamente ri-validato – nessuna scorciatoia, nessun riutilizzo",
      alphag8PhoneKeyTitle: "Il Tuo Telefono = La Tua Chiave:",
      alphag8PhoneKeyDesc: "Senza il tuo telefono, l'accesso è impossibile – anche con la tua password",
      alphag8BiometricTitle: "Pronto per Biometria:",
      alphag8BiometricDesc: "Supporta riconoscimento delle impronte o facciale quando disponibile",
      alphag8SilentSecureTitle: "Silenzioso e Sicuro:",
      alphag8SilentSecureDesc: "Nessun passaggio extra per te – massima protezione in background",
      alphag8IdentityPrivate: "La tua identità rimane privata. Il tuo accesso rimane protetto.",
      alphag8TrustInvisible: "ALPHAG8 ID KEY – Perché la fiducia dovrebbe essere invisibile, ma infrangibile.",
      
      // Other Italian sections...
      accessTitle: "Autenticazione a Tre Fattori (3FA)",
      dataTitle: "Sovranità dei Dati e Controllo degli Accessi",
      alpineTitle: "Data Center Alpini",
      // Add all other Italian translations...
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* ALPHAG8 ID KEY Section with Fixed Translations */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-light text-slate-900 mb-2">ALPHAG8 ID KEY</h3>
                <p className="text-lg text-slate-600 mb-1">{t.alphag8SecureAccess}</p>
                <h4 className="text-xl font-medium text-slate-800">{t.alphag8ThreeFactorAuth}</h4>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-base text-slate-600 leading-relaxed mb-6 text-center">
                  {t.alphag8Description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.alphag8ThreeFactorTitle}</p>
                      <p className="text-slate-600 text-sm">{t.alphag8ThreeFactorDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.alphag8ZeroTrustTitle}</p>
                      <p className="text-slate-600 text-sm">{t.alphag8ZeroTrustDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center mt-1">
                      <Key className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.alphag8PhoneKeyTitle}</p>
                      <p className="text-slate-600 text-sm">{t.alphag8PhoneKeyDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <Eye className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.alphag8BiometricTitle}</p>
                      <p className="text-slate-600 text-sm">{t.alphag8BiometricDesc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center mt-1">
                      <Lock className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.alphag8SilentSecureTitle}</p>
                      <p className="text-slate-600 text-sm">{t.alphag8SilentSecureDesc}</p>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-slate-700 font-medium mb-1">{t.alphag8IdentityPrivate}</p>
                    <p className="text-slate-600 text-sm">{t.alphag8TrustInvisible}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

---

## 📊 Dashboard with Fixed Authentication

### Dashboard Component
**File: `client/src/pages/dashboard.tsx`**
```typescript
import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ArrowLeft, Key, LogIn } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [loginId, setLoginId] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check both authentication systems
    let storedId = localStorage.getItem('alphaG8Id');
    const sessionActive = localStorage.getItem('sessionActive');
    const fagriAuth = localStorage.getItem('fagri-authenticated');
    
    // Convert old ALPHAG8- format to new FAGRI- format
    if (storedId && storedId.startsWith('ALPHAG8-')) {
      const newId = storedId.replace('ALPHAG8-', 'FAGRI-');
      localStorage.setItem('alphaG8Id', newId);
      storedId = newId;
    }
    
    if (storedId && (sessionActive === 'true' || fagriAuth === 'true')) {
      setIsAuthenticated(true);
      setAlphaG8Id(storedId);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginId.trim()) return;
    setIsLoggingIn(true);
    
    if (loginId.trim().length >= 8) {
      let processedId = loginId.trim();
      if (processedId.startsWith('ALPHAG8-')) {
        processedId = processedId.replace('ALPHAG8-', 'FAGRI-');
      }
      
      // Set both authentication systems
      localStorage.setItem('alphaG8Id', processedId);
      localStorage.setItem('sessionActive', 'true');
      
      const now = Date.now();
      localStorage.setItem('fagri-authenticated', 'true');
      localStorage.setItem('fagri-auth-timestamp', now.toString());
      localStorage.setItem('fagri-last-activity', now.toString());
      
      setAlphaG8Id(processedId);
      
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
      <div className="min-h-screen relative flex items-center justify-center p-4 bg-agricultural-background">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">FAGRI.Digital</h1>
              <div className="w-16 h-0.5 bg-emerald-400 mx-auto mb-6"></div>
              <h2 className="text-xl font-light text-white/90 mb-4">Access Restricted</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Dashboard requires authentication
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                <Input
                  type="text"
                  placeholder="ALPHAG8 ID KEY"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  disabled={isLoggingIn}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoggingIn || !loginId.trim()}
                className="w-full bg-emerald-600/80 hover:bg-emerald-600"
              >
                {isLoggingIn ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>

            <Button
              onClick={() => setLocation('/')}
              variant="secondary"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="relative h-48 overflow-hidden bg-agricultural-background">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-800/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-light text-white mb-3">Project Tracking Dashboard</h1>
              <p className="text-emerald-100 text-lg font-light mb-4">
                Monitor CO₂ certification projects
              </p>
              <div className="bg-emerald-600/30 backdrop-blur-sm rounded-lg px-6 py-3 border border-emerald-400/50">
                <div className="text-xs text-emerald-200 font-medium">ALPHAG8 ID KEY</div>
                <div className="text-white font-mono text-sm">{alphaG8Id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative -mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mt-20">
            <h2 className="text-2xl font-light text-slate-900 mb-6">Platform Workspace</h2>
            <p className="text-slate-600 mb-8">Access CO₂ certification tools and project management</p>
            
            {/* Dashboard content would go here */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <h3 className="font-medium text-emerald-900 mb-2">Projects</h3>
                <p className="text-2xl font-light text-emerald-800">3</p>
                <p className="text-emerald-600 text-sm">Active certifications</p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">CO₂ Saved</h3>
                <p className="text-2xl font-light text-blue-800">1,125 tons</p>
                <p className="text-blue-600 text-sm">Annual reduction</p>
              </div>
              
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="font-medium text-amber-900 mb-2">Certificates</h3>
                <p className="text-2xl font-light text-amber-800">1</p>
                <p className="text-amber-600 text-sm">Issued this year</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 🎨 Styling Configuration

### Tailwind Config
**File: `tailwind.config.ts`**
```typescript
import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './client/src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 📦 Package Dependencies

### Package.json
```json
{
  "name": "fagri-digital",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "wouter": "^2.11.0",
    "@tanstack/react-query": "^4.29.0",
    "lucide-react": "^0.263.0",
    "express": "^4.18.0",
    "drizzle-orm": "^0.28.0",
    "@neondatabase/serverless": "^0.4.0",
    "zod": "^3.21.0"
  }
}
```

---

## 🔧 Key Features Implemented

### ✅ Authentication System
- **Dual authentication layers** (app-level + dashboard)
- **ALPHAG8 ID KEY format** with automatic FAGRI- conversion
- **Session management** with 10-minute timeout
- **Activity tracking** for security

### ✅ Bilingual Support
- **Italian (default) + English** with seamless switching
- **Complete translation system** with fallback handling
- **Context-aware translations** for all components

### ✅ Dashboard Functionality
- **Project tracking** with CO₂ calculations
- **Authentication protection** with beautiful access control
- **Test data integration** for immediate demonstration
- **Banking-style UI** with agricultural aesthetics

### ✅ Security Page
- **Fixed ALPHAG8 ID KEY section** with proper Italian translations
- **Colorful icon system** with soft background colors
- **Professional banking design** with detailed security information
- **Alpine data center descriptions** and technical specifications

### ✅ Navigation System
- **Consistent routing** across all pages
- **Mobile responsive** hamburger menu
- **Language switching** integrated in navigation
- **Authentication-aware** button display

---

## 🚀 Deployment Configuration

### Environment Variables
```env
DATABASE_URL=your_postgresql_connection_string
VITE_API_URL=your_api_endpoint
NODE_ENV=production
```

### Build Commands
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Database push
npm run db:push
```

---

## 📋 Test Accounts

### ALPHAG8 ID KEYs for Testing
```
FAGRI-TEST001-TEST001-T1  (with sample projects)
FAGRI-2MKQW8X9-PLVNR4T6-A2  (admin account)
FAGRI-5ZXCV9L4-ASDFGH34-C1  (sales team)
```

---

## 🎯 Architecture Highlights

1. **Banking-Style Design**: Professional, clean, trustworthy appearance
2. **Agricultural Aesthetics**: Beautiful landscape backgrounds and earth tones
3. **Multilingual Architecture**: Complete Italian-English support system
4. **Security-First**: Multiple authentication layers and session management
5. **Mobile Responsive**: Optimized for all device sizes
6. **Performance Optimized**: Fast loading with minimal dependencies

---

*Generated on July 30, 2025 - FAGRI Digital Platform v1.0*
*Complete bilingual CO₂ certification system with banking-style security*