
import React from 'react';
import { CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

interface DeclarationSection {
  id: string;
  title: string;
  status: 'completed' | 'partial' | 'missing';
  percentage: number;
}

const DeclarationSummary: React.FC = () => {
  const sections: DeclarationSection[] = [
    {
      id: '1',
      title: 'Informations véhicule',
      status: 'completed',
      percentage: 100
    },
    {
      id: '2', 
      title: 'Circonstances du sinistre',
      status: 'completed',
      percentage: 100
    },
    {
      id: '3',
      title: 'Coordonnées',
      status: 'completed',
      percentage: 100
    },
    {
      id: '4',
      title: 'Témoins',
      status: 'partial',
      percentage: 60
    },
    {
      id: '5',
      title: 'Déclaration adversaire',
      status: 'missing',
      percentage: 0
    }
  ];

  const globalPercentage = Math.round(
    sections.reduce((acc, section) => acc + section.percentage, 0) / sections.length
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'missing':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100';
      case 'partial':
        return 'text-yellow-700 bg-yellow-100';
      case 'missing':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'partial':
        return 'Partiel';
      case 'missing':
        return 'Manquant';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2 text-axa-blue" />
        Résumé de Déclaration
      </h3>
      
      {/* Pourcentage global */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Complétude globale</span>
          <span className="text-2xl font-bold text-axa-blue">{globalPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-axa-blue h-3 rounded-full transition-all duration-300"
            style={{ width: `${globalPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Détail par section */}
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              {getStatusIcon(section.status)}
              <span className="ml-3 text-sm font-medium text-gray-900">{section.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{section.percentage}%</span>
              <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(section.status)}`}>
                {getStatusText(section.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Informations collectées */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Informations pré-collectées</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Véhicule : Peugeot 308 (AB-123-CD)</li>
          <li>• Type de sinistre : Vandalisme - Rétroviseur</li>
          <li>• Lieu : Parking public, Paris 1er</li>
          <li>• Contact établi le 15/01/2024 à 09:30</li>
        </ul>
      </div>
    </div>
  );
};

export default DeclarationSummary;
