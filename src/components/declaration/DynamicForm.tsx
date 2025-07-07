
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import type { Question, Answer } from '@/pages/Declaration';

interface DynamicFormProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  onAnswerChange: (questionId: string, value: string | string[]) => void;
  onQuestionChange: (index: number) => void;
  isAutoMode?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  questions,
  currentQuestionIndex,
  answers,
  onAnswerChange,
  onQuestionChange,
  isAutoMode = false
}) => {
  const currentQuestionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current question with slower scroll
  useEffect(() => {
    if (currentQuestionRef.current) {
      currentQuestionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Add custom slow scroll effect
      const scrollContainer = currentQuestionRef.current.closest('.scroll-area-viewport') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.style.scrollBehavior = 'smooth';
        scrollContainer.style.scrollPaddingTop = '2rem';
      }
    }
  }, [currentQuestionIndex]);

  const handleSelectChange = (questionId: string, value: string) => {
    onAnswerChange(questionId, value);
  };

  const handleMultiSelectChange = (questionId: string, value: string) => {
    const currentAnswer = answers.find(a => a.questionId === questionId);
    const currentValues = (currentAnswer?.value as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onAnswerChange(questionId, newValues);
  };

  const renderQuestionInput = (question: Question) => {
    const currentAnswer = answers.find(a => a.questionId === question.id);
    const isAnswered = !!currentAnswer;
    const isCurrent = questions.indexOf(question) === currentQuestionIndex;

    switch (question.type) {
      case 'text':
      case 'number':
        return (
          <Input
            type={question.type === 'number' ? 'number' : 'text'}
            value={(currentAnswer?.value as string) || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            placeholder={question.type === 'number' ? "Entrez un nombre..." : "Votre réponse..."}
            className={`w-full ${isAnswered && isAutoMode ? 'bg-purple-50 border-purple-200' : ''}`}
            disabled={isAutoMode && !isCurrent}
          />
        );

      case 'select':
        return (
          <RadioGroup
            value={(currentAnswer?.value as string) || ''}
            onValueChange={(value) => handleSelectChange(question.id, value)}
            disabled={isAutoMode && !isCurrent}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={option} 
                  id={`${question.id}-${option}`}
                  className={isAutoMode && isAnswered ? "text-purple-600" : "text-blue-600"}
                />
                <Label 
                  htmlFor={`${question.id}-${option}`}
                  className="flex-1 cursor-pointer text-sm font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multi-select':
        const selectedValues = (currentAnswer?.value as string[]) || [];
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={() => handleMultiSelectChange(question.id, option)}
                  disabled={isAutoMode && !isCurrent}
                  className={isAutoMode && isAnswered ? "border-purple-500 data-[state=checked]:bg-purple-500" : ""}
                />
                <Label 
                  htmlFor={`${question.id}-${option}`}
                  className="flex-1 cursor-pointer text-sm font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="h-full max-h-[calc(100vh-200px)] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            {isAutoMode && <Sparkles className="w-5 h-5 mr-2 text-purple-500" />}
            Formulaire dynamique
            {isAutoMode && <span className="text-sm text-purple-600 ml-2">(Mode auto)</span>}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {answers.length} / {questions.length} réponses
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Progress Bar - Fixed with darker blue */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 flex-shrink-0">
          <div
            className="bg-axa-blue h-2 rounded-full transition-all duration-500"
            style={{ width: `${(answers.length / questions.length) * 100}%` }}
          />
        </div>

        {/* Questions List - Fixed height with internal scroll */}
        <div className="flex-1 min-h-0 max-h-[calc(100vh-350px)] overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-6 pr-2">
              {questions.map((question, index) => {
                const currentAnswer = answers.find(a => a.questionId === question.id);
                const isAnswered = !!currentAnswer;
                const isCurrent = index === currentQuestionIndex;
                
                return (
                  <div
                    key={question.id}
                    ref={isCurrent ? currentQuestionRef : null}
                    className={`p-4 border rounded-lg transition-all duration-500 bg-white ${
                      isCurrent 
                        ? 'border-axa-blue border-2' 
                        : isAnswered 
                          ? isAutoMode ? 'border-purple-300' : 'border-axa-blue-light'
                          : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Label className="text-base font-medium text-gray-900 flex items-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold mr-3 ${
                          isAnswered 
                            ? isAutoMode 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-axa-blue text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {index + 1}
                        </span>
                        {question.text}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <div className="flex items-center space-x-2">
                        {isAnswered && (
                          <>
                            {isAutoMode ? (
                              <Sparkles className="w-4 h-4 text-purple-500" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-axa-blue" />
                            )}
                          </>
                        )}
                        {isCurrent && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-axa-blue rounded-full animate-pulse"></div>
                            <span className="text-xs text-axa-blue">En cours</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {renderQuestionInput(question)}
                      
                      {isAnswered && isAutoMode && (
                        <div className="flex items-center justify-between text-xs text-gray-500 bg-purple-50 p-2 rounded border border-purple-100">
                          <span className="flex items-center">
                            <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
                            Rempli automatiquement par l'IA
                          </span>
                          <button className="flex items-center text-purple-600 hover:text-purple-800">
                            <Edit3 className="w-3 h-3 mr-1" />
                            Modifier
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;
