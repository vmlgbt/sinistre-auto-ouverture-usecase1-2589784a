import React from 'react';
import { Shield, Car, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ContractInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Informations Contrat */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-axa-blue" />
            Contrat Auto
          </h3>
          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
            Actif
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">N° Contrat</p>
            <p className="text-sm text-gray-900 font-mono">AUTO-2023-567890</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Échéance</p>
            <p className="text-sm text-gray-900">31/12/2024</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Formule</p>
            <p className="text-sm text-gray-900">Tous Risques Plus</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Prime annuelle</p>
            <p className="text-sm text-gray-900">1 248€</p>
          </div>
        </div>
      </div>

      {/* Véhicule Assuré */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Car className="w-5 h-5 mr-2 text-axa-blue" />
          Véhicule Assuré
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-lg font-semibold text-gray-900">Peugeot 308</p>
              <p className="text-sm text-gray-600">1.6 BlueHDi 120ch - Berline</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Année</p>
              <p className="text-lg font-semibold text-gray-900">2020</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Immatriculation</p>
              <p className="text-sm text-gray-900 font-mono">AB-123-CD</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Valeur à neuf</p>
              <p className="text-sm text-gray-900">28 500€</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Valeur actuelle</p>
              <p className="text-sm text-gray-900">18 200€</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Kilométrage</p>
              <p className="text-sm text-gray-900">67 500 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Garanties Applicables */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-axa-blue" />
          Garanties Applicables
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Dommages tous accidents</p>
                <p className="text-xs text-gray-600">Franchise : 300€</p>
              </div>
            </div>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
              Acquise
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Vol et tentative de vol</p>
                <p className="text-xs text-gray-600">Franchise : 500€</p>
              </div>
            </div>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
              Acquise
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Protection juridique</p>
                <p className="text-xs text-gray-600">Plafond : 50 000€</p>
              </div>
            </div>
            <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
              Applicable
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Véhicule de remplacement</p>
                <p className="text-xs text-gray-600">Non souscrite</p>
              </div>
            </div>
            <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
              Non acquise
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
