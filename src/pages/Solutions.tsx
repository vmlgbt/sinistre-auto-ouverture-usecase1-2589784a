
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Send } from 'lucide-react';
import Header from '@/components/Header';
import EvaluationCard from '@/components/solutions/EvaluationCard';
import CompensationCard from '@/components/solutions/CompensationCard';
import NextSteps from '@/components/solutions/NextSteps';
import PartnerGarages from '@/components/solutions/PartnerGarages';
import DocumentsSection from '@/components/solutions/DocumentsSection';

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'contexte' | 'declaration'>('declaration');

  const handleGoBack = () => {
    window.history.pushState({}, '', '/?page=verification');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleExportReport = () => {
    console.log('Export du rapport de sinistre');
    // Logique d'export
  };

  const handleSendToClient = () => {
    console.log('Envoi des propositions au client');
    // Logique d'envoi
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la vérification
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportReport}>
                <Download className="w-4 h-4 mr-2" />
                Exporter le rapport
              </Button>
              <Button onClick={handleSendToClient}>
                <Send className="w-4 h-4 mr-2" />
                Envoyer au client
              </Button>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Solutions et propositions - Dossier SIN-2024-001234
          </h1>
          <p className="text-gray-600">
            Sinistre Auto - Marc Dubois - Peugeot 308 (AB-123-CD)
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 flex-1 px-6 pb-6">
          {/* Left Panel - Solutions */}
          <div className="col-span-8 space-y-6">
            {/* Evaluation and Compensation Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EvaluationCard />
              <CompensationCard />
            </div>
            
            {/* Partner Garages */}
            <PartnerGarages />
            
            {/* Documents Section */}
            <DocumentsSection />
          </div>

          {/* Right Panel - Next Steps */}
          <div className="col-span-4">
            <NextSteps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
