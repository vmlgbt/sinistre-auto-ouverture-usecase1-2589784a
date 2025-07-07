
import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Camera, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'received' | 'pending' | 'missing';
  category: 'essential' | 'supplementary';
}

const DocumentsClient: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('marc.dubois@email.com');

  const documents: Document[] = [
    // Documents reçus
    {
      id: '1',
      name: 'Photos du véhicule',
      type: 'ZIP',
      date: '15/01/2024',
      size: '12.8 MB',
      status: 'received',
      category: 'essential'
    },
    {
      id: '2',
      name: 'Constat rempli par l\'assuré',
      type: 'PDF',
      date: '15/01/2024',
      size: '2.3 MB',
      status: 'received',
      category: 'essential'
    },
    {
      id: '3',
      name: 'Dépôt de plainte',
      type: 'PDF',
      date: '15/01/2024',
      size: '1.2 MB',
      status: 'received',
      category: 'essential'
    },
    // Documents en attente
    {
      id: '4',
      name: 'Photos complémentaires',
      type: 'Images',
      date: 'En attente',
      size: '-',
      status: 'pending',
      category: 'supplementary'
    },
    // Documents manquants
    {
      id: '5',
      name: 'Témoignages',
      type: 'PDF',
      date: 'Non fourni',
      size: '-',
      status: 'missing',
      category: 'supplementary'
    },
    {
      id: '6',
      name: 'Devis de réparation',
      type: 'PDF',
      date: 'Non fourni',
      size: '-',
      status: 'missing',
      category: 'essential'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Calendar className="w-5 h-5 text-yellow-600" />;
      case 'missing':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'received':
        return 'Reçu';
      case 'pending':
        return 'En attente';
      case 'missing':
        return 'Manquant';
      default:
        return 'Inconnu';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'missing':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const handleSendPhotoRequest = () => {
    console.log(`Envoi demande photos à : ${email}`);
    setShowEmailForm(false);
    // Logique d'envoi d'email
  };

  const receivedDocs = documents.filter(doc => doc.status === 'received');
  const pendingDocs = documents.filter(doc => doc.status === 'pending');
  const missingDocs = documents.filter(doc => doc.status === 'missing');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-axa-blue" />
          Documents Client
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="flex items-center"
        >
          <Camera className="w-4 h-4 mr-2" />
          Demander photos
        </Button>
      </div>

      {/* Formulaire envoi email */}
      {showEmailForm && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Envoyer lien photos par email</h4>
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Email du client"
            />
            <Button size="sm" onClick={handleSendPhotoRequest}>
              <Send className="w-4 h-4 mr-1" />
              Envoyer
            </Button>
          </div>
        </div>
      )}

      {/* Documents reçus */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Documents reçus ({receivedDocs.length})
        </h4>
        <div className="space-y-2">
          {receivedDocs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                {getStatusIcon(doc.status)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-600">
                    {doc.type} • {doc.date} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </span>
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-500 hover:text-axa-blue">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-axa-blue">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents en attente */}
      {pendingDocs.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-yellow-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            En attente ({pendingDocs.length})
          </h4>
          <div className="space-y-2">
            {pendingDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-600">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents manquants */}
      {missingDocs.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Documents manquants ({missingDocs.length})
          </h4>
          <div className="space-y-2">
            {missingDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-600">{doc.type} • {doc.date}</p>
                    {doc.category === 'essential' && (
                      <p className="text-xs text-red-600 font-medium">• Requis pour finaliser le dossier</p>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsClient;
