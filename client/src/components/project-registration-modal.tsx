import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import { validateAlphaG8Id } from '@shared/alphag8-id-generator';
import { Key, FileText, Leaf, TreePine, Zap, ArrowRight, AlertCircle, CheckCircle, X } from 'lucide-react';

interface ProjectRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectRegistrationModal({ isOpen, onClose }: ProjectRegistrationModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState<'auth' | 'projects'>('auth');
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isValidId, setIsValidId] = useState(false);

  const handleIdSubmit = () => {
    if (validateAlphaG8Id(alphaG8Id)) {
      setIsValidId(true);
      setStep('projects');
      toast({
        title: t('id-verified'),
        description: t('id-verified-desc'),
      });
    } else {
      toast({
        title: t('invalid-id'),
        description: t('invalid-id-desc'),
        variant: 'destructive',
      });
    }
  };

  const projectTypes = [
    {
      id: 'farming',
      icon: Leaf,
      title: t('farming-projects'),
      description: t('farming-projects-desc'),
      color: 'emerald',
      standards: ['ISO 14064-1', 'EUFD2025-001'],
    },
    {
      id: 'forest',
      icon: TreePine,
      title: t('forest-projects'),
      description: t('forest-projects-desc'),
      color: 'green',
      standards: ['ISO 14064-2', 'EUFD2025-001'],
    },
    {
      id: 'renewable',
      icon: Zap,
      title: t('renewable-energy-projects'),
      description: t('renewable-energy-projects-desc'),
      color: 'blue',
      standards: ['ISO 14064-3', 'EUFD2025-001'],
    },
  ];

  const handleProjectSelect = (projectType: string) => {
    toast({
      title: t('project-selected'),
      description: t('project-registration-coming-soon'),
    });
    // This would open the specific project registration form
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-slate-800 flex items-center space-x-3">
              <FileText className="h-6 w-6 text-emerald-700" />
              <span>{t('co2-project-registration')}</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* ALPHAG8 ID Authentication Step */}
          {step === 'auth' && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>{t('alphag8-id-required')}</span>
                </CardTitle>
                <CardDescription className="text-blue-700">
                  {t('alphag8-id-required-desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alphaG8Id" className="text-blue-800 font-medium">
                    {t('enter-alphag8-id')}
                  </Label>
                  <Input
                    id="alphaG8Id"
                    value={alphaG8Id}
                    onChange={(e) => setAlphaG8Id(e.target.value.toUpperCase())}
                    placeholder="ALPHAG8-XXXXXXXX-XXXXXXXX-XX"
                    className="border-blue-200 focus:border-blue-500 font-mono"
                    maxLength={30}
                  />
                  <p className="text-sm text-blue-600 font-light">
                    {t('id-format-example')}
                  </p>
                </div>

                <Button
                  onClick={handleIdSubmit}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                  disabled={!alphaG8Id || alphaG8Id.length < 20}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t('verify-and-continue')}
                </Button>

                {/* Help Section */}
                <div className="bg-slate-100 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-slate-600 mt-0.5" />
                    <div className="text-sm text-slate-600">
                      <p className="font-medium">{t('dont-have-id')}</p>
                      <p className="font-light mt-1">
                        {t('create-id-first-desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Type Selection Step */}
          {step === 'projects' && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-green-800 font-medium">{t('id-authenticated')}</p>
                    <p className="text-green-700 text-sm font-light">
                      {t('select-project-type-below')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {projectTypes.map((project) => {
                  const IconComponent = project.icon;
                  return (
                    <Card 
                      key={project.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-${project.color}-200 hover:border-${project.color}-300`}
                      onClick={() => handleProjectSelect(project.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className={`w-12 h-12 bg-${project.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                          <IconComponent className={`h-6 w-6 text-${project.color}-700`} />
                        </div>
                        <CardTitle className={`text-${project.color}-800 text-lg`}>
                          {project.title}
                        </CardTitle>
                        <CardDescription className={`text-${project.color}-600 font-light`}>
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">
                              {t('applicable-standards')}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.standards.map((standard) => (
                                <Badge 
                                  key={standard}
                                  variant="secondary" 
                                  className={`bg-${project.color}-100 text-${project.color}-800 text-xs`}
                                >
                                  {standard}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button 
                            className={`w-full bg-${project.color}-700 hover:bg-${project.color}-800 text-white`}
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            {t('register-this-project')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {/* Close Button */}
          <div className="pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {t('close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}