
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, User, Phone, Calendar, FileText, AlertTriangle } from 'lucide-react';

const NextStepsClient: React.FC = () => {
  // Vérifier si la validation est terminée pour adapter les étapes
  const isValidationCompleted = localStorage.getItem('validationCompleted') === 'true';

  const nextSteps = [
    {
      step: 1,
      title: 'Suivi des documents manquants',
      status: isValidationCompleted ? 'pending' : 'future',
      description: 'Relancer le client pour l\'envoi du constat amiable et des documents requis',
      deadline: isValidationCompleted ? 'Dans 48h' : 'À planifier',
      responsible: 'Gestionnaire',
      priority: 'high'
    },
    {
      step: 2,
      title: 'Appel client de relance',
      status: isValidationCompleted ? 'scheduled' : 'future',
      description: 'Contact téléphonique si les documents ne sont pas reçus sous 48h',
      deadline: isValidationCompleted ? '10/07/2025' : 'À définir',
      responsible: 'Gestionnaire',
      priority: 'medium'
    },
    {
      step: 3,
      title: 'Planification expertise',
      status: 'future',
      description: 'Rendez-vous avec l\'expert pour évaluation des dommages une fois les documents reçus',
      deadline: '18/07/2025',
      responsible: 'Expert AXA',
      priority: 'medium'
    },
    {
      step: 4,
      title: 'Traitement de l\'indemnisation',
      status: 'future',
      description: 'Calcul et versement de l\'indemnité (650€ après franchise)',
      deadline: '25/07/2025',
      responsible: 'Service Comptabilité',
      priority: 'low'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">En cours</Badge>;
      case 'scheduled':
        return <Badge className="bg-purple-100 text-purple-800">Planifié</Badge>;
      default:
        return <Badge variant="secondary">À venir</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-orange-500';
      default:
        return 'border-l-4 border-l-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Prochaines étapes - Gestionnaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(step.priority)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  {getStatusIcon(step.status)}
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">
                      Étape {step.step}: {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
                {getStatusBadge(step.status)}
              </div>
              
              <div className="ml-7 mt-3 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {step.responsible}
                </div>
                <div className="flex items-center font-medium">
                  <Calendar className="w-3 h-3 mr-1" />
                  {step.deadline}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isValidationCompleted && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">Action prioritaire</h4>
                <p className="text-sm text-red-700 mt-1">
                  Le constat amiable est manquant. Contacter le client sous 48h pour éviter tout retard dans le traitement du dossier.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Phone className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Contact client</h4>
              <p className="text-sm text-blue-700 mt-1">
                Marc Dubois - 06 12 34 56 78
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Dernière prise de contact : Validation gestionnaire (08/07/2025)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepsClient;
