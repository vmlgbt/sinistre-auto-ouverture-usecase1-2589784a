
import React from 'react';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'available' | 'pending' | 'missing';
}

const Documents: React.FC = () => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-axa-blue" />
        Documents
      </h3>
      
      <div className="space-y-3">
        {documents.map((doc) => (
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
              
              {doc.status === 'available' && (
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-500 hover:text-axa-blue">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-axa-blue">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
