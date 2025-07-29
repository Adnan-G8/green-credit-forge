import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { ArrowLeft, Wheat, Trees, Zap } from 'lucide-react';
import carbonFarmingImage from '@assets/image_1753778388461.png';
import forestationImage from '@assets/image_1753778463931.png';
import renewableEnergyImage from '@assets/image_1753778575362.png';

interface ProjectTypeSelectionProps {
  onBack: () => void;
  onSelectType: (type: 'carbon-farming' | 'renewable-energy' | 'forestation') => void;
}

export function ProjectTypeSelection({ onBack, onSelectType }: ProjectTypeSelectionProps) {
  const { t } = useLanguage();

  const projectTypes = [
    {
      id: 'carbon-farming' as const,
      title: 'Carbon Farming Project',
      titleItalian: 'Progetto Carbon Farming',
      description: 'Sequestro CO₂ attraverso pratiche agricole sostenibili',
      descriptionEnglish: 'CO₂ sequestration through sustainable agricultural practices',
      image: carbonFarmingImage,
      icon: <Wheat className="h-8 w-8" />,
      gradient: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      borderColor: 'border-green-200 hover:border-green-300'
    },
    {
      id: 'forestation' as const,
      title: 'Forestation Project',
      titleItalian: 'Progetto Forestazione',
      description: 'Assorbimento CO₂ attraverso imboschimento e riforestazione',
      descriptionEnglish: 'CO₂ absorption through afforestation and reforestation',
      image: forestationImage,
      icon: <Trees className="h-8 w-8" />,
      gradient: 'from-emerald-700 to-green-700',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100',
      borderColor: 'border-emerald-200 hover:border-emerald-300'
    },
    {
      id: 'renewable-energy' as const,
      title: 'Renewable Energy Project',
      titleItalian: 'Progetto Energia Rinnovabile',
      description: 'Riduzione emissioni CO₂ tramite energie rinnovabili',
      descriptionEnglish: 'CO₂ emission reduction through renewable energy',
      image: renewableEnergyImage,
      icon: <Zap className="h-8 w-8" />,
      gradient: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200 hover:border-blue-300'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna al Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Seleziona Tipo Progetto CO₂
          </h1>
          <p className="text-gray-600">
            Scegli il tipo di progetto di certificazione CO₂ che vuoi creare
          </p>
        </div>
      </div>

      {/* Project Type Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projectTypes.map((type) => (
          <Card
            key={type.id}
            className={`group cursor-pointer transition-all duration-300 ${type.bgColor} ${type.borderColor} border-2 hover:shadow-xl hover:scale-105`}
            onClick={() => onSelectType(type.id)}
          >
            <CardContent className="p-0">
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={type.image}
                  alt={type.titleItalian}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${type.gradient} opacity-20`} />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <div className="text-gray-700">
                      {type.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {type.titleItalian}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {type.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {type.id === 'carbon-farming' && (
                    <div className="text-xs text-green-700 space-y-1">
                      <div>• Colture tradizionali e biologiche</div>
                      <div>• Agroforestazione e cover crops</div>
                      <div>• Agricoltura rigenerativa</div>
                    </div>
                  )}
                  
                  {type.id === 'forestation' && (
                    <div className="text-xs text-emerald-700 space-y-1">
                      <div>• Boschi decidui e sempreverdi</div>
                      <div>• Riforestazione urbana</div>
                      <div>• Imboschimento terreni agricoli</div>
                    </div>
                  )}
                  
                  {type.id === 'renewable-energy' && (
                    <div className="text-xs text-blue-700 space-y-1">
                      <div>• Solare, Eolico, Idroelettrico</div>
                      <div>• Biomasse, Geotermico, Marino</div>
                      <div>• Idrogeno verde e storage</div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${type.gradient} text-white hover:opacity-90 transition-opacity`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectType(type.id);
                  }}
                >
                  Crea Progetto {type.titleItalian.split(' ')[1]}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-900 mb-2">
          Standard EUFD2025-001 - EU Regulation 3012/2024
        </h3>
        <p className="text-sm text-gray-600">
          Tutti i progetti seguono lo standard europeo EUFD2025-001 con certificazione ISO 14064-1,2,3 
          e registrazione su blockchain G8Chain per garantire trasparenza e immutabilità dei carbon credits.
        </p>
      </div>
    </div>
  );
}