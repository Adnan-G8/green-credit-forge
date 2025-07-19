import { useState } from 'react';
import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Mail, Users, Send } from 'lucide-react';
import { MembershipModal } from './membership-modal';

export function ContactSection() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    privacy: false
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/contact', { ...data, language });
    },
    onSuccess: () => {
      toast({
        title: "Successo",
        description: t('form-success'),
      });
      setFormData({
        name: '',
        surname: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        privacy: false
      });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Errore nell'invio del messaggio. Riprova più tardi.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({
        title: "Errore",
        description: "Devi accettare il trattamento dei dati personali",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-fagri-green mb-6 font-sans animate-slide-up">
              {t('contact-title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              {t('contact-subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-up">
              <Card className="glass-dark border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-fagri-green mb-6">
                    {t('contact-info-title')}
                  </h3>
                  
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg border">
                    <h4 className="font-semibold text-fagri-green mb-3">{t('contact-legal-office')}</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p className="font-medium">Fagri Digital S.r.l.</p>
                      <p>Via Isonzo 38, 00198 Roma (RM) – Italia</p>
                      <p>C.F./P.IVA: 17843431002</p>
                      <p>REA RM-1745329</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-fagri-green rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-fagri-green mb-2">
                          {t('contact-general-title')}
                        </h4>
                        <p className="text-gray-700 font-mono">info@fagri.digital</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {t('contact-general-description')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-fagri-green rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-fagri-green mb-2">
                          {t('contact-membership-title')}
                        </h4>
                        <p className="text-gray-700 font-mono">info@fagri.digital</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {t('contact-membership-info')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="font-semibold text-fagri-green mb-4">{t('contact-membership-action')}</h4>
                    <Button
                      onClick={() => setShowMembershipModal(true)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <Users className="h-5 w-5" />
                      <span>{t('contact-join-filiera')}</span>
                    </Button>
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      {t('contact-membership-description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in">
              <Card className="glass-dark border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-fagri-green mb-6">
                    {t('contact-send-message')}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                          {t('form-name')} *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="surname" className="text-sm font-medium text-gray-700 mb-2">
                          {t('form-surname')} *
                        </Label>
                        <Input
                          id="surname"
                          type="text"
                          required
                          value={formData.surname}
                          onChange={(e) => updateFormData('surname', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                        {t('form-email')} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2">
                        {t('form-company')}
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2">
                        {t('form-subject')} *
                      </Label>
                      <Select required onValueChange={(value) => updateFormData('subject', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('form-subject-select')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t('form-subject-general')}</SelectItem>
                          <SelectItem value="certification">{t('form-subject-cert')}</SelectItem>
                          <SelectItem value="partnership">{t('form-subject-partner')}</SelectItem>
                          <SelectItem value="technical">{t('form-subject-tech')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                        {t('form-message')} *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        placeholder={t('form-message-placeholder')}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        required
                        checked={formData.privacy}
                        onCheckedChange={(checked) => updateFormData('privacy', checked as boolean)}
                      />
                      <Label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed">
{t('form-privacy-start')} <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">{t('form-gdpr')}</a> {t('form-privacy-and')} <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">{t('form-privacy-policy')}</a> {t('form-privacy-end')} *
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-fagri-green text-white hover:bg-fagri-light transition-all duration-300"
                    >
                      {contactMutation.isPending ? 'Invio...' : t('form-submit')}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t('contact-conclusion')}
            </p>
          </div>
        </div>
      </div>
      
      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </section>
  );
}
