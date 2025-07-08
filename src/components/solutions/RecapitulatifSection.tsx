
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Euro, Shield, Info, Sparkle } from 'lucide-react';

const RecapitulatifSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-green-700 text-xl">
          <CheckCircle className="w-6 h-6 mr-2" />
          Sinistre garanti - Dommages Tous Accidents
          <Sparkle className="w-5 h-5 ml-2 text-blue-500" />
        </CardTitle>
        <div className="flex items-center text-sm text-blue-600 mt-2">
          <Sparkle className="w-4 h-4 mr-1" />
          Analyse réalisée par IA
        </div>
        <p className="text-base pt-2 text-gray-600">
          Suite aux informations saisies, nous confirmons que votre sinistre est bien garanti par votre contrat d'assurance au titre de la garantie "Dommages Tous Accidents".
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Coverage Information */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="w-5 h-5 mr-2 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Garantie Dommages Tous Accidents</h4>
              <p className="text-sm text-green-700 mt-1">
                Cette garantie couvre les dommages matériels causés à votre véhicule lors d'un accident de parking avec tiers non identifié, incluant les dégâts de rétroviseur et carrosserie.
              </p>
            </div>
          </div>
        </div>

        {/* Damage Assessment */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3">Évaluation des dommages</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Lieu du sinistre :</span>
              <span className="text-sm font-medium text-blue-900">Parking Carrefour Montigny (78300)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Parties endommagées :</span>
              <span className="text-sm font-medium text-blue-900">Rétroviseur droit, Aile avant droite</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Type de dommages :</span>
              <span className="text-sm font-medium text-blue-900">Rétroviseur cassé, Rayure longue</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">État du véhicule :</span>
              <span className="text-sm font-medium text-blue-900">Roulant, aucun voyant ni fuite</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Estimation des réparations :</span>
              <div className="flex items-center text-blue-900 font-bold">
                <Euro className="w-4 h-4 mr-1" />
                800
              </div>
            </div>
          </div>
        </div>

        {/* Franchise Details */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start mb-3">
            <Info className="w-5 h-5 mr-2 text-orange-600 mt-0.5" />
            <h4 className="font-semibold text-orange-900">Détails de la franchise - Dommages Tous Accidents</h4>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-orange-700 bg-orange-100 p-2 rounded">
              <strong>Type de sinistre :</strong> Accident de parking avec tiers non identifié<br/>
              <strong>Garantie activée :</strong> Dommages Tous Accidents (sans bonus/malus)
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700">Franchise contractuelle :</span>
              <div className="flex items-center text-orange-900 font-bold">
                <Euro className="w-4 h-4 mr-1" />
                150
              </div>
            </div>
            
            <div className="bg-white rounded p-3 border border-orange-200">
              <div className="text-xs text-orange-700 mb-2">Calcul de l'indemnisation :</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant des dégâts estimés :</span>
                  <span className="font-medium">800 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Franchise à déduire :</span>
                  <span className="font-medium">- 150 €</span>
                </div>
                <hr className="border-orange-200" />
                <div className="flex justify-between font-bold text-orange-900">
                  <span>Indemnisation nette :</span>
                  <span>650 €</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-orange-600 space-y-1">
              <p>• La franchise reste à votre charge et sera déduite du montant de l'indemnisation</p>
              <p>• Aucun impact sur votre bonus/malus (sinistre sans responsabilité)</p>
              <p>• Possibilité de règlement direct au réparateur agréé</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecapitulatifSection;
