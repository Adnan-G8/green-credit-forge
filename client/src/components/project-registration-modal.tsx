import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import { validateAlphaG8Id } from '@shared/alphag8-id-generator';
import { 
  X, 
  FileText, 
  Leaf, 
  TreePine, 
  Sun, 
  ArrowRight, 
  ChevronLeft, 
  Upload, 
  MapPin, 
  Calendar,
  CheckCircle,
  User,
  Building,
  Shield
} from 'lucide-react';

interface ProjectRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectRegistrationModal({ isOpen, onClose }: ProjectRegistrationModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState<'auth' | 'type' | 'details'>('auth');
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    area: '',
    description: '',
    startDate: '',
    contactName: '',
    contactEmail: '',
    organization: ''
  });

  const TEST_ID = 'ALPHAG8-1BKQE5C3-K9X2P4M7-15';

  const handleAutoFill = () => {
    setAlphaG8Id(TEST_ID);
  };

  const handleIdSubmit = () => {
    if (validateAlphaG8Id(alphaG8Id)) {
      setStep('type');
      toast({
        title: t('id-verified'),
        description: t('access-granted'),
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
      description: t('agricultural-co2-sequestration'),
      color: 'emerald',
      bgColor: 'from-emerald-500 to-green-600',
      standards: ['ISO 14064-1', 'EUFD2025-001'],
    },
    {
      id: 'forest',
      icon: TreePine,
      title: t('forest-projects'),
      description: t('forest-conservation-reforestation'),
      color: 'amber',
      bgColor: 'from-amber-500 to-orange-600',
      standards: ['ISO 14064-2', 'EUFD2025-001'],
    },
    {
      id: 'renewable',
      icon: Sun,
      title: t('renewable-energy-projects'),
      description: t('solar-wind-hydroelectric-projects'),
      color: 'blue',
      bgColor: 'from-blue-500 to-indigo-600',
      standards: ['ISO 14064-3', 'EUFD2025-001'],
    },
  ];

  const handleProjectSelect = (type: string) => {
    setSelectedProjectType(type);
    setStep('details');
  };

  const handleFormSubmit = () => {
    toast({
      title: t('project-submitted'),
      description: t('project-review-process'),
    });
    onClose();
  };

  const currentProjectType = projectTypes.find(p => p.id === selectedProjectType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">CO₂ Project Registration</DialogTitle>
        <DialogDescription className="sr-only">Register your CO₂ certification project</DialogDescription>
        
        {/* Hero Background Section */}
        <div className="relative h-64 bg-gradient-to-r from-emerald-600 to-green-700 overflow-hidden">
          {/* Agricultural Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Cpath d='M30 15 L30 45 M15 30 L45 30' stroke='%23ffffff' stroke-width='0.5' opacity='0.4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-emerald-200 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative h-full flex items-center justify-center text-center text-white px-8">
            <div>
              <h1 className="text-4xl font-light mb-4">CO₂ Project Registration</h1>
              <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                Register your sustainable agriculture project for official CO₂ certification and carbon credit generation.
              </p>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <div className={`flex items-center space-x-2 ${step === 'auth' ? 'text-white' : 'text-emerald-200'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'auth' ? 'bg-white text-emerald-600' : 'bg-emerald-500'}`}>
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Authentication</span>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-300" />
                <div className={`flex items-center space-x-2 ${step === 'type' ? 'text-white' : 'text-emerald-200'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'type' ? 'bg-white text-emerald-600' : step === 'details' ? 'bg-emerald-500' : 'bg-emerald-600'}`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Project Type</span>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-300" />
                <div className={`flex items-center space-x-2 ${step === 'details' ? 'text-white' : 'text-emerald-200'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-white text-emerald-600' : 'bg-emerald-600'}`}>
                    <Upload className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Project Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 bg-gradient-to-br from-slate-50 to-white overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Step 1: ALPHAG8 ID Authentication */}
          {step === 'auth' && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-blue-200 shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <h3 className="text-xl font-light mb-2 flex items-center space-x-3">
                    <Shield className="h-6 w-6" />
                    <span>ALPHAG8 ID Verification Required</span>
                  </h3>
                  <p className="text-blue-100">Secure access to CO₂ project registration requires valid ALPHAG8 ID authentication.</p>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="alphaG8Id" className="text-slate-700 font-medium">
                      Enter your ALPHAG8 ID KEY
                    </Label>
                    <Input
                      id="alphaG8Id"
                      value={alphaG8Id}
                      onChange={(e) => setAlphaG8Id(e.target.value.toUpperCase())}
                      placeholder="ALPHAG8-XXXXXXXX-XXXXXXXX-XX"
                      className="border-slate-300 focus:border-blue-500 font-mono text-lg p-4"
                      maxLength={30}
                    />
                    <p className="text-sm text-slate-500">
                      Format: ALPHAG8-XXXXXXXX-XXXXXXXX-XX
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleAutoFill}
                      variant="outline"
                      className="flex-1 border-slate-300 hover:bg-slate-50"
                    >
                      Auto-fill Test ID
                    </Button>
                    <Button
                      onClick={handleIdSubmit}
                      disabled={!alphaG8Id.trim()}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Verify & Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Project Type Selection */}
          {step === 'type' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-slate-800 mb-3">Select Your Project Type</h3>
                <p className="text-slate-600">Choose the type of CO₂ certification project you want to register.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card 
                      key={type.id}
                      className="border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                      onClick={() => handleProjectSelect(type.id)}
                    >
                      <div className={`relative h-32 bg-gradient-to-br ${type.bgColor} overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="h-16 w-16 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="text-lg font-medium mb-1">{type.title}</h4>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-slate-600 mb-4 leading-relaxed">{type.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {type.standards.map((standard) => (
                            <Badge key={standard} variant="outline" className="text-xs">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full">
                          Select {type.title}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setStep('auth')}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Authentication</span>
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Project Details Form */}
          {step === 'details' && currentProjectType && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${currentProjectType.bgColor} rounded-xl flex items-center justify-center`}>
                    <currentProjectType.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-800">{currentProjectType.title} Registration</h3>
                </div>
                <p className="text-slate-600">Complete your project details for CO₂ certification application.</p>
              </div>

              <Card className="border-2 border-slate-200 shadow-lg">
                <CardContent className="p-8 space-y-6">
                  {/* Project Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-slate-800 flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Project Information</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          id="projectName"
                          value={formData.projectName}
                          onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                          placeholder="Enter project name"
                          className="border-slate-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="area">Project Area (hectares)</Label>
                        <Input
                          id="area"
                          type="number"
                          value={formData.area}
                          onChange={(e) => setFormData({...formData, area: e.target.value})}
                          placeholder="e.g. 50"
                          className="border-slate-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Project Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Address, City, Province, Italy"
                        className="border-slate-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe your CO₂ certification project goals and methodology"
                        className="border-slate-300 min-h-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Expected Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        className="border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <h4 className="text-lg font-medium text-slate-800 flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Contact Information</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                          placeholder="Full name"
                          className="border-slate-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                          placeholder="email@example.com"
                          className="border-slate-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        placeholder="Company, Cooperative, or Organization name"
                        className="border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Standards Compliance */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h5 className="font-medium text-slate-800 mb-3">Applicable Standards</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentProjectType.standards.map((standard) => (
                        <Badge key={standard} className="bg-emerald-100 text-emerald-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <Button
                      onClick={() => setStep('type')}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Project Type
                    </Button>
                    <Button
                      onClick={handleFormSubmit}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                    >
                      Submit Project Application
                      <Upload className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}