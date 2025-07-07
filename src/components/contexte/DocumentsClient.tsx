
import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const DocumentsClient: React.FC = () => {
  const receivedDocuments: Document[] = [
    {
      id: '1',
      name: 'Photos du véhicule',
      type: 'ZIP',
      date: '15/01/2024',
      size: '12.8 MB'
    },
    {
      id: '2',
      name: 'Constat rempli par l\'assuré',
      type: 'PDF',
      date: '15/01/2024',
      size: '2.3 MB'
    },
    {
      id: '3',
      name: 'Dépôt de plainte',
      type: 'PDF',
      date: '15/01/2024',
      size: '1.2 MB'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-axa-blue" />
          Documents Client
        </h3>
        <div className="flex items-center text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {receivedDocuments.length} documents reçus
        </div>
      </div>

      <div className="space-y-3">
        {receivedDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-600">
                  {doc.type} • {doc.date} • {doc.size}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium px-2 py-1 rounded text-green-700 bg-green-100">
                Reçu
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

      {/* Résumé */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{receivedDocuments.length}</div>
          <div className="text-xs text-gray-600">Documents disponibles</div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsClient;
