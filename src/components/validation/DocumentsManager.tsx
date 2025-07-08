
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DocumentsManager: React.FC = () => {
  const documentsReceived = [
    { name: 'Photos des dommages', status: 'received', date: 'Reçu le 08/07/2025' },
    { name: 'Déclaration de sinistre', status: 'received', date: 'Reçu le 08/07/2025' },
  ];

  const documentsToRequest = [
    { name: 'Constat amiable', status: 'pending', priority: 'high', date: 'En attente' },
    { name: 'Permis de conduire', status: 'required', priority: 'medium' },
    { name: 'Carte grise du véhicule', status: 'required', priority: 'medium' },
    { name: 'Relevé d\'identité bancaire', status: 'optional', priority: 'low' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'required':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string, priority?: string) => {
    if (status === 'received') {
      return <Badge className="bg-green-100 text-green-800">Reçu</Badge>;
    }
    if (status === 'pending') {
      return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>;
    }
    if (status === 'required') {
      return priority === 'high' ? 
        <Badge className="bg-red-100 text-red-800">Obligatoire</Badge> :
        <Badge className="bg-blue-100 text-blue-800">Requis</Badge>;
    }
    return <Badge variant="secondary">Optionnel</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Gestion des documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Documents reçus */}
        <div>
          <div className="flex items-center mb-3">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <h4 className="font-medium text-green-800">Documents reçus</h4>
          </div>
          <div className="space-y-3">
            {documentsReceived.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.date}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Documents manquants */}
        <div>
          <div className="flex items-center mb-3">
            <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
            <h4 className="font-medium text-orange-800">Documents manquants</h4>
          </div>
          <div className="space-y-3">
            {documentsToRequest.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium">{doc.name}</p>
                    {doc.date && <p className="text-xs text-gray-500">{doc.date}</p>}
                  </div>
                </div>
                {getStatusBadge(doc.status, doc.priority)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsManager;
