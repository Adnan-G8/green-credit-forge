import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';

export function SessionExpiryHandler() {
  const { toast } = useToast();
  
  // Safe language hook usage with fallback
  let t: (key: string) => string;
  try {
    const languageContext = useLanguage();
    t = languageContext.t;
  } catch (error) {
    // Fallback if LanguageProvider is not available
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        'session-expired': 'Session Expired',
        'session-expired-desc': 'Please sign in again to continue.'
      };
      return fallbacks[key] || key;
    };
  }

  useEffect(() => {
    const handleSessionExpired = () => {
      toast({
        title: t('session-expired'),
        description: t('session-expired-desc'),
        variant: "destructive",
        duration: 10000, // Show for 10 seconds
      });
    };

    window.addEventListener('sessionExpired', handleSessionExpired);

    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, [toast, t]);

  return null; // This component doesn't render anything
}