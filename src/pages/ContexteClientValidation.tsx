
import React from 'react';
import Timeline from '@/components/Timeline';
import DossierInfo from '@/components/DossierInfo';
import ContractInfo from '@/components/ContractInfo';
import DocumentsClient from '@/components/contexte/DocumentsClient';
import NextStepsClient from '@/components/contexte/NextStepsClient';

const ContexteClientValidation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Contexte Client - N° de sinistre :170492218073
          </h2>
          <p className="text-gray-600">
            Sinistre Auto - Marc Dubois - Peugeot 308 (AB-123-CD)
          </p>
        </div>

        {/* Main Content Grid - Réorganisé en 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Timeline, Documents Client et Coordonnées Client */}
          <div className="space-y-6">
            <Timeline />
            <DocumentsClient />
            <DossierInfo showOnlyClientInfo={true} />
          </div>

          {/* Right Column - Contrat et Prochaines étapes */}
          <div className="space-y-6">
            <ContractInfo />
            <NextStepsClient />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContexteClientValidation;
