import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { X, Zap, Sun, Wind, Droplets, TreePine, MapPin, Euro, TrendingUp, Leaf, ArrowRight, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RenewableEnergyRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
}

interface ProjectRecommendation {
  id: string;
  type: 'Solar Photovoltaic' | 'Wind Turbines' | 'Hydroelectric' | 'Biomass Energy' | 'Agrivoltaics' | 'Biogas Production';
  title: string;
  description: string;
  suitabilityScore: number;
  estimatedCapacity: string;
  estimatedCost: string;
  co2ReductionPerYear: string;
  certificationPotential: string;
  paybackPeriod: string;
  icon: any;
  reasons: string[];
  location: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  timeline: string;
}

export function RenewableEnergyRecommendationsModal({ isOpen, onClose, userProfile }: RenewableEnergyRecommendationsModalProps) {
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    if (userProfile) {
      generateRecommendations();
    }
  }, [userProfile]);

  const generateRecommendations = () => {
    // Intelligent recommendation algorithm based on user profile
    const baseRecommendations: ProjectRecommendation[] = [
      {
        id: 'solar-agri',
        type: 'Agrivoltaics',
        title: 'Agricultural Solar Integration',
        description: 'Combine farming with solar energy production using elevated panels that allow crops to grow underneath.',
        suitabilityScore: calculateSuitability('agrivoltaics'),
        estimatedCapacity: '50-500 kW',
        estimatedCost: '€75,000 - €750,000',
        co2ReductionPerYear: '25-250 tons CO₂',
        certificationPotential: '€2,500 - €25,000/year',
        paybackPeriod: '8-12 years',
        icon: Sun,
        reasons: getReasons('agrivoltaics'),
        location: userProfile?.city || 'Italy',
        difficulty: 'Medium',
        timeline: '6-12 months'
      },
      {
        id: 'solar-roof',
        type: 'Solar Photovoltaic',
        title: 'Rooftop Solar Installation',
        description: 'Traditional rooftop solar panels for buildings and agricultural structures.',
        suitabilityScore: calculateSuitability('solar'),
        estimatedCapacity: '10-100 kW',
        estimatedCost: '€15,000 - €150,000',
        co2ReductionPerYear: '8-80 tons CO₂',
        certificationPotential: '€800 - €8,000/year',
        paybackPeriod: '6-10 years',
        icon: Sun,
        reasons: getReasons('solar'),
        location: userProfile?.city || 'Italy',
        difficulty: 'Easy',
        timeline: '2-4 months'
      },
      {
        id: 'biogas-farm',
        type: 'Biogas Production',
        title: 'Agricultural Biogas Plant',
        description: 'Convert agricultural waste and organic materials into renewable energy and reduce methane emissions.',
        suitabilityScore: calculateSuitability('biogas'),
        estimatedCapacity: '100-500 kW',
        estimatedCost: '€200,000 - €1,000,000',
        co2ReductionPerYear: '100-500 tons CO₂',
        certificationPotential: '€10,000 - €50,000/year',
        paybackPeriod: '10-15 years',
        icon: Leaf,
        reasons: getReasons('biogas'),
        location: userProfile?.city || 'Italy',
        difficulty: 'Advanced',
        timeline: '12-24 months'
      },
      {
        id: 'wind-small',
        type: 'Wind Turbines',
        title: 'Small Wind Installation',
        description: 'Small-scale wind turbines suitable for rural and agricultural areas.',
        suitabilityScore: calculateSuitability('wind'),
        estimatedCapacity: '5-50 kW',
        estimatedCost: '€25,000 - €250,000',
        co2ReductionPerYear: '5-50 tons CO₂',
        certificationPotential: '€500 - €5,000/year',
        paybackPeriod: '12-18 years',
        icon: Wind,
        reasons: getReasons('wind'),
        location: userProfile?.city || 'Italy',
        difficulty: 'Medium',
        timeline: '4-8 months'
      },
      {
        id: 'biomass-heating',
        type: 'Biomass Energy',
        title: 'Biomass Heating System',
        description: 'Use agricultural residues and wood waste for heating and energy production.',
        suitabilityScore: calculateSuitability('biomass'),
        estimatedCapacity: '20-200 kW',
        estimatedCost: '€30,000 - €300,000',
        co2ReductionPerYear: '15-150 tons CO₂',
        certificationPotential: '€1,500 - €15,000/year',
        paybackPeriod: '8-14 years',
        icon: TreePine,
        reasons: getReasons('biomass'),
        location: userProfile?.city || 'Italy',
        difficulty: 'Medium',
        timeline: '3-6 months'
      },
      {
        id: 'micro-hydro',
        type: 'Hydroelectric',
        title: 'Micro-Hydroelectric System',
        description: 'Small-scale hydroelectric generation for properties with water sources.',
        suitabilityScore: calculateSuitability('hydro'),
        estimatedCapacity: '5-100 kW',
        estimatedCost: '€50,000 - €500,000',
        co2ReductionPerYear: '20-200 tons CO₂',
        certificationPotential: '€2,000 - €20,000/year',
        paybackPeriod: '10-16 years',
        icon: Droplets,
        reasons: getReasons('hydro'),
        location: userProfile?.city || 'Italy',
        difficulty: 'Advanced',
        timeline: '8-16 months'
      }
    ];

    // Sort by suitability score
    const sortedRecommendations = baseRecommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    setRecommendations(sortedRecommendations);
  };

  const calculateSuitability = (projectType: string): number => {
    let score = 50; // Base score
    
    // Location-based scoring
    const city = userProfile?.city?.toLowerCase() || '';
    const company = userProfile?.company?.toLowerCase() || '';
    
    switch (projectType) {
      case 'agrivoltaics':
        if (company.includes('agri') || company.includes('farm')) score += 30;
        if (city.includes('roma') || city.includes('milano')) score += 10;
        break;
      case 'solar':
        if (city.includes('roma') || city.includes('napoli')) score += 20; // Southern Italy
        score += 15; // Solar is generally good in Italy
        break;
      case 'biogas':
        if (company.includes('farm') || company.includes('agri')) score += 25;
        if (company.includes('carbon')) score += 15;
        break;
      case 'wind':
        if (city.includes('milano') || city.includes('torino')) score += 15; // Northern Italy
        break;
      case 'biomass':
        if (company.includes('farm') || company.includes('eco')) score += 20;
        break;
      case 'hydro':
        if (city.includes('milano') || city.includes('torino')) score += 20; // Near Alps
        break;
    }
    
    // Company type bonus
    if (company.includes('renewable') || company.includes('green')) score += 15;
    if (company.includes('tech') || company.includes('solution')) score += 10;
    
    return Math.min(100, Math.max(0, score));
  };

  const getReasons = (projectType: string): string[] => {
    const baseReasons = [];
    const city = userProfile?.city || 'Italy';
    const company = userProfile?.company || '';
    
    switch (projectType) {
      case 'agrivoltaics':
        baseReasons.push(`Optimal for ${city} climate conditions`);
        if (company.toLowerCase().includes('agri')) {
          baseReasons.push('Perfect match for agricultural business');
        }
        baseReasons.push('Dual land use maximizes revenue');
        baseReasons.push('EU incentives available for agrivoltaics');
        break;
      case 'solar':
        baseReasons.push(`High solar irradiation in ${city}`);
        baseReasons.push('Proven technology with low maintenance');
        baseReasons.push('Italian solar incentive programs');
        break;
      case 'biogas':
        if (company.toLowerCase().includes('farm')) {
          baseReasons.push('Utilize existing agricultural waste');
        }
        baseReasons.push('High CO₂ credit potential');
        baseReasons.push('Circular economy benefits');
        break;
      case 'wind':
        baseReasons.push(`Good wind resources in ${city} region`);
        baseReasons.push('Low environmental impact');
        break;
      case 'biomass':
        baseReasons.push('Abundant agricultural residues in Italy');
        baseReasons.push('Year-round energy production');
        break;
      case 'hydro':
        baseReasons.push(`Water resources available in ${city} area`);
        baseReasons.push('Continuous energy generation');
        break;
    }
    
    return baseReasons;
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return 'Highly Suitable';
    if (score >= 60) return 'Suitable';
    if (score >= 40) return 'Moderately Suitable';
    return 'Low Suitability';
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (filterType === 'all') return true;
    if (filterType === 'high') return rec.suitabilityScore >= 80;
    if (filterType === 'medium') return rec.suitabilityScore >= 60 && rec.suitabilityScore < 80;
    if (filterType === 'low') return rec.suitabilityScore < 60;
    return true;
  });

  const handleStartProject = (project: ProjectRecommendation) => {
    // In real implementation, this would navigate to project registration
    alert(`Starting ${project.title} project registration...`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-white border-2 border-slate-200 overflow-hidden">
        <DialogHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-light text-slate-900">
                  Renewable Energy Recommendations
                </DialogTitle>
                <p className="text-slate-600 text-sm">
                  Personalized project suggestions for {userProfile?.fullName || 'your profile'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!selectedProject ? (
            <>
              {/* Filter Controls */}
              <div className="bg-slate-50 border-b border-slate-200 p-4">
                <div className="flex gap-2">
                  <Button
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                  >
                    All Projects
                  </Button>
                  <Button
                    variant={filterType === 'high' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('high')}
                    className="text-green-700"
                  >
                    Highly Suitable
                  </Button>
                  <Button
                    variant={filterType === 'medium' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('medium')}
                    className="text-blue-700"
                  >
                    Suitable
                  </Button>
                  <Button
                    variant={filterType === 'low' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('low')}
                    className="text-orange-700"
                  >
                    Explore All
                  </Button>
                </div>
              </div>

              {/* Recommendations List */}
              <div className="flex-1 overflow-auto p-6">
                <div className="grid gap-6">
                  {filteredRecommendations.map((project) => (
                    <div key={project.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                            <project.icon className="h-7 w-7 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-slate-900 mb-1">{project.title}</h3>
                            <p className="text-slate-600 text-sm mb-2">{project.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getSuitabilityColor(project.suitabilityScore)} border-0`}>
                                {getSuitabilityLabel(project.suitabilityScore)} ({project.suitabilityScore}%)
                              </Badge>
                              <Badge variant="outline" className="text-slate-600">
                                {project.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => setSelectedProject(project)}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          View Details
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Capacity:</span>
                          <div className="font-medium text-slate-900">{project.estimatedCapacity}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Investment:</span>
                          <div className="font-medium text-slate-900">{project.estimatedCost}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">CO₂ Reduction:</span>
                          <div className="font-medium text-green-600">{project.co2ReductionPerYear}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Timeline:</span>
                          <div className="font-medium text-slate-900">{project.timeline}</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Why This Project Suits You:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.reasons.slice(0, 3).map((reason, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Project Detail View */
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  onClick={() => setSelectedProject(null)}
                  variant="outline"
                  size="sm"
                >
                  ← Back to Recommendations
                </Button>
                <h3 className="text-xl font-light">Project Details</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <selectedProject.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium text-slate-900">{selectedProject.title}</h2>
                      <p className="text-slate-600">{selectedProject.type}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 mb-6">
                    <h4 className="font-medium text-slate-900 mb-3">Project Description</h4>
                    <p className="text-slate-700 mb-4">{selectedProject.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Difficulty:</span>
                        <div className="font-medium">{selectedProject.difficulty}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Timeline:</span>
                        <div className="font-medium">{selectedProject.timeline}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-medium text-green-900 mb-3">Why This Project Is Recommended</h4>
                    <ul className="space-y-2">
                      {selectedProject.reasons.map((reason, index) => (
                        <li key={index} className="flex items-center gap-2 text-green-800">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
                    <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Financial Projections
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Estimated Investment:</span>
                        <span className="font-medium">{selectedProject.estimatedCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Annual CO₂ Credits:</span>
                        <span className="font-medium text-green-600">{selectedProject.certificationPotential}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Payback Period:</span>
                        <span className="font-medium">{selectedProject.paybackPeriod}</span>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="flex justify-between text-lg">
                        <span className="font-medium">Annual CO₂ Reduction:</span>
                        <span className="font-bold text-green-600">{selectedProject.co2ReductionPerYear}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h4 className="font-medium text-blue-900 mb-3">Technical Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Capacity Range:</span>
                        <span className="font-medium">{selectedProject.estimatedCapacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Location:</span>
                        <span className="font-medium">{selectedProject.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Certification Standard:</span>
                        <span className="font-medium">EUFD2025-001</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleStartProject(selectedProject)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Start This Project
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Euro className="h-4 w-4" />
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}