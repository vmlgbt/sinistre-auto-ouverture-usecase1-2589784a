
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Euro, Shield, FileText } from 'lucide-react';

const EvaluationCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
          Évaluation du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Estimation des dégâts</span>
              <div className="flex items-center">
                <Euro className="w-4 h-4 mr-1 text-green-600" />
                <span className="font-bold text-lg">800€</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Type de sinistre</span>
              <Badge variant="destructive">Vandalisme</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Gravité</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Moyenne</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Franchise applicable</span>
              <span className="font-semibold">150€</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Détail des dommages
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Pare-choc avant - Déformation et rayures profondes</li>
            <li>• Aile avant droite - Bosses et éclats de peinture</li>
            <li>• Phare avant droit - Intact (pas de dommage)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationCard;
