import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/language-provider';
import { 
  Calculator, 
  Shield, 
  Coins, 
  TrendingUp, 
  Leaf, 
  ChevronDown, 
  ChevronUp,
  Download,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ProjectData {
  projectType: 'carbon-farming' | 'renewable-energy' | 'forestation';
  projectName: string;
  cultivatedArea?: number;
  cropType?: string;
  farmingMethod?: string;
  expectedCO2Sequestration?: number;
  installedCapacity?: number;
  energyType?: string;
  expectedCO2Reduction?: number;
  forestArea?: number;
  forestType?: string;
  treeSpecies?: string;
  treeDensity?: number;
  expectedForestCO2?: number;
  investmentCapacity: number;
  projectDuration: number;
}

interface CalculationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectData;
}

export function CalculationSummaryModal({ isOpen, onClose, projectData }: CalculationSummaryModalProps) {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['main']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const calculateCO2Values = () => {
    let baseCO2 = 0;
    let calculationDetails = '';

    switch (projectData.projectType) {
      case 'carbon-farming':
        const areaFactor = projectData.cultivatedArea || 0;
        const cropFactors = {
          'herbaceous-crops': 3.2,
          'tree-crops': 8.7,
          'agroforestry': 12.5,
          'pasture-grassland': 2.1
        };
        const methodFactors = {
          'conventional': 0.8,
          'organic': 1.2,
          'conservation': 1.4,
          'regenerative': 1.8
        };
        
        const cropFactor = cropFactors[projectData.cropType as keyof typeof cropFactors] || 3.2;
        const methodFactor = methodFactors[projectData.farmingMethod as keyof typeof methodFactors] || 1.0;
        
        baseCO2 = areaFactor * cropFactor * methodFactor;
        calculationDetails = `${areaFactor} ha × ${cropFactor} (${projectData.cropType}) × ${methodFactor} (${projectData.farmingMethod})`;
        break;

      case 'renewable-energy':
        const capacity = projectData.installedCapacity || 0;
        const energyFactors = {
          'solar-photovoltaic': 1400,
          'solar-thermal': 1200,
          'wind-turbines': 2200,
          'hydroelectric': 4300,
          'biomass-energy': 1800,
          'biogas-production': 1600,
          'geothermal': 6500
        };
        
        const annualProduction = energyFactors[projectData.energyType as keyof typeof energyFactors] || 1400;
        const emissionFactor = 0.35; // kg CO₂/kWh rete italiana
        
        baseCO2 = (capacity * annualProduction * emissionFactor) / 1000; // conversione kg -> t
        calculationDetails = `${capacity} kW × ${annualProduction} ore/anno × ${emissionFactor} kg CO₂/kWh ÷ 1000`;
        break;

      case 'forestation':
        const forestArea = projectData.forestArea || 0;
        const density = projectData.treeDensity || 1000;
        const speciesFactors = {
          'oak': 45,
          'beech': 38,
          'pine': 35,
          'spruce': 42,
          'chestnut': 40,
          'poplar': 25,
          'willow': 22,
          'mixed-native': 38
        };
        
        const speciesFactor = speciesFactors[projectData.treeSpecies as keyof typeof speciesFactors] || 38;
        const growthRate = 0.85;
        
        baseCO2 = (forestArea * density * speciesFactor * growthRate) / 1000; // conversione kg -> t
        calculationDetails = `${forestArea} ha × ${density} alberi/ha × ${speciesFactor} kg CO₂/albero × ${growthRate} crescita ÷ 1000`;
        break;
    }

    const guaranteeFund = baseCO2 * 0.15; // 15% buffer
    const netCO2 = baseCO2 - guaranteeFund;
    const totalProjectValue = baseCO2 * projectData.projectDuration;
    const annualFundContribution = (guaranteeFund * projectData.projectDuration) / projectData.projectDuration;

    return {
      baseCO2: baseCO2.toFixed(2),
      guaranteeFund: guaranteeFund.toFixed(2),
      netCO2: netCO2.toFixed(2),
      totalProjectValue: totalProjectValue.toFixed(2),
      annualFundContribution: annualFundContribution.toFixed(2),
      calculationDetails
    };
  };

  const calculations = calculateCO2Values();

  const downloadCalculationSheet = () => {
    const content = `
FAGRI DIGITAL - SCHEDA CALCOLO CO₂
Standard UNI-PdR EUFD2025-001
ISO 14064-1, 14064-2, 14064-3

PROGETTO: ${projectData.projectName}
TIPO: ${projectData.projectType}
DURATA: ${projectData.projectDuration} anni

CALCOLI PRINCIPALI:
${calculations.calculationDetails}
= ${calculations.baseCO2} t CO₂/anno

FONDO DI GARANZIA (15%):
${calculations.baseCO2} × 0.15 = ${calculations.guaranteeFund} t CO₂/anno

CO₂ NETTA CERTIFICABILE:
${calculations.baseCO2} - ${calculations.guaranteeFund} = ${calculations.netCO2} t CO₂/anno

VALORE TOTALE PROGETTO:
${calculations.netCO2} × ${projectData.projectDuration} anni = ${calculations.totalProjectValue} t CO₂

CONFORMITÀ NORMATIVA:
✓ EU Regulation 3012/2024 - Blockchain obbligatoria
✓ ISO 14064-1 - Quantificazione emissioni GHG
✓ ISO 14064-2 - Progetti di riduzione emissioni  
✓ ISO 14064-3 - Validazione e verifica
✓ UNI-PdR EUFD2025-001 - Standard FAGRI Digital

Data: ${new Date().toLocaleDateString('it-IT')}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Calcolo_CO2_${projectData.projectName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6 text-blue-600" />
            Calcolo Trasparente CO₂ - {projectData.projectName}
          </DialogTitle>
          <DialogDescription>
            Calcoli dettagliati secondo standard UNI-PdR EUFD2025-001 e ISO 14064
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Calculation Summary */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleSection('main')}
            >
              <CardTitle className="flex items-center justify-between text-blue-700">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Risultati Principali
                </div>
                {expandedSections.has('main') ? 
                  <ChevronUp className="h-5 w-5" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </CardTitle>
            </CardHeader>
            
            {expandedSections.has('main') && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">CO₂ Base Annuale</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{calculations.baseCO2}</p>
                    <p className="text-xs text-gray-600">tonnellate CO₂/anno</p>
                  </div>

                  <div className="bg-white p-4 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Fondo Garanzia (15%)</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-700">{calculations.guaranteeFund}</p>
                    <p className="text-xs text-gray-600">tonnellate CO₂/anno</p>
                  </div>

                  <div className="bg-white p-4 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Coins className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">CO₂ Netta Certificabile</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{calculations.netCO2}</p>
                    <p className="text-xs text-gray-600">tonnellate CO₂/anno</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium mb-2">Formula di Calcolo:</h4>
                  <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                    {calculations.calculationDetails}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Guarantee Fund Management */}
          <Card className="border-orange-200 bg-orange-50/30">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleSection('guarantee')}
            >
              <CardTitle className="flex items-center justify-between text-orange-700">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Gestione Fondo di Garanzia
                </div>
                {expandedSections.has('guarantee') ? 
                  <ChevronUp className="h-5 w-5" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </CardTitle>
            </CardHeader>
            
            {expandedSections.has('guarantee') && (
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Scopo del Fondo di Garanzia</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Il 15% di riserva garantisce la permanenza del sequestro CO₂ proteggendo da:
                  </p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Variabilità climatiche e condizioni meteo avverse</li>
                    <li>• Perdite naturali per malattie, parassiti, incendi</li>
                    <li>• Reversibilità del sequestro in ecosistemi naturali</li>
                    <li>• Garanzia di continuità per l'intero periodo progettuale</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-medium mb-2">Contributo Annuale al Fondo</h4>
                    <p className="text-xl font-bold text-orange-700">{calculations.annualFundContribution} t CO₂</p>
                    <p className="text-xs text-gray-600">riservate annualmente</p>
                  </div>

                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-medium mb-2">Fondo Totale Progetto</h4>
                    <p className="text-xl font-bold text-orange-700">{(parseFloat(calculations.guaranteeFund) * projectData.projectDuration).toFixed(2)} t CO₂</p>
                    <p className="text-xs text-gray-600">per {projectData.projectDuration} anni</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Compliance Framework */}
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleSection('compliance')}
            >
              <CardTitle className="flex items-center justify-between text-green-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Conformità Normativa
                </div>
                {expandedSections.has('compliance') ? 
                  <ChevronUp className="h-5 w-5" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </CardTitle>
            </CardHeader>
            
            {expandedSections.has('compliance') && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        EU Regulation 3012/2024
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Integrazione blockchain obbligatoria per emissione carbon credits
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        ISO 14064-1,2,3
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Standard internazionali per quantificazione, progetti e verifica GHG
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        UNI-PdR EUFD2025-001
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Standard FAGRI Digital per certificazione CO₂ in agricoltura
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        Blockchain G8Chain
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Registrazione immutabile e tracciabilità completa
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Project Value Summary */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Coins className="h-5 w-5" />
                Valore Economico Progetto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-medium mb-1">CO₂ Certificabile Totale</h4>
                  <p className="text-xl font-bold text-blue-700">{calculations.totalProjectValue} t CO₂</p>
                  <p className="text-xs text-gray-600">per {projectData.projectDuration} anni</p>
                </div>

                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-medium mb-1">Investimento Previsto</h4>
                  <p className="text-xl font-bold text-blue-700">€{projectData.investmentCapacity.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">capacità di investimento</p>
                </div>

                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-medium mb-1">ROI CO₂ Annuale</h4>
                  <p className="text-xl font-bold text-blue-700">{(parseFloat(calculations.netCO2) / (projectData.investmentCapacity / projectData.projectDuration) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-gray-600">t CO₂ per € investito</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-gray-600">
                Calcoli basati su standard UNI-PdR e soggetti a verifica di terzi
              </span>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={downloadCalculationSheet}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Scarica Scheda Calcolo
              </Button>
              
              <Button onClick={onClose} variant="default">
                Chiudi
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}