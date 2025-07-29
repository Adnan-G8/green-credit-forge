import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { DocumentDisplay } from '@/components/document-display';
import {
  FileText,
  Calculator,
  Info,
  Shield,
  Leaf,
  Calendar,
  MapPin,
  Euro,
  Download,
  Eye,
  Zap,
  Trees,
  Wheat,
  ChevronDown,
  ChevronUp,
  FileImage,
  Paperclip
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    basicInfo: true,
    calculations: false,
    documentation: false,
    methodology: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!project) return null;

  // Calculate CO2 values based on project type and EUFD2025-001 standards
  const calculateCO2Values = () => {
    let baseCO2 = 0;
    let calculationDetails = '';
    
    switch (project.projectType) {
      case 'carbon-farming':
        // EUFD2025-001 Section 5.3 - Carbon Farming calculations
        const soilFactors = {
          'tree-crops': 2.5,
          'organic': 1.8,
          'regenerative': 2.2,
          'agroforestry': 3.1,
          'cover-crops': 1.4
        };
        const factor = soilFactors[project.farmingMethod as keyof typeof soilFactors] || 1.5;
        baseCO2 = project.cultivatedArea * factor;
        calculationDetails = `Area: ${project.cultivatedArea} ha × Fattore ${project.farmingMethod}: ${factor} = ${baseCO2.toFixed(2)} t CO₂/anno`;
        break;
        
      case 'renewable-energy':
        // EUFD2025-001 Section 6.1 - Renewable Energy calculations
        const emissionFactors = {
          'eolica': 0.45,
          'solare': 0.41,
          'idroelettrica': 0.39,
          'biomasse': 0.35,
          'geotermica': 0.38,
          'marina': 0.43,
          'idrogeno': 0.37
        };
        const factor_re = emissionFactors[project.energyType as keyof typeof emissionFactors] || 0.40;
        const averageHours = 2500; // Average annual production hours
        baseCO2 = (project.electricalCapacity || 0) * averageHours * factor_re / 1000;
        calculationDetails = `Potenza: ${project.electricalCapacity || 0} kW × ${averageHours} ore/anno × Fattore emissione ${project.energyType}: ${factor_re} = ${baseCO2.toFixed(2)} t CO₂/anno`;
        break;
        
      case 'forestation':
        // EUFD2025-001 Section 7.2 - Forestation calculations
        const forestFactors = {
          'deciduous': 4.2,
          'coniferous': 3.8,
          'mixed': 4.0,
          'fast-growing': 5.1
        };
        const factor_f = forestFactors[project.forestType as keyof typeof forestFactors] || 4.0;
        baseCO2 = project.forestArea * factor_f;
        calculationDetails = `Area: ${project.forestArea} ha × Fattore ${project.forestType}: ${factor_f} = ${baseCO2.toFixed(2)} t CO₂/anno`;
        break;
    }

    // Apply EUFD2025-001 mandatory factors
    const safetyFactor = baseCO2 * 0.98; // 2% safety reduction
    const guaranteeFund = safetyFactor * 0.05; // 5% guarantee fund
    const netCO2 = safetyFactor * 0.95; // Net available CO2
    const totalProjectValue = netCO2 * (project.projectDuration || 1);

    return {
      baseCO2: baseCO2.toFixed(2),
      safetyFactor: safetyFactor.toFixed(2),
      guaranteeFund: guaranteeFund.toFixed(2),
      netCO2: netCO2.toFixed(2),
      totalProjectValue: totalProjectValue.toFixed(2),
      calculationDetails
    };
  };

  const calculations = calculateCO2Values();

  const getProjectIcon = () => {
    switch (project.projectType) {
      case 'carbon-farming': return <Wheat className="h-5 w-5" />;
      case 'renewable-energy': return <Zap className="h-5 w-5" />;
      case 'forestation': return <Trees className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'certified': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getProjectIcon()}
            <div>
              <div className="text-xl font-bold">{project.projectName}</div>
              <div className="text-sm text-gray-500 font-normal">
                ID: {project.id}
              </div>
            </div>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Project Information */}
          <div className="border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => toggleSection('basicInfo')}
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Informazioni Progetto Base</span>
              </div>
              {expandedSections.basicInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.basicInfo && (
              <div className="p-4 border-t bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="h-4 w-4" />
                      Localizzazione
                    </div>
                    <p className="text-sm">{project.projectLocation}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="h-4 w-4" />
                      Durata Progetto
                    </div>
                    <p className="text-sm">{project.projectDuration} anni</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <Euro className="h-4 w-4" />
                      Capacità Investimento
                    </div>
                    <p className="text-sm">€{project.investmentCapacity?.toLocaleString()}</p>
                  </div>

                  {/* CO₂ Calculation Results for Renewable Energy Projects */}
                  {project.projectType === 'renewable-energy' && project.co2SavedPerYear && (
                    <>
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-700 mb-1">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600 text-xs">⚡</span>
                          Produzione Annua
                        </div>
                        <p className="text-sm">{project.annualKwhProduction?.toLocaleString()} kWh/anno</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-700 mb-1">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600 text-xs">🌱</span>
                          CO₂ Evitata/Anno
                        </div>
                        <p className="text-sm font-semibold text-green-800">{project.co2SavedPerYear} kg CO₂</p>
                        <p className="text-xs text-gray-500">({(Number(project.co2SavedPerYear) / 1000).toFixed(2)} tonnellate)</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-700 mb-1">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600 text-xs">🔄</span>
                          CO₂ Evitata/30 Anni
                        </div>
                        <p className="text-sm font-semibold text-green-800">{(Number(project.co2SavedLifetime) / 1000).toFixed(2)} t CO₂</p>
                        <p className="text-xs text-gray-500">Standard Italiano: 0.53 kg CO₂/kWh</p>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="h-4 w-4" />
                      Data Creazione
                    </div>
                    <p className="text-sm">{new Date(project.createdAt).toLocaleDateString('it-IT')}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Descrizione</div>
                  <p className="text-sm text-gray-600">{project.projectDescription}</p>
                </div>
              </div>
            )}
          </div>

          {/* Project-Specific Details */}
          {project.projectType === 'carbon-farming' && (
            <div className="border rounded-lg">
              <div className="p-4 bg-green-50">
                <div className="flex items-center gap-2 mb-3">
                  <Wheat className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium text-green-900">Dettagli Carbon Farming</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-700">Tipo Coltura</div>
                    <p className="text-sm">{project.cropType}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700">Metodo Agricolo</div>
                    <p className="text-sm">{project.farmingMethod}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700">Area Coltivata</div>
                    <p className="text-sm">{project.cultivatedArea} ettari</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.projectType === 'renewable-energy' && (
            <div className="border rounded-lg">
              <div className="p-4 bg-blue-50">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Dettagli Energia Rinnovabile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-blue-700">Tecnologia</div>
                    <p className="text-sm">{project.energyType}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-700">Potenza Elettrica</div>
                    <p className="text-sm">{project.electricalCapacity} kW</p>
                  </div>
                  {project.thermalCapacity && (
                    <div>
                      <div className="text-sm font-medium text-blue-700">Potenza Termica</div>
                      <p className="text-sm">{project.thermalCapacity} kW</p>
                    </div>
                  )}
                  {project.historicalYears && (
                    <div>
                      <div className="text-sm font-medium text-blue-700">Anni Storici Disponibili</div>
                      <p className="text-sm">{project.historicalYears} anni</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {project.projectType === 'forestation' && (
            <div className="border rounded-lg">
              <div className="p-4 bg-green-50">
                <div className="flex items-center gap-2 mb-3">
                  <Trees className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium text-green-900">Dettagli Forestazione</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-700">Tipo Foresta</div>
                    <p className="text-sm">{project.forestType}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700">Specie Arboree</div>
                    <p className="text-sm">{project.treeSpecies}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700">Area Forestale</div>
                    <p className="text-sm">{project.forestArea} ettari</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700">Densità Alberi</div>
                    <p className="text-sm">{project.treeDensity} alberi/ha</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EUFD2025-001 Calculation Details */}
          <div className="border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => toggleSection('calculations')}
            >
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="font-medium">Calcoli EUFD2025-001 Dettagliati</span>
              </div>
              {expandedSections.calculations ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.calculations && (
              <div className="p-4 border-t">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-blue-900 mb-2">Metodologia di Calcolo Applicata</h4>
                  <p className="text-sm text-blue-700 mb-2">{calculations.calculationDetails}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">1. CO₂ Base Calcolato:</span>
                    <span className="font-mono text-lg">{calculations.baseCO2} t CO₂/anno</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-medium">2. Dopo Safety Factor (2%):</span>
                    <span className="font-mono text-lg">{calculations.safetyFactor} t CO₂/anno</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
                    <span className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      3. Fondo Garanzia (5%):
                    </span>
                    <span className="font-mono text-lg text-orange-700">{calculations.guaranteeFund} t CO₂/anno</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border-2 border-green-200">
                    <span className="font-medium text-green-900">4. CO₂ Disponibile Progetto (QP.A.):</span>
                    <span className="font-mono text-xl font-bold text-green-800">{calculations.netCO2} t CO₂/anno</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-2 border-blue-200">
                    <span className="font-medium text-blue-900">5. Valore Totale Progetto ({project.projectDuration} anni):</span>
                    <span className="font-mono text-xl font-bold text-blue-800">{calculations.totalProjectValue} t CO₂</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium text-emerald-900">Standard EUFD2025-001 Applicato</span>
                  </div>
                  <ul className="text-sm text-emerald-700 space-y-1 ml-6">
                    <li>• Safety Factor: 2% riduzione obbligatoria per variabilità</li>
                    <li>• Fondo Garanzia: 5% deposito per permanenza sequestro</li>
                    <li>• Metodologia conforme a UNI-PdR e ISO 14064-1,2,3</li>
                    <li>• Blockchain G8Chain per immutabilità certificazione</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Documentation Section */}
          <div className="border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => toggleSection('documentation')}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Documentazione Allegata</span>
              </div>
              {expandedSections.documentation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.documentation && (
              <div className="p-4 border-t space-y-4">
                <div className="text-sm text-gray-600 mb-3">
                  Documenti richiesti secondo EUFD2025-001 Sezioni 5.6, 6.2, 7.1
                </div>
                
                {/* Carbon Farming Documents */}
                {project.projectType === 'carbon-farming' && project.documents && (
                  <div className="space-y-4">
                    {project.documents.seedPurchaseDocuments && project.documents.seedPurchaseDocuments.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.seedPurchaseDocuments}
                        title="Documenti Acquisto Semi/Piante"
                        category="seed-purchase"
                      />
                    )}
                    {project.documents.plantingPhotos && project.documents.plantingPhotos.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.plantingPhotos}
                        title="Foto Piantagione"
                        category="planting-photos"
                      />
                    )}
                  </div>
                )}

                {/* Renewable Energy Documents */}
                {project.projectType === 'renewable-energy' && project.documents && (
                  <div className="space-y-4">
                    {project.documents.technologyPurchase && project.documents.technologyPurchase.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.technologyPurchase}
                        title="Documenti Acquisto Tecnologia"
                        category="technology-purchase"
                      />
                    )}
                    {project.documents.buildingPermits && project.documents.buildingPermits.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.buildingPermits}
                        title="Permessi Costruzione"
                        category="building-permits"
                      />
                    )}
                    {project.documents.commissioningDocs && project.documents.commissioningDocs.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.commissioningDocs}
                        title="Documenti Collaudo"
                        category="commissioning"
                      />
                    )}
                    {project.documents.installationPhotos && project.documents.installationPhotos.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.installationPhotos}
                        title="Foto Installazione"
                        category="installation-photos"
                      />
                    )}
                    {project.documents.productionRecords && project.documents.productionRecords.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.productionRecords}
                        title="Registrazioni Produzione (5 anni)"
                        category="production-records"
                      />
                    )}
                  </div>
                )}

                {/* Forestation Documents */}
                {project.projectType === 'forestation' && project.documents && (
                  <div className="space-y-4">
                    {project.documents.forestSeedlings && project.documents.forestSeedlings.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.forestSeedlings}
                        title="Documenti Acquisto Piantine"
                        category="forest-seedlings"
                      />
                    )}
                    {project.documents.forestPhotos && project.documents.forestPhotos.length > 0 && (
                      <DocumentDisplay
                        documents={project.documents.forestPhotos}
                        title="Foto Imboschimento"
                        category="forest-photos"
                      />
                    )}
                  </div>
                )}

                {/* No Documents Message */}
                {(!project.documents || Object.keys(project.documents).length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <Paperclip className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Nessun documento caricato per questo progetto</p>
                    <p className="text-xs text-gray-400 mt-1">I documenti verranno visualizzati qui una volta caricati</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Blockchain & Certification Status */}
          <div className="border rounded-lg">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    project.blockchainRecorded ? "bg-green-500 animate-pulse" : "bg-gray-400"
                  )} />
                  <h3 className="font-medium text-gray-900">Stato Blockchain & Certificazione</h3>
                </div>
                <Badge 
                  variant={project.blockchainRecorded ? "default" : "secondary"}
                  className={project.blockchainRecorded ? "bg-green-600" : ""}
                >
                  {project.blockchainRecorded ? "Registrato su G8Chain" : "In Attesa"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Stato Certificazione</div>
                  <Badge variant={
                    project.certificationStatus === 'approved' ? "default" :
                    project.certificationStatus === 'pending' ? "secondary" : "destructive"
                  }>
                    {project.certificationStatus === 'approved' ? 'Approvato' :
                     project.certificationStatus === 'pending' ? 'In Revisione' : 'Rifiutato'}
                  </Badge>
                </div>

                {project.certificateNumber && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Numero Certificato</div>
                    <div className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {project.certificateNumber}
                    </div>
                  </div>
                )}

                {project.certificateIssueDate && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Data Emissione</div>
                    <div className="text-sm">{new Date(project.certificateIssueDate).toLocaleDateString('it-IT')}</div>
                  </div>
                )}

                {project.blockchainTxHash && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Hash Transazione Blockchain</div>
                    <div className="text-xs font-mono bg-white px-2 py-1 rounded border break-all">
                      {project.blockchainTxHash}
                    </div>
                  </div>
                )}
              </div>

              {project.blockchainRecorded && (
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <div className="flex items-center gap-2 text-green-800">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Progetto verificato e immutabile su G8Chain</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    I dati di questo progetto sono stati crittograficamente validati e registrati sulla blockchain G8Chain per garantire trasparenza e immutabilità.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Methodology and Standards */}
          <div className="border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => toggleSection('methodology')}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Metodologia e Standard</span>
              </div>
              {expandedSections.methodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.methodology && (
              <div className="p-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <h4 className="font-medium text-blue-900 mb-2">Standard Applicati</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• EUFD2025-001 (EU Regulation 3012/2024)</li>
                      <li>• ISO 14064-1 (Greenhouse Gas Accounting)</li>
                      <li>• ISO 14064-2 (Project Level Quantification)</li>
                      <li>• ISO 14064-3 (Validation & Verification)</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded">
                    <h4 className="font-medium text-green-900 mb-2">Tecnologia Blockchain</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• G8Chain EVM-compatible network</li>
                      <li>• 51-node validator decentralization</li>
                      <li>• Immutable certification records</li>
                      <li>• Swiss data center infrastructure</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">Processo di Verifica</h4>
                  <p className="text-sm text-yellow-700">
                    Tutti i progetti vengono verificati secondo il protocollo EUFD2025-001 con doppia validazione: 
                    tecnica interna FAGRI e audit esterno ISO 14064-3 prima della certificazione finale.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Scarica Report Dettagliato
          </Button>
          
          <Button onClick={onClose}>
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}