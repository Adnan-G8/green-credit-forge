import { Info, Calculator, TrendingUp, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';

interface FormulaDisplayProps {
  projectType: 'carbon-farming' | 'renewable-energy' | 'forestation';
  fieldType: string;
  value?: number;
  showCalculation?: boolean;
  onToggleCalculation?: () => void;
}

export function FormulaDisplay({ 
  projectType, 
  fieldType, 
  value, 
  showCalculation = false,
  onToggleCalculation 
}: FormulaDisplayProps) {
  const { t } = useLanguage();

  const getFormula = () => {
    switch (projectType) {
      case 'carbon-farming':
        return getCarbonFarmingFormula(fieldType);
      case 'renewable-energy':
        return getRenewableEnergyFormula(fieldType);
      case 'forestation':
        return getForestationFormula(fieldType);
      default:
        return null;
    }
  };

  const getCarbonFarmingFormula = (field: string) => {
    switch (field) {
      case 'co2-sequestration':
        return {
          title: 'Sequestro CO₂ Agricolo',
          formula: 'CO₂ = Area × Fattore_Coltura × Metodo_Agricolo × Buffer(15%)',
          description: 'Calcolo basato su superficie, tipo coltura e metodo agricolo secondo ISO 14064-2',
          factors: {
            'herbaceous-crops': 3.2,
            'tree-crops': 8.7,
            'agroforestry': 12.5,
            'pasture-grassland': 2.1
          },
          methods: {
            'conventional': 0.8,
            'organic': 1.2,
            'conservation': 1.4,
            'regenerative': 1.8
          }
        };
      case 'guarantee-fund':
        return {
          title: 'Fondo di Garanzia (15%)',
          formula: 'Fondo = CO₂_Totale × 0.15',
          description: 'Riserva del 15% per garantire la permanenza del sequestro secondo UNI-PdR',
          calculation: value ? (value * 0.15).toFixed(2) : '0'
        };
      default:
        return null;
    }
  };

  const getRenewableEnergyFormula = (field: string) => {
    switch (field) {
      case 'co2-reduction':
        return {
          title: 'Riduzione CO₂ Energia',
          formula: 'CO₂ = Capacità_kW × Ore_Anno × Fattore_Emissione × Efficienza',
          description: 'Calcolo evitate emissioni basato su capacità installata e fattore di emissione della rete',
          factors: {
            'solar-photovoltaic': 1400,
            'solar-thermal': 1200,
            'wind-turbines': 2200,
            'hydroelectric': 4300,
            'biomass-energy': 1800,
            'biogas-production': 1600,
            'geothermal': 6500
          },
          emissionFactor: 0.35 // kg CO₂/kWh rete italiana
        };
      case 'guarantee-fund':
        return {
          title: 'Fondo di Garanzia (15%)',
          formula: 'Fondo = CO₂_Ridotta × 0.15',
          description: 'Riserva per garantire continuità produzione energetica secondo UNI-PdR',
          calculation: value ? (value * 0.15).toFixed(2) : '0'
        };
      default:
        return null;
    }
  };

  const getForestationFormula = (field: string) => {
    switch (field) {
      case 'co2-sequestration':
        return {
          title: 'Sequestro CO₂ Forestale',
          formula: 'CO₂ = Area × Densità × Fattore_Specie × Crescita_Annua × Buffer(15%)',
          description: 'Calcolo basato su superficie, densità impianto e specie arboree secondo ISO 14064-2',
          factors: {
            'oak': 45,
            'beech': 38,
            'pine': 35,
            'spruce': 42,
            'chestnut': 40,
            'poplar': 25,
            'willow': 22,
            'mixed-native': 38
          },
          growthRate: 0.85 // fattore di crescita media annua
        };
      case 'guarantee-fund':
        return {
          title: 'Fondo di Garanzia (15%)',
          formula: 'Fondo = CO₂_Sequestrata × 0.15',
          description: 'Riserva per protezione da incendi, malattie e disturbi forestali secondo UNI-PdR',
          calculation: value ? (value * 0.15).toFixed(2) : '0'
        };
      default:
        return null;
    }
  };

  const formula = getFormula();
  
  if (!formula) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleCalculation}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <Calculator className="h-4 w-4 mr-1" />
          {t('show-formula')}
        </Button>
        <Badge variant="outline" className="text-green-600 border-green-200">
          ISO 14064-2
        </Badge>
      </div>

      {showCalculation && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700 text-sm">
              <TrendingUp className="h-4 w-4" />
              {formula.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <p className="font-mono text-sm text-blue-800">
                {formula.formula}
              </p>
            </div>
            
            <div className="text-xs text-gray-600">
              <Info className="h-3 w-3 inline mr-1" />
              {formula.description}
            </div>

            {formula.factors && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-700">Fattori di Conversione:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(formula.factors).map(([key, factor]) => (
                    <div key={key} className="flex justify-between bg-white p-1 rounded">
                      <span>{key}:</span>
                      <span className="font-mono">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formula.calculation && (
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Risultato: {formula.calculation} t CO₂
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}