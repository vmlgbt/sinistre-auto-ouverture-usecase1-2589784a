
import React, { useState } from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/declaration/Stepper';
import BottomBar from '@/components/declaration/BottomBar';
import SinisterSummary from '@/components/validation/SinisterSummary';
import ClientVehicleData from '@/components/validation/ClientVehicleData';
import DocumentsManager from '@/components/validation/DocumentsManager';
import MailTemplate from '@/components/validation/MailTemplate';
import { CheckCircle, X } from 'lucide-react';

const Validation: React.FC = () => {
  const [currentStep] = useState(4);
  const [activeTab, setActiveTab] = useState<'contexte' | 'declaration'>('declaration');
  const [emailSentBanner, setEmailSentBanner] = useState<string | null>(null);

  const handleNext = () => {
    console.log('Finalisation du dossier - redirection vers contexte client');
    // Marquer l'étape de validation comme terminée
    localStorage.setItem('validationCompleted', 'true');
    // Rediriger vers la page contexte client
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handlePrevious = () => {
    window.history.pushState({}, '', '/?page=solutions');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleEmailSent = (email: string) => {
    setEmailSentBanner(email);
    // Auto-hide banner after 5 seconds
    setTimeout(() => {
      setEmailSentBanner(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Success Banner */}
      {emailSentBanner && (
        <div className="bg-green-50 border border-green-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center text-green-800">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">
              Courrier envoyé avec succès à l'adresse : {emailSentBanner}
            </span>
          </div>
          <button
            onClick={() => setEmailSentBanner(null)}
            className="text-green-600 hover:text-green-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
          </div>

          {/* Right Panel - Mail Template */}
          <div className="col-span-5">
            <MailTemplate onEmailSent={handleEmailSent} />
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
