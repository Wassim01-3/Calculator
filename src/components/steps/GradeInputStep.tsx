import { useState, useMemo } from 'react';
import { StepCard } from '@/components/StepCard';
import { GradeInput } from '@/components/GradeInput';
import { Subject, GradeInput as GradeInputType } from '@/types/grades';
import { getRequiredInputs, getInputLabel, getFormulaDescription, calculateSubjectAverage, isSubjectComplete, calculatePreviewResults } from '@/utils/calculations';
import { CalculationResult } from '@/types/grades';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calculator, Check, TrendingUp, Link2 } from 'lucide-react';
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

  // Flexible validation: Calculate if all *groups* are satisfied
  const canCalculate = useMemo(() => {
    // 1. All subjects without a group must be complete
    const independentSubjectsComplete = subjects
      .filter(s => !s.optionalGroup)
      .every(isSubjectComplete);

    // 2. All groups must have at least one complete subject
    const groups = new Set(subjects.map(s => s.optionalGroup).filter(Boolean));
    const groupsComplete = Array.from(groups).every(group => {
      const groupSubjects = subjects.filter(s => s.optionalGroup === group);
      return groupSubjects.some(isSubjectComplete);
    });

    return independentSubjectsComplete && groupsComplete;
  }, [subjects]);

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
      <div className="flex gap-1 overflow-x-auto pb-2 pt-6 scrollbar-hide items-end px-1 justify-center">
        {subjects.map((subject, index) => {
          const complete = isSubjectComplete(subject);
          const nextSubject = subjects[index + 1];
          const isConnected = nextSubject && subject.optionalGroup && nextSubject.optionalGroup === subject.optionalGroup;

          return (
            <div key={index} className="flex items-center relative">
              <button
                onClick={() => setCurrentSubjectIndex(index)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all relative z-10',
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
              {isConnected && (
                <div className="absolute left-[90%] bottom-[80%] w-6 h-6 flex items-center justify-center pointer-events-none z-0">
                  {/* Link Icon centered */}
                  <div className="bg-background relative z-10 px-0.5 rounded-full">
                    <Link2 className="w-2.5 h-2.5 text-muted-foreground/70 -rotate-45" />
                  </div>

                  {/* Connecting Arcs */}
                  <svg className="absolute w-10 h-5 text-muted-foreground/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] overflow-visible" viewBox="0 0 40 20">
                    {/* Left Arc */}
                    <path d="M 0 20 C 5 5, 15 5, 20 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Right Arc */}
                    <path d="M 20 10 C 25 5, 35 5, 40 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
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
            <div className="flex flex-row items-start justify-between gap-4 mb-4">
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
                  'bg-card/80 rounded-lg p-3 flex-shrink-0 border text-right',
                  previewResult.generalAverage >= 10
                    ? 'bg-success/5 border-success/20'
                    : 'bg-destructive/5 border-destructive/20'
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
                  'text-2xl font-extrabold tracking-tight text-right',
                  previewResult.generalAverage >= 10 ? 'text-success' : 'text-destructive'
                )}>
                  {previewResult.generalAverage.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground text-right">/20</div>
              </motion.div>
            </div>
          </div>

          {/* Grade inputs */}
          {(() => {
            const isLocked = (() => {
              if (!currentSubject.optionalGroup) return false;
              // Check if any peer in the same group has inputs
              return subjects.some(s =>
                s.name !== currentSubject.name &&
                s.optionalGroup === currentSubject.optionalGroup &&
                getRequiredInputs(s.formula).some(k => s.inputs[k] !== undefined && s.inputs[k] !== null && s.inputs[k] !== 0) // Treat 0 as active input? Usually yes.
              );
            })();

            return (
              <div className="relative">
                {isLocked && (
                  <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-xl border border-muted">
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Option Locked
                    </span>
                    <span className="text-xs text-muted-foreground mt-2 text-center max-w-[200px]">
                      Clear the other optional subject to enable this one.
                    </span>
                  </div>
                )}
                <div className={cn("grid gap-4 sm:grid-cols-2", isLocked && "opacity-40 pointer-events-none")}>
                  {requiredInputs.map((input) => (
                    <GradeInput
                      key={input}
                      label={getInputLabel(input)}
                      value={currentSubject.inputs[input]}
                      onChange={(value) => onUpdateGrade(currentSubjectIndex, input, value)}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

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

            <div className="flex gap-2">
              {canCalculate && (
                <Button
                  onClick={onCalculate}
                  className={cn(
                    'transition-all',
                    'bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary'
                  )}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculer
                </Button>
              )}

              {currentSubjectIndex < subjects.length - 1 && (
                <Button onClick={goToNext} className={cn("bg-primary hover:bg-primary/90", canCalculate && "bg-muted text-muted-foreground hover:bg-muted/80 backdrop-blur-sm")}>
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
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
