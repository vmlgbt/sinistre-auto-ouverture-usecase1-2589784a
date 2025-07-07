
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar, Mail, Camera, Send } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'available' | 'pending' | 'missing';
}

const DocumentsSection: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [clientEmail, setClientEmail] = useState('');

  const documents: Document[] = [
    {
      id: '1',
      name: 'Constat amiable',
      type: 'PDF',
      date: '15/01/2024',
      size: '2.3 MB',
      status: 'available'
    },
    {
      id: '2',
      name: 'Photos du véhicule',
      type: 'ZIP',
      date: '15/01/2024',
      size: '12.8 MB',
      status: 'available'
    },
    {
      id: '3',
      name: 'Permis de conduire',
      type: 'PDF',
      date: '15/01/2024',
      size: '1.2 MB',
      status: 'available'
    },
    {
      id: '4',
      name: 'Carte grise',
      type: 'PDF',
      date: '15/01/2024',
      size: '0.8 MB',
      status: 'available'
    },
    {
      id: '5',
      name: 'Photos détaillées supplémentaires',
      type: 'Images',
      date: 'En attente',
      size: '-',
      status: 'missing'
    },
    {
      id: '6',
      name: 'Facture de réparation précédente',
      type: 'PDF',
      date: 'En attente',
      size: '-',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
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
      case 'available':
        return 'Disponible';
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
      case 'available':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'missing':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const handleSendPhotoLink = () => {
    if (clientEmail) {
      console.log('Envoi du lien photo à:', clientEmail);
      alert(`Lien d'envoi de photos envoyé avec succès à ${clientEmail}`);
      setShowEmailForm(false);
      setClientEmail('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Pièces justificatives
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowEmailForm(true)}
            className="flex items-center"
          >
            <Camera className="w-4 h-4 mr-2" />
            Demander photos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formulaire d'envoi de lien par email */}
        {showEmailForm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-800 mb-3 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Envoyer un lien photo au client
            </h4>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Email du client"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSendPhotoLink} size="sm">
                <Send className="w-4 h-4 mr-2" />
                Envoyer
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowEmailForm(false)}
              >
                Annuler
              </Button>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Le client recevra un lien sécurisé pour envoyer des photos supplémentaires directement dans le dossier.
            </p>
          </div>
        )}

        {/* Liste des documents */}
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                {getStatusIcon(doc.status)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-600">
                    {doc.type} {doc.date !== 'En attente' && `• ${doc.date}`} {doc.size !== '-' && `• ${doc.size}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={`text-xs ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </Badge>
                
                {doc.status === 'available' && (
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-500 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Résumé des statuts */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">4</div>
            <div className="text-xs text-gray-600">Disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">1</div>
            <div className="text-xs text-gray-600">En attente</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">1</div>
            <div className="text-xs text-gray-600">Manquantes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
