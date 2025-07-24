import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';

export function SessionExpiryHandler() {
  const { toast } = useToast();
  const { t } = useLanguage();

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