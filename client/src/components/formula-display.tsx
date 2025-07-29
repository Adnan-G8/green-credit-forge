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
          title: 'Algoritmo SOC (Soil Organic Carbon) - UNI-PdR',
          formula: 'ΔSOC = (SOC_project - SOC_baseline) ÷ 20 anni',
          description: 'Metodologia ufficiale UNI-PdR per calcolo variazione carbonio organico nel suolo',
          steps: [
            'SOC_baseline = SOC_ref × FLU_bas × FMG_bas × FI_bas',
            'SOC_project = SOC_ref × FLU_proj × FMG_proj × FI_proj',
            'ΔSOC = (SOC_project - SOC_baseline) ÷ DD (20 anni)',
            'CO₂eq_ha_yr = ΔSOC × 3.67 (conversione C → CO₂)'
          ],
          factors: {
            'SOC_ref': '45 t C/ha (valore di riferimento)',
            'FLU_baseline': '1.0 (uso suolo baseline)',
            'FLU_project': '1.2 (uso suolo progetto)',
            'FMG_baseline': '1.0 (gestione baseline)',
            'FMG_project': '1.15 (gestione migliorata)',
            'FI_baseline': '1.0 (input baseline)',
            'FI_project': '1.1 (input progetto)',
            'DD': '20 anni (periodo default IPCC)'
          },
          calculation: value ? `Esempio: ((45×1.2×1.15×1.1) - (45×1.0×1.0×1.0))÷20 × 3.67 = ${((45 * 1.2 * 1.15 * 1.1 - 45) / 20 * 3.67).toFixed(2)} t CO₂/ha/anno` : '0'
        };
      case 'guarantee-fund':
        return {
          title: 'Fondo di Garanzia UNI-PdR (17%)',
          formula: 'Qfondo = Y × 17%',
          description: 'Riserva obbligatoria del 17% come da algoritmo UNI-PdR per protezione progetti',
          steps: [
            'Y = X × S × (1-2%) (Safety factor del 2%)',
            'Qfondo = Y × 17% (Deposito fondo garanzia)',
            'QP.A. = Y × (1-17%) (CO₂ disponibile progetto)'
          ],
          calculation: value ? `Fondo Garanzia: ${(value * 0.17).toFixed(2)} t CO₂` : '0'
        };
      default:
        return null;
    }
  };

  const getRenewableEnergyFormula = (field: string) => {
    switch (field) {
      case 'co2-reduction':
        return {
          title: 'Algoritmo Energie Rinnovabili - UNI-PdR (Allegato C)',
          formula: 'CO₂_evitata = kW × CF × EF × 8760 ÷ 1000',
          description: 'Metodologia UNI-PdR per calcolo CO₂ ridotta/eliminata da impianti rinnovabili',
          steps: [
            'Produzione_kWh = Capacità_kW × CF × 8760 ore/anno',
            'CO₂_evitata = Produzione_kWh × EF_grid',
            'EF_grid = 0.35 kg CO₂/kWh (fattore emissione rete italiana)',
            'Applicazione Safety Factor 2% e Fondo Garanzia 17%'
          ],
          factors: {
            'Solar PV': 'CF = 0.18 (18% capacity factor Italia)',
            'Solar Thermal': 'CF = 0.20 (20% capacity factor)',
            'Wind Onshore': 'CF = 0.25 (25% capacity factor)',
            'Wind Offshore': 'CF = 0.35 (35% capacity factor)',
            'Hydroelectric': 'CF = 0.45 (45% capacity factor)',
            'Biomass': 'CF = 0.70 (70% capacity factor)',
            'Biogas': 'CF = 0.85 (85% capacity factor)',
            'Geothermal': 'CF = 0.90 (90% capacity factor)',
            'EF_grid': '0.35 kg CO₂/kWh (rete italiana 2024)'
          },
          calculation: value ? `Esempio 100 kW solar: 100×0.18×8760×0.35÷1000 = ${(100 * 0.18 * 8760 * 0.35 / 1000).toFixed(2)} t CO₂/anno` : '0'
        };
      case 'biomass-parameters':
        return {
          title: 'Parametri Biomassa UNI-PdR (Prospetto C.1)',
          formula: 'Biomassa Strutturale vs Agroenergia',
          description: 'Tabella parametri UNI-PdR per destinazione biomassa (Allegato C)',
          steps: [
            'Biomassa Strutturale: 652-7.918 t CO₂/ha cumulata (30 anni)',
            'Biomassa Agroenergia: 639-4.484 t CO₂/ha cumulata (30 anni)',
            'Valori calcolati dall\'Università della Tuscia',
            'Validati secondo ISO 14064-2, 14064-3, 14065'
          ],
          factors: {
            'Anno 1': 'Strutturale: 652 t CO₂/ha - Agroenergia: 639 t CO₂/ha',
            'Anno 5': 'Strutturale: 3.391 t CO₂/ha - Agroenergia: 3.203 t CO₂/ha',
            'Anno 10': 'Strutturale: 5.582 t CO₂/ha - Agroenergia: 4.484 t CO₂/ha',
            'Anno 20': 'Strutturale: 6.597 t CO₂/ha - Agroenergia: 4.484 t CO₂/ha',
            'Anno 30': 'Strutturale: 7.918 t CO₂/ha - Agroenergia: 4.484 t CO₂/ha'
          }
        };
      case 'guarantee-fund':
        return {
          title: 'Fondo di Garanzia UNI-PdR (17%)',
          formula: 'Qfondo = Y × 17%',
          description: 'Riserva obbligatoria per protezione continuità impianto rinnovabile',
          calculation: value ? `Fondo Garanzia: ${(value * 0.17).toFixed(2)} t CO₂` : '0'
        };
      default:
        return null;
    }
  };

  const getForestationFormula = (field: string) => {
    switch (field) {
      case 'co2-sequestration':
        return {
          title: 'Algoritmo Chave 2014 - UNI-PdR (Colture Arboree)',
          formula: 'AGB_kg = 0.0673 × (ρ × D² × H)^0.976',
          description: 'Equazione ufficiale Chave 2014 per calcolo Above Ground Biomass implementata in UNI-PdR',
          steps: [
            'AGB = 0.0673 × (ρ × D² × H)^0.976 (biomassa aerea)',
            'BGB = AGB × RR (biomassa radicale, RR = 0.28)',
            'C_tot = (AGB + BGB) × CF (carbonio totale, CF = 0.47)',
            'CO₂eq_plant = C_tot × 3.67 (conversione C → CO₂)',
            'CO₂eq_ha = CO₂eq_plant × densità_impianto'
          ],
          factors: {
            'ρ (densità legno)': '0.6 t/m³ (valore medio specie temperate)',
            'D (diametro)': '30 cm a 30-40 cm da terra (DBH)',
            'H (altezza)': '15 m (altezza media matura)',
            'RR (root/shoot)': '0.28 (rapporto radici/fusto)',
            'CF (carbon fraction)': '0.47 (frazione carbonio)',
            'Fattore conversione': '3.67 (C → CO₂)'
          },
          calculation: value ? `Esempio albero: 0.0673 × (0.6×30²×15)^0.976 = ${(0.0673 * Math.pow(0.6 * 900 * 15, 0.976) / 1000).toFixed(2)} t AGB/albero` : '0'
        };
      case 'agroforestry':
        return {
          title: 'Algoritmo Agroforestale - UNI-PdR',
          formula: 'MAI → Biomassa → BEF → Root → Carbon → CO₂',
          description: 'Metodologia UNI-PdR per colture agroforestali (boschi e foreste)',
          steps: [
            'MAI = m³ legno·ha⁻¹·anno⁻¹ (Mean Annual Increment)',
            'Biomassa = MAI × WD (densità legno)',
            'Biomassa_tot = Biomassa × BEF (include rami, foglie)',
            'Biomassa_totale = Biomassa_tot × (1 + R) (include radici)',
            'C_tot = Biomassa_totale × CF (contenuto carbonio)',
            'CO₂eq_ha_yr = C_tot × 3.67'
          ],
          factors: {
            'WD (wood density)': '0.6 t d.m.·m⁻³',
            'BEF (Biomass Exp. Factor)': '1.3 (include rami/foglie)',
            'R (root/shoot ratio)': '0.24-0.30',
            'CF (carbon fraction)': '0.47'
          }
        };
      case 'guarantee-fund':
        return {
          title: 'Fondo di Garanzia UNI-PdR (17%)',
          formula: 'Qfondo = Y × 17%',
          description: 'Riserva obbligatoria per protezione da incendi, malattie e disturbi forestali',
          calculation: value ? `Fondo Garanzia: ${(value * 0.17).toFixed(2)} t CO₂` : '0'
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

            {formula.steps && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-blue-700">Algoritmo UNI-PdR (Step-by-Step):</p>
                <div className="space-y-1">
                  {formula.steps.map((step, index) => (
                    <div key={index} className="bg-white p-2 rounded border-l-2 border-blue-300">
                      <span className="text-xs text-blue-800 font-mono">{index + 1}. {step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formula.factors && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-700">Parametri e Fattori UNI-PdR:</p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {Object.entries(formula.factors).map(([key, factor]) => (
                    <div key={key} className="flex justify-between bg-white p-2 rounded border">
                      <span className="font-medium">{key}:</span>
                      <span className="font-mono text-green-700">{factor}</span>
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