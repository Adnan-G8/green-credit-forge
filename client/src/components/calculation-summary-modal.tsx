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
    let algorithm = '';

    switch (projectData.projectType) {
      case 'carbon-farming':
        // Algoritmo SOC UNI-PdR
        const area = projectData.cultivatedArea || 0;
        const SOC_ref = 45; // t C/ha
        const FLU_baseline = 1.0;
        const FLU_project = 1.2;
        const FMG_baseline = 1.0;
        const FMG_project = 1.15;
        const FI_baseline = 1.0;
        const FI_project = 1.1;
        const DD = 20; // anni (default IPCC)
        
        const SOC_baseline = SOC_ref * FLU_baseline * FMG_baseline * FI_baseline;
        const SOC_project = SOC_ref * FLU_project * FMG_project * FI_project;
        const deltaSOC = (SOC_project - SOC_baseline) / DD;
        const CO2_per_ha_yr = deltaSOC * 3.67; // conversione C → CO₂
        
        baseCO2 = area * CO2_per_ha_yr;
        algorithm = 'Algoritmo SOC UNI-PdR';
        calculationDetails = `SOC_baseline: ${SOC_ref}×${FLU_baseline}×${FMG_baseline}×${FI_baseline} = ${SOC_baseline.toFixed(2)} t C/ha
SOC_project: ${SOC_ref}×${FLU_project}×${FMG_project}×${FI_project} = ${SOC_project.toFixed(2)} t C/ha
ΔSOC: (${SOC_project.toFixed(2)}-${SOC_baseline.toFixed(2)})÷${DD} = ${deltaSOC.toFixed(3)} t C/ha/anno
CO₂eq: ${deltaSOC.toFixed(3)}×3.67 = ${CO2_per_ha_yr.toFixed(3)} t CO₂/ha/anno
Totale: ${area} ha × ${CO2_per_ha_yr.toFixed(3)} = ${baseCO2.toFixed(2)} t CO₂/anno`;
        break;

      case 'renewable-energy':
        // Algoritmo Energie Rinnovabili UNI-PdR
        const capacity = projectData.installedCapacity || 0;
        const capacityFactors = {
          'solar-photovoltaic': 0.18,
          'solar-thermal': 0.20,
          'wind-turbines': 0.25,
          'hydroelectric': 0.45,
          'biomass-energy': 0.70,
          'biogas-production': 0.85,
          'geothermal': 0.90
        };
        
        const CF = capacityFactors[projectData.energyType as keyof typeof capacityFactors] || 0.18;
        const EF_grid = 0.35; // kg CO₂/kWh rete italiana
        const hoursPerYear = 8760;
        
        const production_kWh = capacity * CF * hoursPerYear;
        baseCO2 = (production_kWh * EF_grid) / 1000; // kg → t
        
        algorithm = 'Algoritmo Rinnovabili UNI-PdR (Allegato C)';
        calculationDetails = `Capacità: ${capacity} kW
Capacity Factor: ${CF} (${(CF*100).toFixed(0)}%)
Produzione: ${capacity}×${CF}×${hoursPerYear} = ${production_kWh.toFixed(0)} kWh/anno
CO₂ evitata: ${production_kWh.toFixed(0)}×${EF_grid}÷1000 = ${baseCO2.toFixed(2)} t CO₂/anno`;
        break;

      case 'forestation':
        // Algoritmo Chave 2014 UNI-PdR
        const forestArea = projectData.forestArea || 0;
        const density = projectData.treeDensity || 1000; // alberi/ha
        const wood_density = 0.6; // t/m³
        const diameter = 0.30; // 30 cm DBH
        const height = 15; // 15 m
        const root_shoot_ratio = 0.28;
        const carbon_fraction = 0.47;
        
        // Equazione Chave 2014
        const AGB_kg_per_tree = 0.0673 * Math.pow(wood_density * diameter * diameter * height * 10000, 0.976);
        const AGB_t_per_tree = AGB_kg_per_tree / 1000;
        const BGB_t_per_tree = AGB_t_per_tree * root_shoot_ratio;
        const biomass_total_per_tree = AGB_t_per_tree + BGB_t_per_tree;
        const carbon_per_tree = biomass_total_per_tree * carbon_fraction;
        const CO2_per_tree = carbon_per_tree * 3.67;
        const CO2_per_ha = CO2_per_tree * density;
        
        baseCO2 = forestArea * CO2_per_ha;
        algorithm = 'Algoritmo Chave 2014 UNI-PdR';
        calculationDetails = `Parametri albero: ρ=${wood_density} t/m³, D=${diameter}m, H=${height}m
AGB: 0.0673×(${wood_density}×${diameter}²×${height}×10000)^0.976 = ${AGB_kg_per_tree.toFixed(0)} kg/albero
BGB: ${AGB_t_per_tree.toFixed(3)}×${root_shoot_ratio} = ${BGB_t_per_tree.toFixed(3)} t/albero
Biomassa totale: ${biomass_total_per_tree.toFixed(3)} t/albero
Carbonio: ${biomass_total_per_tree.toFixed(3)}×${carbon_fraction} = ${carbon_per_tree.toFixed(3)} t C/albero
CO₂: ${carbon_per_tree.toFixed(3)}×3.67 = ${CO2_per_tree.toFixed(3)} t CO₂/albero
Per ettaro: ${CO2_per_tree.toFixed(3)}×${density} = ${CO2_per_ha.toFixed(2)} t CO₂/ha/anno
Totale: ${forestArea} ha × ${CO2_per_ha.toFixed(2)} = ${baseCO2.toFixed(2)} t CO₂/anno`;
        break;
    }

    // Applicazione algoritmo UNI-PdR per Fondo Garanzia
    const safetyFactor = 0.02; // 2% UNI-PdR
    const Y = baseCO2 * (1 - safetyFactor);
    const guaranteeFund = Y * 0.05; // 5% EUFD2025-001 Standard Buffer
    const netCO2 = Y * (1 - 0.05); // QP.A. = Y × (1-5%)
    const totalProjectValue = netCO2 * projectData.projectDuration;

    return {
      baseCO2: baseCO2.toFixed(2),
      Y: Y.toFixed(2),
      guaranteeFund: guaranteeFund.toFixed(2),
      netCO2: netCO2.toFixed(2),
      totalProjectValue: totalProjectValue.toFixed(2),
      calculationDetails,
      algorithm
    };
  };

  const calculations = calculateCO2Values();

  const downloadCalculationSheet = () => {
    const content = `
═══════════════════════════════════════════════════════════════
FAGRI DIGITAL - SCHEDA CALCOLO CO₂ CERTIFICATA
Standard UNI-PdR EUFD2025-001 | ISO 14064-1, 14064-2, 14064-3
═══════════════════════════════════════════════════════════════

DATI PROGETTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nome Progetto: ${projectData.projectName}
• Tipo Progetto: ${projectData.projectType}
• Durata: ${projectData.projectDuration} anni
• Investimento: €${projectData.investmentCapacity.toLocaleString()}

ALGORITMO UTILIZZATO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${calculations.algorithm}

CALCOLO DETTAGLIATO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${calculations.calculationDetails}

RISULTATO BASE: ${calculations.baseCO2} t CO₂/anno

APPLICAZIONE FATTORI UNI-PdR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Safety Factor (2%): ${calculations.baseCO2} × (1-2%) = ${calculations.Y} t CO₂/anno
2. Fondo Garanzia (5%): ${calculations.Y} × 5% = ${calculations.guaranteeFund} t CO₂/anno
3. CO₂ Disponibile Progetto: ${calculations.Y} × (1-5%) = ${calculations.netCO2} t CO₂/anno

VALORE TOTALE PROGETTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CO₂ Certificabile: ${calculations.netCO2} × ${projectData.projectDuration} anni = ${calculations.totalProjectValue} t CO₂

CONFORMITÀ NORMATIVA E ALGORITMICA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ EU Regulation 3012/2024 - Blockchain Technology Mandated
✓ ISO 14064-1 - GHG Quantification and Reporting
✓ ISO 14064-2 - Project-level GHG Emission Reductions  
✓ ISO 14064-3 - Validation and Verification Standards
✓ UNI-PdR EUFD2025-001 - FAGRI Digital Official Standard
✓ University of Tuscia Validation - Third-party Certification
${projectData.projectType === 'forestation' ? '✓ Chave 2014 Equation - Above Ground Biomass Algorithm' : ''}
${projectData.projectType === 'carbon-farming' ? '✓ IPCC SOC Methodology - Soil Organic Carbon Changes' : ''}
${projectData.projectType === 'renewable-energy' ? '✓ Renewable Energy CO₂ Avoidance Methodology' : ''}

PARAMETRI TECNICI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Safety Factor applicato: 2% (come da UNI-PdR)
• Percentuale Fondo Garanzia: 5% (obbligatoria EUFD2025-001 Standard)
• Periodo di riferimento IPCC: 20 anni (default)
• Fattore conversione C→CO₂: 3.67

Documento generato automaticamente dal sistema FAGRI DIGITAL
Conforme agli standard internazionali e certificato UNI-PdR
═══════════════════════════════════════════════════════════════

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
                      <span className="text-sm font-medium">Fondo Garanzia EUFD2025-001 (5%)</span>
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
                  <h4 className="font-medium mb-2 text-blue-700">{calculations.algorithm}</h4>
                  <div className="bg-blue-50 p-3 rounded border">
                    <pre className="text-xs text-blue-800 whitespace-pre-wrap font-mono leading-relaxed">
                      {calculations.calculationDetails}
                    </pre>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium mb-2 text-purple-700">Applicazione Fattori UNI-PdR:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span>1. CO₂ Base (risultato algoritmo):</span>
                      <span className="font-mono font-bold">{calculations.baseCO2} t CO₂/anno</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span>2. Safety Factor (2% riduzione):</span>
                      <span className="font-mono font-bold">{calculations.Y} t CO₂/anno</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span>3. Fondo Garanzia (5% deposito):</span>
                      <span className="font-mono font-bold">{calculations.guaranteeFund} t CO₂/anno</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded border-2 border-green-200">
                      <span className="font-medium">4. CO₂ Disponibile Progetto (QP.A.):</span>
                      <span className="font-mono font-bold text-green-700">{calculations.netCO2} t CO₂/anno</span>
                    </div>
                  </div>
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
                    Il 5% di riserva EUFD2025-001 garantisce la permanenza del sequestro CO₂ proteggendo da:
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