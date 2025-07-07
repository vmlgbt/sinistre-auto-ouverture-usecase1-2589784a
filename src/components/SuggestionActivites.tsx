
import React from 'react';
import { Phone, FileText, Camera, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const SuggestionActivites: React.FC = () => {
  const suggestions = [
    {
      id: '1',
      title: 'Contacter l\'assuré',
      description: 'Prendre contact avec Marc Dubois dans les 2h',
      icon: Phone,
      priority: 'high',
      deadline: '2h'
    },
    {
      id: '2',
      title: 'Demander des photos',
      description: 'Solliciter des photos des dommages par email/SMS',
      icon: Camera,
      priority: 'high',
      deadline: '24h'
    },
    {
      id: '3',
      title: 'Vérifier le lieu',
      description: 'Confirmer l\'adresse du sinistre et les circonstances',
      icon: MapPin,
      priority: 'medium',
      deadline: '48h'
    },
    {
      id: '4',
      title: 'Planifier expertise',
      description: 'Organiser le passage d\'un expert selon les dommages',
      icon: FileText,
      priority: 'medium',
      deadline: '3 jours'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-700';
      case 'medium':
        return 'text-orange-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-axa-blue" />
          Actions recommandées
        </h3>
        <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
          Nouveau dossier
        </span>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className={`border rounded-lg p-4 ${getPriorityColor(suggestion.priority)} hover:shadow-sm transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-0.5">
                  <suggestion.icon className={`w-4 h-4 ${getPriorityTextColor(suggestion.priority)}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {suggestion.description}
                  </p>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-xs text-gray-500 mb-1">
                  À faire sous {suggestion.deadline}
                </div>
                <button className="p-1 hover:bg-white rounded-full transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 hover:text-green-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>4 actions en attente</span>
          <button className="text-axa-blue hover:text-axa-blue-dark font-medium">
            Voir tout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionActivites;
