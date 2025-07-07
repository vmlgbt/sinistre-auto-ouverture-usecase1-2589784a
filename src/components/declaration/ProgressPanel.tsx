import React from 'react';
import { User, AlertTriangle, Car, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProgressData {
  contexte_client: { completed: number; total: number };
  contexte_sinistre: { completed: number; total: number };
  vehicule_assure: { completed: number; total: number };
}

interface ProgressPanelProps {
  progress: ProgressData;
  managerNotes: string;
  onNotesChange: (notes: string) => void;
}

const ProgressPanel: React.FC<ProgressPanelProps> = ({
  progress,
  managerNotes,
  onNotesChange
}) => {
  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getProgressColor = (completed: number, total: number) => {
    const percentage = getProgressPercentage(completed, total);
    if (percentage === 100) return 'bg-axa-blue';
    if (percentage > 0) return 'bg-axa-blue-light';
    return 'bg-gray-300';
  };

  const progressItems = [
    {
      title: 'Contexte Client',
      icon: User,
      ...progress.contexte_client
    },
    {
      title: 'Contexte Sinistre',
      icon: AlertTriangle,
      ...progress.contexte_sinistre
    },
    {
      title: 'Véhicule Assuré',
      icon: Car,
      ...progress.vehicule_assure
    }
  ];

  return (
    <div className="space-y-6 h-full">
      {/* Progress Tracking */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2 text-axa-blue" />
            Avancement des questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressItems.map((item) => {
            const Icon = item.icon;
            const percentage = getProgressPercentage(item.completed, item.total);
            
            return (
              <div key={item.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.completed}/{item.total}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.completed, item.total)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="text-xs text-gray-500">
                  {percentage === 100 ? '✓ Terminé' : percentage > 0 ? 'En cours...' : 'Non commencé'}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Manager Notes */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            Notes du gestionnaire
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex flex-col flex-1">
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Remarques et observations
            </Label>
            <Textarea
              value={managerNotes}
              onChange={(e) => onNotesChange(e.target.value)}
              className="flex-1 resize-none"
              placeholder="Ajoutez vos notes et observations ici..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPanel;
