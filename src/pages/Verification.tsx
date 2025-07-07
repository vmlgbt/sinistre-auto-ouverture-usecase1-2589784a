import React, { useState } from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/declaration/Stepper';
import BottomBar from '@/components/declaration/BottomBar';
import VerificationForm from '@/components/verification/VerificationForm';
import ManagerNotes from '@/components/verification/ManagerNotes';

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
    </div>
  );
};

export default Verification;
