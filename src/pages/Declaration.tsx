
import React, { useState, useEffect } from 'react';
import TranscriptionPanel from '@/components/declaration/TranscriptionPanel';
import DynamicForm from '@/components/declaration/DynamicForm';
import ProgressPanel from '@/components/declaration/ProgressPanel';
import Stepper from '@/components/declaration/Stepper';
import BottomBar from '@/components/declaration/BottomBar';

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'multi-select' | 'number' | 'date';
  options?: string[];
  required: boolean;
  category: 'contexte_client' | 'contexte_sinistre' | 'vehicule_assure';
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

const Declaration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [transcript, setTranscript] = useState('');
  const [managerNotes, setManagerNotes] = useState('');
  const [isCallActive, setIsCallActive] = useState(true);

  const questions: Question[] = [
    {
      id: '1',
      text: 'Numéro d\'assurance',
      type: 'text',
      required: true,
      category: 'contexte_client'
    },
    {
      id: '2',
      text: 'Où avez-vous découvert les dommages sur votre véhicule ?',
      type: 'select',
      options: ['Sur un parking', 'Devant mon domicile', 'Sur la voie publique', 'Dans un garage', 'Autre lieu'],
      required: true,
      category: 'contexte_sinistre'
    },
    {
      id: '3',
      text: 'À quel moment avez-vous découvert les dommages ?',
      type: 'select',
      options: ['En sortant de chez moi', 'En revenant à mon véhicule', 'En garant mon véhicule', 'Autre moment'],
      required: true,
      category: 'contexte_sinistre'
    },
    {
      id: '4',
      text: 'Marque et modèle du véhicule',
      type: 'text',
      required: true,
      category: 'vehicule_assure'
    },
    {
      id: '5',
      text: 'Quelles parties du véhicule sont endommagées ?',
      type: 'multi-select',
      options: ['Pare-choc avant', 'Pare-choc arrière', 'Aile avant droite', 'Aile avant gauche', 'Portière droite', 'Portière gauche', 'Capot', 'Coffre'],
      required: true,
      category: 'vehicule_assure'
    },
    {
      id: '6',
      text: 'Estimation des dégâts (en euros)',
      type: 'number',
      required: true,
      category: 'vehicule_assure'
    },
    {
      id: '7',
      text: 'Type de dommages constatés',
      type: 'multi-select',
      options: ['Rayures profondes', 'Rayures superficielles', 'Bosses', 'Éclats de peinture', 'Fissures', 'Déformation'],
      required: true,
      category: 'vehicule_assure'
    },
    {
      id: '8',
      text: 'Y a-t-il des témoins de l\'incident ?',
      type: 'select',
      options: ['Oui', 'Non', 'Je ne sais pas'],
      required: true,
      category: 'contexte_sinistre'
    },
    {
      id: '9',
      text: 'Le véhicule est-il encore utilisable ?',
      type: 'select',
      options: ['Oui, parfaitement utilisable', 'Oui, mais avec précautions', 'Non, dangereux à conduire', 'Non, impossible à démarrer'],
      required: true,
      category: 'vehicule_assure'
    },
    {
      id: '10',
      text: 'Depuis combien de temps avez-vous découvert ces dommages ?',
      type: 'select',
      options: ['Moins d\'1 heure', '1 à 6 heures', '6 à 24 heures', '1 à 3 jours', 'Plus de 3 jours'],
      required: true,
      category: 'contexte_sinistre'
    }
  ];

  useEffect(() => {
    const callScript = [
      { time: 2000, transcript: 'Gestionnaire: Bonjour, je suis Marie de AXA. Pouvez-vous me donner votre numéro d\'assurance ?', answer: null },
      { time: 4000, transcript: 'Client: Oui, c\'est le 123456789.', answer: { questionId: '1', value: '123456789' } },
      { time: 6000, transcript: 'Gestionnaire: Parfait. Où avez-vous découvert les dommages sur votre véhicule ?', answer: null },
      { time: 8000, transcript: 'Client: Je l\'ai découvert en sortant de chez moi ce matin, ma voiture était garée devant mon domicile.', answer: { questionId: '2', value: 'Devant mon domicile' } },
      { time: 10000, transcript: 'Gestionnaire: D\'accord. À quel moment précis avez-vous remarqué les dégâts ?', answer: null },
      { time: 12000, transcript: 'Client: En sortant de chez moi pour aller au travail.', answer: { questionId: '3', value: 'En sortant de chez moi' } },
      { time: 14000, transcript: 'Gestionnaire: Pouvez-vous me dire la marque et le modèle de votre véhicule ?', answer: null },
      { time: 16000, transcript: 'Client: C\'est une Peugeot 308.', answer: { questionId: '4', value: 'Peugeot 308' } },
      { time: 18000, transcript: 'Gestionnaire: Quelles parties du véhicule sont endommagées ?', answer: null },
      { time: 20000, transcript: 'Client: Le pare-choc avant est vraiment abîmé, et il y a aussi des dégâts sur l\'aile avant droite.', answer: { questionId: '5', value: ['Pare-choc avant', 'Aile avant droite'] } },
      { time: 22000, transcript: 'Gestionnaire: Avez-vous une estimation des dégâts ?', answer: null },
      { time: 24000, transcript: 'Client: Je pense que ça va coûter dans les 800 euros à réparer.', answer: { questionId: '6', value: '800' } },
      { time: 26000, transcript: 'Gestionnaire: Quel type de dommages constatez-vous exactement ?', answer: null },
      { time: 28000, transcript: 'Client: Il y a des bosses importantes et des rayures profondes.', answer: { questionId: '7', value: ['Bosses', 'Rayures profondes'] } },
      { time: 30000, transcript: 'Gestionnaire: Y a-t-il des témoins de cet incident ?', answer: null },
      { time: 32000, transcript: 'Client: Non, personne n\'a rien vu malheureusement.', answer: { questionId: '8', value: 'Non' } },
      { time: 34000, transcript: 'Gestionnaire: Votre véhicule est-il encore utilisable après ces dommages ?', answer: null },
      { time: 36000, transcript: 'Client: Oui, je peux encore rouler avec, mais je fais attention car le pare-choc est un peu déformé.', answer: { questionId: '9', value: 'Oui, mais avec précautions' } },
      { time: 38000, transcript: 'Gestionnaire: Depuis combien de temps avez-vous découvert ces dommages ?', answer: null },
      { time: 40000, transcript: 'Client: Je viens de les découvrir ce matin, ça fait moins d\'une heure.', answer: { questionId: '10', value: 'Moins d\'1 heure' } },
      { time: 42000, transcript: 'Gestionnaire: Parfait, j\'ai toutes les informations nécessaires. Nous allons pouvoir procéder à la vérification.', answer: null },
    ];

    const timeouts = callScript.map((event) => {
      return setTimeout(() => {
        if (isCallActive) {
          setTranscript(prev => prev + '\n' + event.transcript);
          
          if (event.answer) {
            setAnswers(prev => {
              const existingIndex = prev.findIndex(a => a.questionId === event.answer!.questionId);
              if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = event.answer!;
                return updated;
              }
              return [...prev, event.answer!];
            });
            
            // Passer à la question suivante automatiquement
            setCurrentQuestionIndex(prev => {
              const nextIndex = prev + 1;
              return nextIndex < questions.length ? nextIndex : prev;
            });
          }
        }
      }, event.time);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isCallActive, questions.length]);

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Navigate to verification page without full reload
      window.history.pushState({}, '', '/?page=verification');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextDisabled = () => {
    // Pour l'étape 1 (Déclaration), autoriser l'accès dès que les 4 premières questions essentielles sont répondues
    if (currentStep === 1) {
      const essentialQuestions = questions.slice(0, 4); // Questions 1-4 (numéro d'assurance, lieu, moment, véhicule)
      const answeredEssential = essentialQuestions.filter(q => 
        answers.some(a => a.questionId === q.id && a.value && a.value !== '')
      );
      return answeredEssential.length < essentialQuestions.length;
    }
    return false;
  };

  const getProgress = () => {
    const contextClient = questions.filter(q => q.category === 'contexte_client');
    const contextSinistre = questions.filter(q => q.category === 'contexte_sinistre');
    const vehiculeAssure = questions.filter(q => q.category === 'vehicule_assure');

    const answeredContextClient = contextClient.filter(q => 
      answers.some(a => a.questionId === q.id)
    ).length;
    const answeredContextSinistre = contextSinistre.filter(q => 
      answers.some(a => a.questionId === q.id)
    ).length;
    const answeredVehiculeAssure = vehiculeAssure.filter(q => 
      answers.some(a => a.questionId === q.id)
    ).length;

    return {
      contexte_client: {
        completed: answeredContextClient,
        total: contextClient.length
      },
      contexte_sinistre: {
        completed: answeredContextSinistre,
        total: contextSinistre.length
      },
      vehicule_assure: {
        completed: answeredVehiculeAssure,
        total: vehiculeAssure.length
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Header - Fixed height */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nouvelle déclaration - Dossier SIN-2024-001234
          </h1>
          <p className="text-gray-600">
            Sinistre Auto - Marc Dubois - Peugeot 308 (AB-123-CD)
          </p>
          <div className="flex items-center mt-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-green-600 font-medium">Appel en cours</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex-shrink-0">
          <Stepper currentStep={currentStep} />
        </div>

        {/* Main Content Grid - Allow content to scroll */}
        <div className="grid grid-cols-12 gap-6 flex-1 px-6 mb-32">
          {/* Left Panel - Transcription */}
          <div className="col-span-3 h-[calc(100vh-280px)] min-h-[400px]">
            <TranscriptionPanel 
              transcript={transcript}
              onTranscriptChange={setTranscript}
              isCallActive={isCallActive}
            />
          </div>

          {/* Center Panel - Dynamic Form */}
          <div className="col-span-6 h-[calc(100vh-280px)] min-h-[400px]">
            <DynamicForm
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onQuestionChange={setCurrentQuestionIndex}
              isAutoMode={true}
            />
          </div>

          {/* Right Panel - Progress */}
          <div className="col-span-3 h-[calc(100vh-400px)] max-h-[600px]">
            <ProgressPanel
              progress={getProgress()}
              managerNotes={managerNotes}
              onNotesChange={setManagerNotes}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Bar - Fixed at bottom */}
      <BottomBar
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isNextDisabled={isNextDisabled()}
      />
    </div>
  );
};

export default Declaration;
