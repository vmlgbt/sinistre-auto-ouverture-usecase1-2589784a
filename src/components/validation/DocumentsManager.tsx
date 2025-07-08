
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DocumentsManager: React.FC = () => {
  const documentsToRequest = [
    { name: 'Constat amiable', status: 'required', priority: 'high' },
    { name: 'Permis de conduire', status: 'required', priority: 'medium' },
    { name: 'Carte grise du véhicule', status: 'required', priority: 'medium' },
    { name: 'Relevé d\'identité bancaire', status: 'optional', priority: 'low' }
  ];

  const documentsReceived = [
    { name: 'Photos des dommages', status: 'received', date: 'Reçu le 08/07/2025' },
    { name: 'Déclaration de sinistre', status: 'received', date: 'Reçu le 08/07/2025' },
    { name: 'Constat amiable', status: 'pending', date: 'En attente' }
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
    <div className="space-y-6">
      {/* Documents to Request */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            Documents à demander
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documentsToRequest.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <span className="ml-3 text-sm font-medium">{doc.name}</span>
                </div>
                {getStatusBadge(doc.status, doc.priority)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents Received */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Documents reçus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documentsReceived.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsManager;
