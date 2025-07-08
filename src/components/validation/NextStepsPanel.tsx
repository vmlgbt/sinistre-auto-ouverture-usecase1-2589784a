
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, User, Phone, Calendar } from 'lucide-react';

const NextStepsPanel: React.FC = () => {
  const nextSteps = [
    {
      step: 1,
      title: 'Envoi du courrier au client',
      status: 'pending',
      description: 'Confirmer la réception du sinistre et demander les documents manquants',
      deadline: 'Aujourd\'hui',
      responsible: 'Marie Dupont'
    },
    {
      step: 2,
      title: 'Réception des documents',
      status: 'waiting',
      description: 'Attendre la réception du constat amiable et des pièces justificatives',
      deadline: '15/07/2025',
      responsible: 'Client'
    },
    {
      step: 3,
      title: 'Expertise du véhicule',
      status: 'scheduled',
      description: 'Rendez-vous avec l\'expert pour évaluation des dommages',
      deadline: '18/07/2025',
      responsible: 'Expert AXA'
    },
    {
      step: 4,
      title: 'Traitement de l\'indemnisation',
      status: 'future',
      description: 'Calcul et versement de l\'indemnité (650€ après franchise)',
      deadline: '25/07/2025',
      responsible: 'Service Comptabilité'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'waiting':
        return <Clock className="w-4 h-4 text-blue-500" />;
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
      case 'waiting':
        return <Badge className="bg-blue-100 text-blue-800">En attente</Badge>;
      case 'scheduled':
        return <Badge className="bg-purple-100 text-purple-800">Planifié</Badge>;
      default:
        return <Badge variant="secondary">À venir</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Prochaines étapes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <div key={index} className="border rounded-lg p-4">
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

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Phone className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Contact prioritaire</h4>
              <p className="text-sm text-blue-700 mt-1">
                Si le client n'envoie pas les documents sous 48h, l'appeler pour relance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepsPanel;
