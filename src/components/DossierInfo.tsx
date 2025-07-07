
import React from 'react';
import { User, MapPin, Phone, Calendar, AlertTriangle, Mail, FileText, Camera } from 'lucide-react';

interface DossierInfoProps {
  showOnlyClientInfo?: boolean;
  showOnlyContexte?: boolean;
}

const DossierInfo: React.FC<DossierInfoProps> = ({ 
  showOnlyClientInfo = false, 
  showOnlyContexte = false 
}) => {
  // Si aucune prop spécifique, on affiche tout (comportement par défaut)
  const showClientInfo = showOnlyClientInfo || (!showOnlyClientInfo && !showOnlyContexte);
  const showContexte = showOnlyContexte || (!showOnlyClientInfo && !showOnlyContexte);

  return (
    <div className="space-y-6">
      {/* Coordonnées Client */}
      {showClientInfo && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-axa-blue" />
            Coordonnées Client
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Marc Dubois</p>
                <p className="text-xs text-gray-500">Assuré principal</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Âge</p>
                <p className="text-sm font-medium text-gray-900">50 ans</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>06 12 34 56 78</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>marc.dubois@email.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Dernier contact : 15/01/2024 à 09:30</span>
            </div>
          </div>
        </div>
      )}

      {/* Contexte Sinistre */}
      {showContexte && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-axa-red" />
            Contexte Sinistre
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Description des dommages</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-gray-900">
                  Rétroviseur cassé découvert par l'assuré sur son véhicule. 
                  Dommages visibles : rétroviseur droit complètement détruit, 
                  coque brisée et mécanisme de réglage endommagé.
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Circonstances</p>
              <p className="text-sm text-gray-700">
                L'assuré a retrouvé son véhicule avec le rétroviseur cassé sur un parking public. 
                Véhicule stationné légalement, aucun témoin identifié. 
                Aucun tiers impliqué apparent, probablement acte de vandalisme.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Lieu : Parking public, Rue de la République, 75001 Paris</span>
            </div>

            {/* Actions entreprises par l'agent */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Actions entreprises</p>
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm text-gray-900">Mail envoyé + EDS (Envoi de Demande au Siège)</span>
                </div>
                <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded-lg">
                  <Camera className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm text-gray-900">Photos prises par l'assuré transmises</span>
                </div>
                <div className="flex items-center p-2 bg-purple-50 border border-purple-200 rounded-lg">
                  <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="text-sm text-gray-900">Constat rempli par l'assuré reçu</span>
                </div>
                <div className="flex items-center p-2 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-sm text-gray-900">Dépôt de plainte effectué par l'assuré</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DossierInfo;
