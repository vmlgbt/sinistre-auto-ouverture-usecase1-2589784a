
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Calendar, FileText, Phone, Clock } from 'lucide-react';

const NextSteps: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Prise de rendez-vous garage',
      description: 'Sélectionner un garage partenaire et planifier la réparation',
      status: 'pending',
      deadline: '3 jours',
      icon: Calendar
    },
    {
      id: 2,
      title: 'Photos complémentaires',
      description: 'Fournir des photos détaillées des dommages sous différents angles',
      status: 'pending',
      deadline: '48h',
      icon: FileText
    },
    {
      id: 3,
      title: 'Contact expert AXA',
      description: 'Un expert prendra contact pour valider l\'estimation',
      status: 'pending',
      deadline: '5 jours',
      icon: Phone
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <CheckSquare className="w-5 h-5 mr-2 text-green-600" />
          Prochaines étapes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
                  <h4 className="font-medium text-sm">{step.title}</h4>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge variant="secondary" className={`${getStatusColor(step.status)} text-xs`}>
                    {step.status === 'pending' ? 'À faire' : 'Terminé'}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">{step.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                Délai: {step.deadline}
              </div>
            </div>
          );
        })}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <h4 className="font-medium text-blue-800 mb-2 text-sm">Information importante</h4>
          <p className="text-xs text-blue-600">
            Le traitement de votre dossier ne peut progresser qu'une fois ces étapes complétées. 
            Notre équipe vous accompagne à chaque étape.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSteps;
