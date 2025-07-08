
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, MapPin, Shield } from 'lucide-react';

const SinisterSummary: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Synthèse des éléments clés du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="w-4 h-4 mr-2 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Date de découverte</p>
                <p className="text-sm text-gray-600">Ce matin vers 10h30</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Lieu du sinistre</p>
                <p className="text-sm text-gray-600">Parking Carrefour Montigny-le-Bretonneux (78300)</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Shield className="w-4 h-4 mr-2 text-green-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Garantie activée</p>
                <p className="text-sm text-gray-600">Dommages Tous Accidents</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">Type de sinistre</p>
              <p className="text-sm text-gray-600">Accident de parking avec tiers non identifié</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-medium text-orange-900 mb-2">Circonstances</h4>
          <p className="text-sm text-orange-700">
            Dommages découverts sur le véhicule après stationnement au parking du centre commercial. 
            Aucun témoin présent. Dégâts sur rétroviseur droit (cassé) et aile avant droite (rayure longue).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SinisterSummary;
