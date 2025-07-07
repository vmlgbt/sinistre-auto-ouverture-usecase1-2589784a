
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Clock } from 'lucide-react';

interface ManagerNotesProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

const ManagerNotes: React.FC<ManagerNotesProps> = ({ notes, onNotesChange }) => {
  const currentTime = new Date().toLocaleString('fr-FR');

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Notes du gestionnaire
        </CardTitle>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          Dernière modification: {currentTime}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-col flex-1">
          <Label htmlFor="manager-notes" className="text-sm font-medium mb-2">
            Observations et notes
          </Label>
          <Textarea
            id="manager-notes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Ajoutez vos observations sur le dossier, les points à clarifier, les actions à entreprendre..."
            className="flex-1 min-h-[200px] resize-none"
          />
        </div>

        {/* Quick notes templates */}
        <div className="space-y-2 flex-shrink-0 mt-4">
          <Label className="text-sm font-medium">Notes rapides</Label>
          <div className="space-y-1">
            {[
              "Client coopératif, informations cohérentes",
              "Nécessite expertise complémentaire",
              "Dossier urgent - client mobilité réduite",
              "Vérifier couverture garanties",
              "Demander photos supplémentaires"
            ].map((template, index) => (
              <button
                key={index}
                onClick={() => onNotesChange(notes + (notes ? '\n' : '') + '• ' + template)}
                className="w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded border text-gray-700 transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagerNotes;
