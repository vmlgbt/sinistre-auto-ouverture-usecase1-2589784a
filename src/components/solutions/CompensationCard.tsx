import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Euro, Shield, Car, Sparkle } from 'lucide-react';

const CompensationCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Proposition de dédommagement
          <Sparkle className="w-4 h-4 ml-2 text-purple-600" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
          <div className="flex items-center text-purple-800">
            <Sparkle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Montant calculé automatiquement par l'IA</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-semibold text-green-800">Garantie "Dommages tous accidents" activée</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Montant des réparations</span>
              <span className="font-semibold">800€</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Franchise à déduire</span>
              <span className="font-semibold text-red-600">-150€</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Montant pris en charge</span>
                <div className="flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-green-600" />
                  <span className="font-bold text-xl text-green-600">650€</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Options supplémentaires incluses</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Car className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">Véhicule de remplacement</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">7 jours</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm">Assistance dépannage</span>
              </div>
              <Badge variant="secondary">Incluse</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompensationCard;
