
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Euro, Shield, Info, Sparkle, FileText, Car } from 'lucide-react';

const SinisterAnalysisCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700 text-xl">
          <Sparkle className="w-6 h-6 mr-2 text-blue-500" />
          Analyse complète du sinistre par IA
          <Sparkle className="w-5 h-5 ml-2 text-purple-500" />
        </CardTitle>
        <div className="flex items-center text-sm text-blue-600 mt-2">
          <Sparkle className="w-4 h-4 mr-1" />
          Évaluation automatique réalisée par intelligence artificielle
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Garantie et Couverture */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start mb-3">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-lg">Sinistre garanti - Dommages Tous Accidents</h4>
              <p className="text-sm text-green-700 mt-1">
                Cette garantie couvre les dommages matériels causés à votre véhicule lors d'un accident de parking avec tiers non identifié.
              </p>
            </div>
          </div>
        </div>

        {/* Évaluation des dommages */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Évaluation détaillée des dommages
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Lieu du sinistre :</span>
                <span className="text-sm font-medium text-blue-900">Parking Carrefour Montigny (78300)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Type de sinistre :</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Accident de parking</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Gravité évaluée :</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Moyenne</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Parties endommagées :</span>
                <span className="text-sm font-medium text-blue-900">Rétroviseur droit, Aile avant droite</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Estimation totale :</span>
                <div className="flex items-center text-blue-900 font-bold text-lg">
                  <Euro className="w-4 h-4 mr-1" />
                  800€
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <h5 className="font-medium mb-2 text-blue-900">Détail des dommages identifiés :</h5>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Rétroviseur droit - Cassé (boîtier et miroir)</li>
              <li>• Aile avant droite - Rayure longue</li>
            </ul>
          </div>
        </div>

        {/* État du véhicule */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center text-gray-900">
            <Car className="w-5 h-5 mr-2" />
            État général du véhicule
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-gray-700">Véhicule roulant</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                <span className="font-semibold text-green-800">Oui</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-gray-700">Evalocar</span>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-blue-600" />
                <span className="font-semibold text-blue-800">Réparable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Franchise et indemnisation */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start mb-3">
            <Info className="w-5 h-5 mr-2 text-orange-600 mt-0.5" />
            <h4 className="font-semibold text-orange-900">Calcul de l'indemnisation</h4>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-orange-700 bg-orange-100 p-3 rounded">
              <strong>Garantie activée :</strong> Dommages Tous Accidents (sans impact bonus/malus)<br/>
              <strong>Franchise contractuelle :</strong> 150€ applicable
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant des dégâts estimés :</span>
                  <span className="font-medium">800 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Franchise à déduire :</span>
                  <span className="font-medium">- 150 €</span>
                </div>
                <hr className="border-orange-200" />
                <div className="flex justify-between font-bold text-orange-900 text-lg">
                  <span>Indemnisation nette :</span>
                  <div className="flex items-center">
                    <Euro className="w-4 h-4 mr-1" />
                    <span>650 €</span>
                  </div>
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

export default SinisterAnalysisCard;
