
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Car, Euro } from 'lucide-react';

const ClientVehicleData: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2 text-green-600" />
          Données client / véhicule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Data */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Informations client
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nom :</span>
                <span className="font-medium">Marc Dubois</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">N° d'assurance :</span>
                <span className="font-medium">123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contrat :</span>
                <span className="font-medium">Auto Essentiel Plus</span>
              </div>
            </div>
          </div>

          {/* Vehicle Data */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Informations véhicule
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Marque / Modèle :</span>
                <span className="font-medium">Peugeot 308</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Immatriculation :</span>
                <span className="font-medium">AB-123-CD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kilométrage :</span>
                <span className="font-medium">Au-dessus de 42 000 KM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">État :</span>
                <span className="font-medium text-green-600">Roulant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Damage Assessment */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-3">Évaluation des dommages</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700 font-medium mb-2">Parties endommagées :</p>
                <ul className="space-y-1 text-blue-600">
                  <li>• Rétroviseur droit (cassé)</li>
                  <li>• Aile avant droite (rayure longue)</li>
                </ul>
              </div>
              <div>
                <p className="text-blue-700 font-medium mb-2">Estimation :</p>
                <div className="flex items-center text-blue-900 font-bold text-lg">
                  <Euro className="w-4 h-4 mr-1" />
                  800
                </div>
                <p className="text-xs text-blue-600 mt-1">Franchise 150€ déduite</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientVehicleData;
