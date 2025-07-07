
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface BottomBarProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({
  currentStep,
  onNext,
  onPrevious,
  isNextDisabled = false
}) => {
  const getNextButtonText = () => {
    switch (currentStep) {
      case 1:
        return 'Voir le récapitulatif';
      case 2:
        return 'Voir les solutions';
      case 3:
        return 'Valider le dossier';
      case 4:
        return 'Terminer';
      default:
        return 'Suivant';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center shadow-lg z-50">
      <div className="flex items-center space-x-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Précédent
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          Étape {currentStep} sur 4
        </span>
        <Button
          onClick={onNext}
          disabled={isNextDisabled}
          className="flex items-center"
        >
          {getNextButtonText()}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
