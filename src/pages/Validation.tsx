
import React, { useState } from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/declaration/Stepper';
import BottomBar from '@/components/declaration/BottomBar';
import SinisterSummary from '@/components/validation/SinisterSummary';
import ClientVehicleData from '@/components/validation/ClientVehicleData';
import DocumentsManager from '@/components/validation/DocumentsManager';
import MailTemplate from '@/components/validation/MailTemplate';
import NextStepsPanel from '@/components/validation/NextStepsPanel';

const Validation: React.FC = () => {
  const [currentStep] = useState(4);
  const [activeTab, setActiveTab] = useState<'contexte' | 'declaration'>('declaration');

  const handleNext = () => {
    console.log('Finalisation du dossier');
    // Logique de finalisation
  };

  const handlePrevious = () => {
    window.history.pushState({}, '', '/?page=solutions');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Validation du dossier - N° de sinistre :170492218073
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
          {/* Left Panel - Summary */}
          <div className="col-span-7 space-y-6">
            <SinisterSummary />
            <ClientVehicleData />
            <DocumentsManager />
            <NextStepsPanel />
          </div>

          {/* Right Panel - Mail Template */}
          <div className="col-span-5">
            <MailTemplate />
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <BottomBar
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isNextDisabled={false}
      />
    </div>
  );
};

export default Validation;
