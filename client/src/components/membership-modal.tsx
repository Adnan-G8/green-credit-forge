import { useState } from 'react';
import { useLanguage } from './language-provider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ArrowRight } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    isFromItaly: '',
    region: '',
    country: '',
    activity: '',
    hectares: '',
    interests: [] as string[],
    notes: '',
    newsletter: false,
    privacy: false
  });

  const membershipMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/membership', { 
        ...data, 
        interests: JSON.stringify(data.interests),
        language 
      });
    },
    onSuccess: () => {
      toast({
        title: "Successo",
        description: t('modal-success'),
      });
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        company: '',
        city: '',
        isFromItaly: '',
        region: '',
        country: '',
        activity: '',
        hectares: '',
        interests: [],
        notes: '',
        newsletter: false,
        privacy: false
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Errore nell'invio della richiesta. Riprova più tardi.",
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
    membershipMutation.mutate(formData);
  };

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const italianRegions = [
    'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
    'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana',
    'Trentino-Alto Adige', 'Umbria', "Valle d'Aosta", 'Veneto'
  ];

  const activities = [
    'Produzione Cereali', 'Ortofrutta', 'Vitivinicola', 'Olivicola',
    'Zootecnia', 'Agricoltura Biologica', 'Agriturismo', 'Forestale', 'Altro'
  ];

  const interests = [
    { key: 'co2', label: t('modal-interest-co2') },
    { key: 'network', label: t('modal-interest-network') },
    { key: 'tech', label: t('modal-interest-tech') },
    { key: 'sustainability', label: t('modal-interest-sustainability') }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-fagri-green font-sans">
            {t('modal-title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {t('modal-description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="modal-name" className="text-sm font-medium text-gray-700 mb-2">
                {t('modal-name' as any)} *
              </Label>
              <Input
                id="modal-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="modal-surname" className="text-sm font-medium text-gray-700 mb-2">
                {t('modal-surname' as any)} *
              </Label>
              <Input
                id="modal-surname"
                type="text"
                required
                value={formData.surname}
                onChange={(e) => updateFormData('surname', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="modal-email" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-email' as any)} *
            </Label>
            <Input
              id="modal-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="modal-phone" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-phone')} *
            </Label>
            <Input
              id="modal-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="modal-company" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-company')} *
            </Label>
            <Input
              id="modal-company"
              type="text"
              required
              value={formData.company}
              onChange={(e) => updateFormData('company', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="modal-city" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-city')} *
            </Label>
            <Input
              id="modal-city"
              type="text"
              required
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="modal-italy" className="text-sm font-medium text-gray-700 mb-2">
              Sei dall'Italia? / Are you from Italy? *
            </Label>
            <Select value={formData.isFromItaly} onValueChange={(value) => updateFormData('isFromItaly', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona / Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Sì / Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.isFromItaly === 'yes' && (
            <div>
              <Label htmlFor="modal-region" className="text-sm font-medium text-gray-700 mb-2">
                Regione Italiana *
              </Label>
              <Select required onValueChange={(value) => updateFormData('region', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona la tua regione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abruzzo">Abruzzo</SelectItem>
                  <SelectItem value="basilicata">Basilicata</SelectItem>
                  <SelectItem value="calabria">Calabria</SelectItem>
                  <SelectItem value="campania">Campania</SelectItem>
                  <SelectItem value="emilia-romagna">Emilia-Romagna</SelectItem>
                  <SelectItem value="friuli-venezia-giulia">Friuli-Venezia Giulia</SelectItem>
                  <SelectItem value="lazio">Lazio</SelectItem>
                  <SelectItem value="liguria">Liguria</SelectItem>
                  <SelectItem value="lombardia">Lombardia</SelectItem>
                  <SelectItem value="marche">Marche</SelectItem>
                  <SelectItem value="molise">Molise</SelectItem>
                  <SelectItem value="piemonte">Piemonte</SelectItem>
                  <SelectItem value="puglia">Puglia</SelectItem>
                  <SelectItem value="sardegna">Sardegna</SelectItem>
                  <SelectItem value="sicilia">Sicilia</SelectItem>
                  <SelectItem value="toscana">Toscana</SelectItem>
                  <SelectItem value="trentino-alto-adige">Trentino-Alto Adige</SelectItem>
                  <SelectItem value="umbria">Umbria</SelectItem>
                  <SelectItem value="valle-d-aosta">Valle d'Aosta</SelectItem>
                  <SelectItem value="veneto">Veneto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.isFromItaly === 'no' && (
            <div>
              <Label htmlFor="modal-country" className="text-sm font-medium text-gray-700 mb-2">
                Paese / Country *
              </Label>
              <Input
                id="modal-country"
                type="text"
                required
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                placeholder="Inserisci il tuo paese / Enter your country"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="modal-activity" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-activity')} *
            </Label>
            <Select required onValueChange={(value) => updateFormData('activity', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('modal-activity-select')} />
              </SelectTrigger>
              <SelectContent>
                {activities.map(activity => (
                  <SelectItem key={activity} value={activity.toLowerCase().replace(/\s+/g, '-')}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="modal-hectares" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-hectares')}
            </Label>
            <Input
              id="modal-hectares"
              type="number"
              min="0"
              step="0.1"
              value={formData.hectares}
              onChange={(e) => updateFormData('hectares', e.target.value)}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-interests')}
            </Label>
            <div className="space-y-2">
              {interests.map(interest => (
                <div key={interest.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest.key}`}
                    checked={formData.interests.includes(interest.key)}
                    onCheckedChange={() => toggleInterest(interest.key)}
                  />
                  <Label htmlFor={`interest-${interest.key}`} className="text-sm text-gray-700">
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="modal-notes" className="text-sm font-medium text-gray-700 mb-2">
              {t('modal-notes')}
            </Label>
            <Textarea
              id="modal-notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              placeholder={t('modal-notes-placeholder')}
            />
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="modal-privacy"
              required
              checked={formData.privacy}
              onCheckedChange={(checked) => updateFormData('privacy', checked as boolean)}
            />
            <Label htmlFor="modal-privacy" className="text-sm text-gray-700">
              {t('modal-privacy' as any)} *
            </Label>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="modal-newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => updateFormData('newsletter', checked as boolean)}
            />
            <Label htmlFor="modal-newsletter" className="text-sm text-gray-700">
              {t('modal-newsletter')}
            </Label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t('modal-cancel')}
            </Button>
            <Button
              type="submit"
              disabled={membershipMutation.isPending}
              className="flex-1 bg-fagri-green text-white hover:bg-fagri-light"
            >
              {membershipMutation.isPending ? 'Invio...' : t('modal-submit')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
