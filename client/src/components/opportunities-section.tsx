
import { useLanguage } from './language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Globe, Shield, TrendingUp } from 'lucide-react';

export default function OpportunitiesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-12">
            {t('opportunities-title') || 'Global Opportunities'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle>{t('sustainability') || 'Sustainability'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('sustainability-desc') || 'Environmental responsibility at the core'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>{t('global-reach') || 'Global Reach'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('global-reach-desc') || 'Worldwide network and presence'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>{t('security') || 'Security'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('security-desc') || 'Enterprise-grade security standards'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle>{t('innovation') || 'Innovation'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('innovation-desc') || 'Cutting-edge technology solutions'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
