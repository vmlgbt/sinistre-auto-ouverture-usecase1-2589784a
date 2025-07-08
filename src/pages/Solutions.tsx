
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Send, Sparkle, Shield, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Stepper from '@/components/declaration/Stepper';
import EvaluationCard from '@/components/solutions/EvaluationCard';
import CompensationCard from '@/components/solutions/CompensationCard';
import PartnerGarages from '@/components/solutions/PartnerGarages';
import BottomBar from '@/components/declaration/BottomBar';

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'contexte' | 'declaration'>('declaration');
  const [managerChoice, setManagerChoice] = React.useState<'compensation' | 'garage' | null>(null);

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

  const handleChoiceSelect = (choice: 'compensation' | 'garage') => {
    setManagerChoice(choice);
  };

  const handleBackToChoices = () => {
    setManagerChoice(null);
  };

  const handleNext = () => {
    window.history.pushState({}, '', '/?page=validation');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handlePrevious = () => {
    window.history.pushState({}, '', '/?page=verification');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
            Solutions et propositions - N° de sinistre :170492218073
          </h1>
          <p className="text-gray-600">
            Sinistre Auto - Marc Dubois - Peugeot 308 (AB-123-CD)
          </p>
        </div>

        {/* Stepper */}
        <div className="flex-shrink-0">
          <Stepper currentStep={3} />
        </div>

        {/* Main Content - Centered layout */}
        <div className="max-w-4xl mx-auto w-full flex-1 px-6 pb-32">
          <div className="space-y-6">
            {/* Always show Evaluation Card first */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Évaluation du sinistre
              </h2>
              <EvaluationCard />
            </div>

            {/* Manager Choices */}
            {!managerChoice ? (
              // Choice Selection
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Choisissez une solution pour le client
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Compensation Choice */}
                    <Card 
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                      onClick={() => handleChoiceSelect('compensation')}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <div className="flex items-center">
                            <Shield className="w-6 h-6 mr-2 text-blue-600" />
                            <span>Proposition de dédommagement</span>
                            <Sparkle className="w-5 h-5 ml-2 text-purple-600" />
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Calculée automatiquement par l'IA en fonction des dommages évalués et des garanties du contrat.
                        </p>
                        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <div className="flex items-center text-purple-800">
                            <Sparkle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Proposition générée par l'IA</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Garage Choice */}
                    <Card 
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                      onClick={() => handleChoiceSelect('garage')}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MapPin className="w-6 h-6 mr-2 text-green-600" />
                          Proposer un garage partenaire
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Orienter le client vers un de nos garages partenaires AXA avec prise de rendez-vous directe.
                        </p>
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                          <span className="text-sm font-medium text-green-800">
                            Réseau de garages certifiés AXA
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              // Selected Choice Content
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {managerChoice === 'compensation' ? 'Proposition de dédommagement' : 'Garages partenaires'}
                  </h2>
                  <Button variant="outline" onClick={handleBackToChoices}>
                    Changer de solution
                  </Button>
                </div>

                {managerChoice === 'compensation' && (
                  <CompensationCard />
                )}

                {managerChoice === 'garage' && (
                  <PartnerGarages />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <BottomBar
        currentStep={3}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isNextDisabled={managerChoice === null}
      />
    </div>
  );
};

export default Solutions;
