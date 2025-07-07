
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import type { VerificationData } from '@/pages/Verification';

interface VerificationFormProps {
  data: VerificationData;
  onDataChange: (sectionKey: keyof VerificationData, questionId: string, newAnswer: string | string[]) => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ data, onDataChange }) => {
  const handleInputChange = (sectionKey: keyof VerificationData, questionId: string, value: string) => {
    onDataChange(sectionKey, questionId, value);
  };

  const handleMultiSelectChange = (sectionKey: keyof VerificationData, questionId: string, option: string) => {
    const currentQuestion = data[sectionKey].questions.find(q => q.id === questionId);
    const currentValues = Array.isArray(currentQuestion?.answer) ? currentQuestion.answer : [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter(v => v !== option)
      : [...currentValues, option];
    onDataChange(sectionKey, questionId, newValues);
  };

  const renderQuestion = (sectionKey: keyof VerificationData, question: any) => {
    const isAnswered = question.answer && (Array.isArray(question.answer) ? question.answer.length > 0 : question.answer !== '');
    
    return (
      <div key={question.id} className="p-4 border rounded-lg bg-white space-y-3">
        <div className="flex items-start justify-between">
          <Label className="text-sm font-medium text-gray-900 flex-1">
            {question.question}
          </Label>
          <div className="flex items-center space-x-2 ml-4">
            {question.isAutoFilled && isAnswered && (
              <div className="flex items-center text-xs text-purple-600">
                <Sparkles className="w-3 h-3 mr-1" />
                IA
              </div>
            )}
            {isAnswered ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-orange-500" />
            )}
          </div>
        </div>

        {/* Render input based on question type */}
        {question.id === '5' || question.id === '7' ? (
          // Multi-select questions
          <div className="space-y-2">
            {['Pare-choc avant', 'Pare-choc arrière', 'Aile avant droite', 'Aile avant gauche', 'Portière droite', 'Portière gauche', 'Capot', 'Coffre'].map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={Array.isArray(question.answer) && question.answer.includes(option)}
                  onCheckedChange={() => handleMultiSelectChange(sectionKey, question.id, option)}
                />
                <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        ) : (
          // Text/number input
          <Input
            type={question.id === '6' ? 'number' : 'text'}
            value={Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}
            onChange={(e) => handleInputChange(sectionKey, question.id, e.target.value)}
            placeholder="Votre réponse..."
            className={question.isAutoFilled && isAnswered ? 'bg-purple-50 border-purple-200' : ''}
          />
        )}

        {question.isAutoFilled && isAnswered && (
          <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded border border-purple-100">
            Cette réponse a été complétée automatiquement par l'IA à partir de la conversation
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Vérification et modification des données</CardTitle>
        <p className="text-sm text-gray-600">
          Vérifiez les informations saisies automatiquement et complétez les champs manquants
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(data).map(([sectionKey, section]) => (
            <div key={sectionKey} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.questions.map(question => 
                  renderQuestion(sectionKey as keyof VerificationData, question)
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
