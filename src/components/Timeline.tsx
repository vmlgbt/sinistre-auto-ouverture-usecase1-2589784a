
import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
  type: 'info' | 'success' | 'warning';
}

const Timeline: React.FC = () => {
  // Vérifier si la validation est terminée
  const isValidationCompleted = localStorage.getItem('validationCompleted') === 'true';

  const events: TimelineEvent[] = [
    {
      id: '1',
      title: 'Déclaration de sinistre',
      description: 'Informations collectées et déclaration terminée',
      date: '15/01/2024',
      time: '09:30',
      status: 'completed',
      type: 'success'
    },
    {
      id: '2',
      title: 'Ouverture du dossier',
      description: 'Dossier n° SIN-2024-001234 ouvert',
      date: '15/01/2024',
      time: '09:35',
      status: isValidationCompleted ? 'completed' : 'current',
      type: isValidationCompleted ? 'success' : 'info'
    },
    {
      id: '3', 
      title: 'Validation gestionnaire',
      description: isValidationCompleted ? 'Dossier validé par le gestionnaire et courrier envoyé au client' : 'En attente de validation par le gestionnaire',
      date: isValidationCompleted ? '08/07/2025' : 'À planifier',
      time: isValidationCompleted ? '14:20' : '',
      status: isValidationCompleted ? 'completed' : 'pending',
      type: isValidationCompleted ? 'success' : 'warning'
    },
    {
      id: '4',
      title: 'En attente de documents',
      description: 'Attente de réception des documents manquants du client',
      date: isValidationCompleted ? 'En cours' : 'À planifier',
      time: '',
      status: isValidationCompleted ? 'current' : 'pending',
      type: isValidationCompleted ? 'info' : 'warning'
    },
    {
      id: '5',
      title: 'Contact expert',
      description: 'Planification de l\'expertise sur site',
      date: 'À planifier',
      time: '',
      status: 'pending',
      type: 'warning'
    },
    {
      id: '6',
      title: 'Validation du dossier',
      description: 'Validation finale et traitement du remboursement',
      date: 'À définir',
      time: '',
      status: 'pending',
      type: 'info'
    }
  ];

  const getStatusIcon = (status: string, type: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'current':
        return <Clock className="w-4 h-4 text-axa-blue animate-pulse" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-200';
      case 'current':
        return 'bg-blue-100 border-axa-blue';
      case 'pending':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Avancement du Dossier
      </h3>
      
      <div className="relative">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start mb-6 last:mb-0">
            {/* Timeline line */}
            {index < events.length - 1 && (
              <div className="absolute left-3 top-8 w-0.5 h-16 bg-gray-200"></div>
            )}
            
            {/* Status indicator */}
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mr-4">
              {getStatusIcon(event.status, event.type)}
            </div>
            
            {/* Event content */}
            <div className={`flex-1 min-w-0 p-4 rounded-lg border ${getStatusColor(event.status)}`}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  {event.title}
                </h4>
                <div className="text-xs text-gray-500">
                  {event.date} {event.time && `- ${event.time}`}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {event.description}
              </p>
              
              {event.status === 'current' && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-axa-blue h-1.5 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-axa-blue mt-1">En cours de traitement...</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
