import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import { 
  X, 
  Sun, 
  Wind, 
  Zap,
  TreePine,
  MapPin,
  TrendingUp,
  DollarSign,
  Leaf,
  CheckCircle,
  ArrowRight,
  Calculator,
  Target,
  Lightbulb
} from 'lucide-react';
import forestImagePath from '@assets/image_1753387571371.png';

interface ProjectRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserPreferences {
  location: string;
  landArea: string;
  budget: string;
  energyGoal: string;
  priority: string;
  timeline: string;
}

interface ProjectRecommendation {
  id: string;
  technology: string;
  icon: React.ElementType;
  title: string;
  description: string;
  estimatedCapacity: string;
  annualProduction: string;
  co2Reduction: string;
  investmentRange: string;
  roiPeriod: string;
  suitabilityScore: number;
  advantages: string[];
  considerations: string[];
  nextSteps: string[];
}

export function ProjectRecommendationsModal({ isOpen, onClose }: ProjectRecommendationsModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState<'preferences' | 'recommendations'>('preferences');
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    location: '',
    landArea: '',
    budget: '',
    energyGoal: '',
    priority: '',
    timeline: ''
  });

  // Generate personalized recommendations based on user preferences
  const generateRecommendations = (): ProjectRecommendation[] => {
    const recommendations: ProjectRecommendation[] = [];
    
    // Solar PV recommendation logic
    if (preferences.landArea && parseInt(preferences.landArea) >= 1) {
      const landAreaNum = parseInt(preferences.landArea);
      const estimatedCapacity = Math.round(landAreaNum * 0.5 * 100) / 100; // ~0.5 MW per hectare
      const annualProduction = Math.round(estimatedCapacity * 1200); // ~1200 MWh per MW annually in Italy
      
      recommendations.push({
        id: 'solar_pv',
        technology: 'Solar Photovoltaic',
        icon: Sun,
        title: 'Solar PV Farm',
        description: 'Ground-mounted solar photovoltaic system optimized for your land area and location.',
        estimatedCapacity: `${estimatedCapacity} MW`,
        annualProduction: `${annualProduction.toLocaleString()} MWh`,
        co2Reduction: `${Math.round(annualProduction * 0.4)} tonnes CO₂/year`,
        investmentRange: `€${Math.round(estimatedCapacity * 800000).toLocaleString()} - €${Math.round(estimatedCapacity * 1200000).toLocaleString()}`,
        roiPeriod: '8-12 years',
        suitabilityScore: preferences.priority === 'cost_effective' ? 95 : 90,
        advantages: [
          'Proven technology with reliable returns',
          'Low maintenance requirements',
          'Scalable to available land area',
          'Excellent solar irradiation in Italy'
        ],
        considerations: [
          'Initial capital investment required',
          'Grid connection permits needed',
          'Weather dependency for production'
        ],
        nextSteps: [
          'Site solar irradiation assessment',
          'Grid connection feasibility study',
          'Environmental impact evaluation',
          'Financing and permit applications'
        ]
      });
    }

    // Wind energy recommendation
    if (preferences.landArea && parseInt(preferences.landArea) >= 5) {
      const landAreaNum = parseInt(preferences.landArea);
      const turbineCapacity = 2.5; // 2.5 MW turbines
      const numTurbines = Math.floor(landAreaNum / 10); // 1 turbine per 10 hectares
      const totalCapacity = numTurbines * turbineCapacity;
      const annualProduction = Math.round(totalCapacity * 2200); // ~2200 MWh per MW for wind

      if (numTurbines >= 1) {
        recommendations.push({
          id: 'wind_onshore',
          technology: 'Wind Energy',
          icon: Wind,
          title: 'Onshore Wind Farm',
          description: 'Modern wind turbines designed for optimal energy capture in your regional wind conditions.',
          estimatedCapacity: `${totalCapacity} MW (${numTurbines} turbines)`,
          annualProduction: `${annualProduction.toLocaleString()} MWh`,
          co2Reduction: `${Math.round(annualProduction * 0.45)} tonnes CO₂/year`,
          investmentRange: `€${Math.round(totalCapacity * 1200000).toLocaleString()} - €${Math.round(totalCapacity * 1800000).toLocaleString()}`,
          roiPeriod: '10-15 years',
          suitabilityScore: preferences.priority === 'environmental' ? 95 : 85,
          advantages: [
            'High energy output per land area',
            'Compatible with agricultural use',
            'Long-term stable production',
            'Advanced turbine technology'
          ],
          considerations: [
            'Wind resource assessment required',
            'Higher initial investment',
            'Local community acceptance',
            'Visual and noise considerations'
          ],
          nextSteps: [
            'Comprehensive wind measurement campaign',
            'Turbine placement optimization study',
            'Environmental and noise impact assessment',
            'Community engagement and permits'
          ]
        });
      }
    }

    // Agrivoltaics recommendation
    if (preferences.landArea && parseInt(preferences.landArea) >= 2 && preferences.priority === 'dual_use') {
      const landAreaNum = parseInt(preferences.landArea);
      const estimatedCapacity = Math.round(landAreaNum * 0.3 * 100) / 100; // Reduced density for agrivoltaics
      const annualProduction = Math.round(estimatedCapacity * 1100);
      
      recommendations.push({
        id: 'agrivoltaics',
        technology: 'Agrivoltaics',
        icon: Leaf,
        title: 'Solar + Agriculture System',
        description: 'Innovative dual-use system combining solar energy generation with continued agricultural production.',
        estimatedCapacity: `${estimatedCapacity} MW`,
        annualProduction: `${annualProduction.toLocaleString()} MWh`,
        co2Reduction: `${Math.round(annualProduction * 0.4)} tonnes CO₂/year`,
        investmentRange: `€${Math.round(estimatedCapacity * 1000000).toLocaleString()} - €${Math.round(estimatedCapacity * 1500000).toLocaleString()}`,
        roiPeriod: '10-14 years',
        suitabilityScore: 92,
        advantages: [
          'Dual revenue streams (energy + agriculture)',
          'Crop protection from weather extremes',
          'Reduced water evaporation',
          'Innovative EU-supported technology'
        ],
        considerations: [
          'Specialized mounting systems required',
          'Crop selection and management adjustments',
          'Higher complexity than traditional solar',
          'Still emerging technology'
        ],
        nextSteps: [
          'Agricultural compatibility assessment',
          'Agrivoltaic system design optimization',
          'Crop yield impact studies',
          'Specialized financing evaluation'
        ]
      });
    }

    // Sort by suitability score
    return recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  };

  const handleGenerateRecommendations = () => {
    if (!preferences.location || !preferences.landArea || !preferences.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in location, land area, and priority to generate recommendations.",
        variant: "destructive",
      });
      return;
    }
    setStep('recommendations');
  };

  const recommendations = step === 'recommendations' ? generateRecommendations() : [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden relative">
        <DialogTitle className="sr-only">Personalized Renewable Energy Project Recommendations</DialogTitle>
        <DialogDescription className="sr-only">Get personalized recommendations for renewable energy projects</DialogDescription>
        
        {/* Hero Background Section - From Field to Future Style */}
        <div className="relative h-96 overflow-hidden">
          {/* Beautiful Agricultural Landscape Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${forestImagePath})`,
              filter: 'brightness(1.0) contrast(1.1) saturate(1.1)'
            }}
          />
          
          {/* Dark navy overlay like in the hero design */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/80" />
          
          {/* Top trust indicators bar */}
          <div className="absolute top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>ISO 14064-1, 14064-2, 14064-3</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Swiss Privacy Level</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Immutable Blockchain</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-16 right-6 text-white hover:text-white/80 transition-colors z-20 drop-shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative h-full flex items-center justify-center text-center text-white px-8 z-10 pt-16">
            {/* Frosted glass container like in the image */}
            <div className="backdrop-blur-md bg-slate-800/30 rounded-3xl p-12 border border-white/20 shadow-2xl max-w-4xl">
              <h1 className="text-6xl font-light mb-4 drop-shadow-2xl text-white tracking-wide">
                From Data to Decision
              </h1>
              <p className="text-white/90 text-2xl max-w-3xl mx-auto drop-shadow-lg font-light leading-relaxed">
                Personalized renewable energy project intelligence for sustainable Italian agriculture
              </p>
            </div>
          </div>
        </div>

        {/* Content Area - Clean white background like in your image */}
        <div className="bg-white overflow-y-auto max-h-[calc(90vh-24rem)]">
          <div className="p-8">

            {/* Step 1: User Preferences */}
            {step === 'preferences' && (
              <div className="max-w-4xl mx-auto">
                {/* Clean section title like in your image */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-light text-slate-800 mb-4">An Initiative for Real Change</h2>
                  <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                    FAGRI.Digital is not a commercial platform, but a solid infrastructure designed to build a 
                    sustainable future through personalized renewable energy intelligence.
                  </p>
                </div>
                
                <Card className="border border-slate-200 shadow-lg bg-white">
                  <div className="bg-slate-50 border-b border-slate-200 p-6">
                    <div className="flex items-center space-x-3">
                      <Calculator className="h-6 w-6 text-slate-600" />
                      <h3 className="text-xl font-medium text-slate-800">Project Requirements Assessment</h3>
                    </div>
                    <p className="text-slate-600 mt-2">Help us understand your agricultural land and energy goals to provide tailored recommendations.</p>
                  </div>
                  
                  <CardContent className="p-8 space-y-6">
                    {/* Location and Land */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-slate-700 font-medium flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-emerald-600" />
                          <span>Project Location</span>
                        </Label>
                        <Input
                          id="location"
                          value={preferences.location}
                          onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                          placeholder="City, Province, Italy"
                          className="border-slate-300 focus:border-emerald-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="landArea" className="text-slate-700 font-medium">
                          Available Land Area (hectares)
                        </Label>
                        <Input
                          id="landArea"
                          type="number"
                          value={preferences.landArea}
                          onChange={(e) => setPreferences({...preferences, landArea: e.target.value})}
                          placeholder="e.g. 10"
                          className="border-slate-300 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Budget and Energy Goal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-slate-700 font-medium flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          <span>Investment Budget Range</span>
                        </Label>
                        <Select value={preferences.budget} onValueChange={(value) => setPreferences({...preferences, budget: value})}>
                          <SelectTrigger className="border-slate-300 focus:border-emerald-500">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">€100,000 - €500,000</SelectItem>
                            <SelectItem value="medium">€500,000 - €2,000,000</SelectItem>
                            <SelectItem value="large">€2,000,000 - €10,000,000</SelectItem>
                            <SelectItem value="enterprise">€10,000,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="energyGoal" className="text-slate-700 font-medium flex items-center space-x-2">
                          <Target className="h-4 w-4 text-emerald-600" />
                          <span>Energy Production Goal</span>
                        </Label>
                        <Select value={preferences.energyGoal} onValueChange={(value) => setPreferences({...preferences, energyGoal: value})}>
                          <SelectTrigger className="border-slate-300 focus:border-emerald-500">
                            <SelectValue placeholder="Select energy goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self_consumption">Self-consumption + small surplus</SelectItem>
                            <SelectItem value="commercial_small">Small commercial production</SelectItem>
                            <SelectItem value="commercial_large">Large commercial production</SelectItem>
                            <SelectItem value="grid_scale">Grid-scale energy production</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Priority and Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-slate-700 font-medium">
                          Project Priority
                        </Label>
                        <Select value={preferences.priority} onValueChange={(value) => setPreferences({...preferences, priority: value})}>
                          <SelectTrigger className="border-slate-300 focus:border-emerald-500">
                            <SelectValue placeholder="What's most important?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cost_effective">Cost-effectiveness & ROI</SelectItem>
                            <SelectItem value="environmental">Maximum environmental impact</SelectItem>
                            <SelectItem value="dual_use">Dual land use (energy + agriculture)</SelectItem>
                            <SelectItem value="innovative">Innovative technology</SelectItem>
                            <SelectItem value="reliable">Proven reliable technology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-slate-700 font-medium">
                          Implementation Timeline
                        </Label>
                        <Select value={preferences.timeline} onValueChange={(value) => setPreferences({...preferences, timeline: value})}>
                          <SelectTrigger className="border-slate-300 focus:border-emerald-500">
                            <SelectValue placeholder="When to start?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Within 6 months</SelectItem>
                            <SelectItem value="short">6-12 months</SelectItem>
                            <SelectItem value="medium">1-2 years</SelectItem>
                            <SelectItem value="long">2+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-center pt-8">
                      <Button
                        onClick={handleGenerateRecommendations}
                        className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 text-base font-medium rounded-lg shadow-lg"
                      >
                        <Lightbulb className="h-5 w-5 mr-2" />
                        Generate Personalized Recommendations
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Recommendations Display */}
            {step === 'recommendations' && (
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-light text-slate-800 mb-4">
                    Your Personalized Recommendations
                  </h3>
                  <p className="text-slate-600 text-lg">
                    Based on {preferences.landArea} hectares in {preferences.location}
                  </p>
                </div>

                <div className="space-y-6">
                  {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <Card key={rec.id} className="border-2 border-emerald-200 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
                        <div className="flex">
                          {/* Left side - Overview */}
                          <div className="flex-1 p-8">
                            <div className="flex items-start space-x-4 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Icon className="h-8 w-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-2xl font-medium text-slate-800">{rec.title}</h4>
                                  <Badge className="bg-emerald-100 text-emerald-800 px-3 py-1">
                                    {rec.suitabilityScore}% Match
                                  </Badge>
                                </div>
                                <p className="text-slate-600 text-lg">{rec.description}</p>
                              </div>
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                <Zap className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">Capacity</div>
                                <div className="font-semibold text-slate-800">{rec.estimatedCapacity}</div>
                              </div>
                              <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">Annual Production</div>
                                <div className="font-semibold text-slate-800">{rec.annualProduction}</div>
                              </div>
                              <div className="text-center p-4 bg-green-50 rounded-xl">
                                <Leaf className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">CO₂ Reduction</div>
                                <div className="font-semibold text-slate-800">{rec.co2Reduction}</div>
                              </div>
                              <div className="text-center p-4 bg-amber-50 rounded-xl">
                                <DollarSign className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">ROI Period</div>
                                <div className="font-semibold text-slate-800">{rec.roiPeriod}</div>
                              </div>
                            </div>

                            <div className="text-lg font-medium text-slate-700 mb-2">
                              Investment Range: <span className="text-emerald-600">{rec.investmentRange}</span>
                            </div>
                          </div>

                          {/* Right side - Details */}
                          <div className="w-80 bg-slate-50 p-6 space-y-6">
                            <div>
                              <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                Key Advantages
                              </h5>
                              <ul className="space-y-2">
                                {rec.advantages.map((advantage, i) => (
                                  <li key={i} className="text-sm text-slate-600 flex items-start">
                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {advantage}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-semibold text-slate-800 mb-3">Considerations</h5>
                              <ul className="space-y-2">
                                {rec.considerations.map((consideration, i) => (
                                  <li key={i} className="text-sm text-slate-600 flex items-start">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 mt-2 flex-shrink-0" />
                                    {consideration}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-semibold text-slate-800 mb-3">Next Steps</h5>
                              <ul className="space-y-2">
                                {rec.nextSteps.map((step, i) => (
                                  <li key={i} className="text-sm text-slate-600 flex items-start">
                                    <ArrowRight className="h-3 w-3 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex justify-center space-x-4 pt-8">
                  <Button
                    onClick={() => setStep('preferences')}
                    variant="outline"
                    className="px-8 py-3 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Modify Preferences
                  </Button>
                  <Button
                    onClick={onClose}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3"
                  >
                    Start Project Registration
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}