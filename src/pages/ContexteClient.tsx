
import React from 'react';
import Timeline from '@/components/Timeline';
import DossierInfo from '@/components/DossierInfo';
import ContractInfo from '@/components/ContractInfo';
import DeclarationSummary from '@/components/declaration/DeclarationSummary';
import DocumentsClient from '@/components/contexte/DocumentsClient';

const ContexteClient: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Contexte Client - Dossier SIN-2024-001234
          </h2>
          <p className="text-gray-600">
            Sinistre Auto - Marc Dubois - Peugeot 308 (AB-123-CD)
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timeline et Documents Client */}
          <div className="space-y-6">
            <Timeline />
            <DocumentsClient />
          </div>

          {/* Center Column - Résumé Déclaration et Coordonnées Client */}
          <div className="space-y-6">
            <DeclarationSummary />
            <DossierInfo showOnlyClientInfo={true} />
          </div>

          {/* Right Column - Contrat et Contexte Sinistre */}
          <div className="space-y-6">
            <ContractInfo />
            <DossierInfo showOnlyContexte={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContexteClient;
