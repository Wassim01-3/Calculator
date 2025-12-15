import { useState, useMemo } from 'react';
import { StepCard } from '@/components/StepCard';
import { GradeInput } from '@/components/GradeInput';
import { Subject, GradeInput as GradeInputType } from '@/types/grades';
import { getRequiredInputs, getInputLabel, getFormulaDescription, calculateSubjectAverage, isSubjectComplete, calculatePreviewResults } from '@/utils/calculations';
import { CalculationResult } from '@/types/grades';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calculator, Check, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GradeInputStepProps {
  subjects: Subject[];
  onUpdateGrade: (subjectIndex: number, field: keyof GradeInputType, value: number) => void;
  onCalculate: () => void;
  onBack: () => void;
  previousResults?: CalculationResult | null;
}

export const GradeInputStep = ({
  subjects,
  onUpdateGrade,
  onCalculate,
  onBack,
  previousResults,
}: GradeInputStepProps) => {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const currentSubject = subjects[currentSubjectIndex];
  const requiredInputs = getRequiredInputs(currentSubject.formula);

  const isCurrentComplete = isSubjectComplete(currentSubject);
  const currentAverage = isCurrentComplete
    ? calculateSubjectAverage(currentSubject.inputs, currentSubject.formula)
    : null;

  const completedCount = subjects.filter(isSubjectComplete).length;
  const progress = (completedCount / subjects.length) * 100;

  // Calculate preview of global average including all subjects (using 0 for missing inputs, or previous average if in edit mode)
  const previewResult = useMemo(() => {
    return calculatePreviewResults(subjects, previousResults);
  }, [subjects, previousResults]);

  const goToNext = () => {
    if (currentSubjectIndex < subjects.length - 1) {
      setCurrentSubjectIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex((prev) => prev - 1);
    }
  };

  const canCalculate = completedCount === subjects.length;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progression</span>
          <span className="text-sm font-medium text-primary">
            {completedCount}/{subjects.length} matières
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>


      {/* Subject navigation pills */}
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {subjects.map((subject, index) => {
          const complete = isSubjectComplete(subject);
          return (
            <button
              key={index}
              onClick={() => setCurrentSubjectIndex(index)}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                index === currentSubjectIndex
                  ? 'bg-primary text-primary-foreground'
                  : complete
                  ? 'bg-success/20 text-success border border-success/30'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {complete && <Check className="w-3 h-3 inline mr-1" />}
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Current subject card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSubjectIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          {/* Subject header */}
          <div className="mb-6">
            <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 text-center sm:text-left">
                <div className="text-xs text-muted-foreground mb-1">
                  Matière {currentSubjectIndex + 1} sur {subjects.length}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {currentSubject.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary">
                    Coef. {currentSubject.coefficient}
                  </span>
                  <span className="text-muted-foreground">
                    {getFormulaDescription(currentSubject.formula)}
                  </span>
                </div>
              </div>
              
              {/* Global average preview card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'glass rounded-lg p-3 flex-shrink-0 w-full sm:w-auto text-right',
                  previewResult.generalAverage >= 10
                    ? 'bg-success/5 border border-success/20'
                    : 'bg-destructive/5 border border-destructive/20'
                )}
              >
                <div className="flex items-center justify-end gap-1.5 mb-1">
                  <TrendingUp className={cn(
                    'w-3.5 h-3.5',
                    previewResult.generalAverage >= 10 ? 'text-success' : 'text-destructive'
                  )} />
                  <span className="text-xs text-muted-foreground font-medium">
                    Moyenne
                  </span>
                </div>
                <div className={cn(
                  'text-2xl font-extrabold tracking-tight',
                  previewResult.generalAverage >= 10 ? 'text-success' : 'text-destructive'
                )}>
                  {previewResult.generalAverage.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">/20</div>
              </motion.div>
            </div>
          </div>

          {/* Grade inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            {requiredInputs.map((input) => (
              <GradeInput
                key={input}
                label={getInputLabel(input)}
                value={currentSubject.inputs[input]}
                onChange={(value) => onUpdateGrade(currentSubjectIndex, input, value)}
              />
            ))}
          </div>

          {/* Live average display */}
          {isCurrentComplete && currentAverage !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                'mt-6 p-4 rounded-xl text-center',
                currentAverage >= 10
                  ? 'bg-success/10 border border-success/30'
                  : 'bg-destructive/10 border border-destructive/30'
              )}
            >
              <div className="text-sm text-muted-foreground mb-1">Moyenne préliminaire</div>
              <div
                className={cn(
                  'text-3xl font-bold',
                  currentAverage >= 10 ? 'text-success' : 'text-destructive'
                )}
              >
                {currentAverage.toFixed(2)}/20
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="ghost"
              onClick={goToPrev}
              disabled={currentSubjectIndex === 0}
              className="text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {currentSubjectIndex < subjects.length - 1 ? (
              <Button onClick={goToNext} className="bg-primary hover:bg-primary/90">
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onCalculate}
                disabled={!canCalculate}
                className={cn(
                  'transition-all',
                  canCalculate
                    ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculer
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-start"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour aux semestres
        </Button>
      </motion.div>
    </div>
  );
};
