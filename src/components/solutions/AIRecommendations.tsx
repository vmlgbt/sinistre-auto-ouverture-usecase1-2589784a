
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';

const AIRecommendations: React.FC = () => {
  const recommendations = [
    {
      type: 'security',
      icon: AlertTriangle,
      title: 'Sécurité du véhicule',
      content: 'Considérez un système d\'alarme ou de surveillance pour éviter de futurs actes de vandalisme.',
      priority: 'Moyenne'
    },
    {
      type: 'insurance',
      icon: TrendingUp,
      title: 'Optimisation garanties',
      content: 'Votre profil indique une utilisation urbaine. La garantie "Protection juridique" pourrait être intéressante.',
      priority: 'Faible'
    },
    {
      type: 'prevention',
      icon: Lightbulb,
      title: 'Conseils de prévention',
      content: 'Stationnement dans des zones éclairées et surveillées recommandé pour réduire les risques.',
      priority: 'Haute'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute':
        return 'bg-red-100 text-red-800';
      case 'Moyenne':
        return 'bg-orange-100 text-orange-800';
      case 'Faible':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          Recommandations IA personnalisées
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-gray-600" />
                  <h4 className="font-medium">{rec.title}</h4>
                </div>
                <Badge variant="secondary" className={getPriorityColor(rec.priority)}>
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{rec.content}</p>
            </div>
          );
        })}
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-purple-800 mb-2">Score de risque client</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Basé sur votre profil et historique</span>
            <Badge className="bg-green-100 text-green-800">Faible risque</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
