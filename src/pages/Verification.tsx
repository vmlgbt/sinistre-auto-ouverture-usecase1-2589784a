import React, { useState } from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/declaration/Stepper';
import BottomBar from '@/components/declaration/BottomBar';
import VerificationForm from '@/components/verification/VerificationForm';
import ManagerNotes from '@/components/verification/ManagerNotes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Euro, Shield, Info } from 'lucide-react';

export interface VerificationData {
  contexte_client: {
    title: string;
    questions: { id: string; question: string; answer: string | string[]; isAutoFilled: boolean; }[];
  };
  contexte_sinistre: {
    title: string;
    questions: { id: string; question: string; answer: string | string[]; isAutoFilled: boolean; }[];
  };
  vehicule_assure: {
    title: string;
    questions: { id: string; question: string; answer: string | string[]; isAutoFilled: boolean; }[];
  };
}

const Verification: React.FC = () => {
  const [currentStep] = useState(2);
  const [managerNotes, setManagerNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'contexte' | 'declaration'>('declaration');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [verificationData, setVerificationData] = useState<VerificationData>({
    contexte_client: {
      title: 'Contexte Client',
      questions: [
        { id: '1', question: 'Numéro d\'assurance', answer: '123456789', isAutoFilled: true }
      ]
    },
    contexte_sinistre: {
      title: 'Contexte du Sinistre',
      questions: [
        { id: '2', question: 'Où avez-vous découvert les dommages sur votre véhicule ?', answer: 'Devant mon domicile', isAutoFilled: true },
        { id: '3', question: 'À quel moment avez-vous découvert les dommages ?', answer: 'En sortant de chez moi', isAutoFilled: true },
        { id: '8', question: 'Y a-t-il des témoins de l\'incident ?', answer: 'Non', isAutoFilled: true },
        { id: '10', question: 'Depuis combien de temps avez-vous découvert ces dommages ?', answer: '', isAutoFilled: false }
      ]
    },
    vehicule_assure: {
      title: 'Véhicule Assuré',
      questions: [
        { id: '4', question: 'Marque et modèle du véhicule', answer: 'Peugeot 308', isAutoFilled: true },
        { id: '5', question: 'Quelles parties du véhicule sont endommagées ?', answer: ['Pare-choc avant', 'Aile avant droite'], isAutoFilled: true },
        { id: '6', question: 'Estimation des dégâts (en euros)', answer: '800', isAutoFilled: true },
        { id: '7', question: 'Type de dommages constatés', answer: ['Bosses', 'Rayures profondes'], isAutoFilled: true },
        { id: '9', question: 'Le véhicule est-il encore utilisable ?', answer: '', isAutoFilled: false }
      ]
    }
  });

  const handleNext = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmAndProceed = () => {
    setShowConfirmDialog(false);
    window.history.pushState({}, '', '/?page=solutions');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handlePrevious = () => {
    window.location.href = '/';
  };

  const handleDataChange = (sectionKey: keyof VerificationData, questionId: string, newAnswer: string | string[]) => {
    setVerificationData(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        questions: prev[sectionKey].questions.map(q => 
          q.id === questionId ? { ...q, answer: newAnswer } : q
        )
      }
    }));
  };

  const isNextDisabled = () => {
    const allQuestions = [
      ...verificationData.contexte_client.questions,
      ...verificationData.contexte_sinistre.questions,
      ...verificationData.vehicule_assure.questions
    ];
    return allQuestions.some(q => !q.answer || (Array.isArray(q.answer) && q.answer.length === 0));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vérification des informations - Dossier SIN-2024-001234
          </h1>
          <p className="text-gray-600">
            Sinistre Auto - Marc Dubois - Peugeot 308 (AB-123-CD)
          </p>
        </div>

        {/* Stepper */}
        <div className="flex-shrink-0">
          <Stepper currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 flex-1 px-6 pb-32">
          {/* Left Panel - Verification Form */}
          <div className="col-span-8">
            <VerificationForm
              data={verificationData}
              onDataChange={handleDataChange}
            />
          </div>

          {/* Right Panel - Manager Notes */}
          <div className="col-span-4">
            <ManagerNotes
              notes={managerNotes}
              onNotesChange={setManagerNotes}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <BottomBar
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isNextDisabled={isNextDisabled()}
      />

      {/* Enhanced Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-700 text-xl">
              <CheckCircle className="w-6 h-6 mr-2" />
              Sinistre garanti - Dommages Tous Accidents
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Suite aux informations saisies, nous confirmons que votre sinistre est bien garanti par votre contrat d'assurance au titre de la garantie "Dommages Tous Accidents".
            </DialogDescription>
          </DialogHeader>
          
          {/* Coverage Information */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <div className="flex items-start">
              <Shield className="w-5 h-5 mr-2 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Garantie Dommages Tous Accidents</h4>
                <p className="text-sm text-green-700 mt-1">
                  Cette garantie couvre les dommages matériels causés à votre véhicule, quelle qu'en soit la cause (collision, vandalisme, intempéries, etc.).
                </p>
              </div>
            </div>
          </div>

          {/* Damage Assessment */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-3">Évaluation des dommages</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Parties endommagées :</span>
                <span className="text-sm font-medium text-blue-900">Pare-choc avant, Aile avant droite</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Type de dommages :</span>
                <span className="text-sm font-medium text-blue-900">Bosses, Rayures profondes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Estimation des réparations :</span>
                <div className="flex items-center text-blue-900 font-bold">
                  <Euro className="w-4 h-4 mr-1" />
                  800
                </div>
              </div>
            </div>
          </div>

          {/* Franchise Details */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <Info className="w-5 h-5 mr-2 text-orange-600 mt-0.5" />
              <h4 className="font-semibold text-orange-900">Détails de la franchise</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-700">Franchise contractuelle :</span>
                <div className="flex items-center text-orange-900 font-bold">
                  <Euro className="w-4 h-4 mr-1" />
                  150
                </div>
              </div>
              
              <div className="bg-white rounded p-3 border border-orange-200">
                <div className="text-xs text-orange-700 mb-2">Calcul de l'indemnisation :</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant des dégâts :</span>
                    <span className="font-medium">800 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Franchise à déduire :</span>
                    <span className="font-medium">- 150 €</span>
                  </div>
                  <hr className="border-orange-200" />
                  <div className="flex justify-between font-bold text-orange-900">
                    <span>Indemnisation nette :</span>
                    <span>650 €</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-orange-600">
                * La franchise reste à votre charge et sera déduite du montant de l'indemnisation ou à régler directement au réparateur selon l'option choisie.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirmAndProceed}>
              Voir les solutions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Verification;
