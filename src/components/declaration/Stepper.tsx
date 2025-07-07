
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Déclaration',
      isCompleted: currentStep > 1,
      isCurrent: currentStep === 1
    },
    {
      number: 2,
      title: 'Récapitulatif',
      isCompleted: currentStep > 2,
      isCurrent: currentStep === 2
    },
    {
      number: 3,
      title: 'Solution',
      isCompleted: currentStep > 3,
      isCurrent: currentStep === 3
    },
    {
      number: 4,
      title: 'Validation',
      isCompleted: currentStep > 4,
      isCurrent: currentStep === 4
    }
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-6">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.isCompleted
                  ? 'bg-green-500 text-white'
                  : step.isCurrent
                  ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                `0${step.number}`
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                step.isCurrent
                  ? 'text-blue-600'
                  : step.isCompleted
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              {step.title}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-4 transition-colors duration-300 ${
                step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
