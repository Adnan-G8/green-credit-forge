import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectTypeSelection } from './project-type-selection';
import { CarbonFarmingProjectForm } from './carbon-farming-project-form';
import { ForestationProjectForm } from './forestation-project-form';
import { RenewableEnergyProjectForm } from './renewable-energy-project-form';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
  onProjectCreated?: () => void;
}

type ViewType = 'selection' | 'carbon-farming' | 'renewable-energy' | 'forestation';

export function ProjectCreationModal({ isOpen, onClose, alphaG8Id, onProjectCreated }: ProjectCreationModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<ViewType>('selection');

  const handleClose = () => {
    setCurrentView('selection');
    onClose();
  };

  const handleProjectCreated = () => {
    if (onProjectCreated) {
      onProjectCreated();
    }
    handleClose();
  };

  const handleSelectType = (type: 'carbon-farming' | 'renewable-energy' | 'forestation') => {
    setCurrentView(type);
  };

  const handleBack = () => {
    setCurrentView('selection');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'selection':
        return (
          <ProjectTypeSelection
            onBack={handleClose}
            onSelectType={handleSelectType}
          />
        );
      
      case 'carbon-farming':
        return (
          <CarbonFarmingProjectForm
            onBack={handleBack}
            alphaG8Id={alphaG8Id}
            onProjectCreated={handleProjectCreated}
          />
        );
      
      case 'forestation':
        return (
          <ForestationProjectForm
            onBack={handleBack}
            alphaG8Id={alphaG8Id}
            onProjectCreated={handleProjectCreated}
          />
        );
      
      case 'renewable-energy':
        return (
          <RenewableEnergyProjectForm
            onBack={handleBack}
            alphaG8Id={alphaG8Id}
            onProjectCreated={handleProjectCreated}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0" aria-describedby="project-creation-description">
        <DialogHeader className="sr-only">
          <DialogTitle>Creazione Nuovo Progetto CO₂</DialogTitle>
          <DialogDescription id="project-creation-description">
            Seleziona il tipo di progetto e compila i dettagli per la certificazione CO₂
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[95vh]">
          {renderCurrentView()}
        </div>
      </DialogContent>
    </Dialog>
  );
}