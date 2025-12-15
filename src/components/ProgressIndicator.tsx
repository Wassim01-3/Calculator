import { cn } from '@/lib/utils';
import { WizardStep } from '@/types/grades';
import { Check, GraduationCap, BookOpen, Calendar, Edit3, Trophy } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
}

const steps: { id: WizardStep; label: string; icon: React.ElementType }[] = [
  { id: 'year', label: 'Année', icon: GraduationCap },
  { id: 'specialization', label: 'Filière', icon: BookOpen },
  { id: 'semester', label: 'Semestre', icon: Calendar },
  { id: 'grades', label: 'Notes', icon: Edit3 },
  { id: 'results', label: 'Résultats', icon: Trophy },
];

export const ProgressIndicator = ({ currentStep, completedSteps }: ProgressIndicatorProps) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="relative">
      {/* Background line */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />
      
      {/* Progress line */}
      <div
        className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700 ease-out"
        style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPast = index < currentIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                'flex flex-col items-center transition-all duration-300',
                index <= currentIndex ? 'opacity-100' : 'opacity-40'
              )}
            >
              {/* Step circle */}
              <div
                className={cn(
                  'relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500',
                  isCompleted && 'bg-success glow-success',
                  isCurrent && !isCompleted && 'bg-primary animate-pulse-glow',
                  !isCurrent && !isCompleted && 'bg-muted',
                  isPast && !isCompleted && 'bg-primary/50'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-success-foreground animate-bounce-in" />
                ) : (
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'
                    )}
                  />
                )}

                {/* Pulse ring for current step */}
                {isCurrent && !isCompleted && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'mt-3 text-xs font-medium transition-colors hidden sm:block',
                  isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
