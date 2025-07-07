
import React from 'react';
import { Phone, PhoneOff, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TranscriptionPanelProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  isCallActive: boolean;
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({
  transcript,
  onTranscriptChange,
  isCallActive
}) => {
  return (
    <Card className="h-full flex flex-col max-h-[500px]">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-lg flex items-center">
          <Volume2 className="w-5 h-5 mr-2 text-axa-blue" />
          Transcription en temps réel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-3 min-h-0 overflow-hidden">
        {/* Call Status - Fixed */}
        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium text-green-800">
              {isCallActive ? 'Appel en cours' : 'Appel terminé'}
            </span>
          </div>
          <Button
            variant={isCallActive ? "destructive" : "default"}
            size="sm"
            className="flex items-center"
          >
            {isCallActive ? (
              <>
                <PhoneOff className="w-4 h-4 mr-2" />
                Raccrocher
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Rappeler
              </>
            )}
          </Button>
        </div>

        {/* Transcript Content - Increased height */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <label className="text-sm font-medium text-gray-700 mb-2 flex-shrink-0">
            Conversation
          </label>
          <div className="flex-1 border rounded-md overflow-hidden min-h-0">
            <ScrollArea className="h-full max-h-full">
              <div className="p-3">
                <Textarea
                  value={transcript}
                  onChange={(e) => onTranscriptChange(e.target.value)}
                  className="min-h-[200px] resize-none text-sm leading-relaxed border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  placeholder="La transcription de l'appel apparaîtra ici..."
                  readOnly={isCallActive}
                />
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* AI Processing Indicator - Fixed */}
        {isCallActive && (
          <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-800">
                IA en cours d'analyse et de saisie automatique
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptionPanel;
