import { AnimatePresence, motion } from 'framer-motion';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { YearSelection } from '@/components/steps/YearSelection';
import { SpecializationSelection } from '@/components/steps/SpecializationSelection';
import { SemesterSelection } from '@/components/steps/SemesterSelection';
import { GradeInputStep } from '@/components/steps/GradeInputStep';
import { ResultsDisplay } from '@/components/steps/ResultsDisplay';
import { useWizard } from '@/hooks/useWizard';
import { Copyright } from 'lucide-react';
import { FaAndroid } from 'react-icons/fa';

const GradeCalculator = () => {
  const {
    state,
    currentStep,
    completedSteps,
    setYear,
    setSpecialization,
    setSemester,
    updateSubjectGrade,
    calculateAllResults,
    goBack,
    reset,
    goToStep,
  } = useWizard();

  return (
    <div className="min-h-screen relative">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8 flex flex-col items-center gap-4 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient-primary mb-2">
            Calculateur de Moyenne
          </h1>
          <p className="text-muted-foreground">
            Calculez votre moyenne semestrielle en quelques clics
          </p>
          <a
            href="https://example.com/download.apk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-5 py-2.5 shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-green-500/50 transition"
          >
            <FaAndroid className="w-4 h-4" />
            <span className="font-semibold">Download APK</span>
          </a>
        </motion.div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto px-4">
          <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-4 pb-4 sm:pb-12 pt-8">
        <AnimatePresence mode="wait">
          {currentStep === 'year' && (
            <motion.div key="year">
              <YearSelection selectedYear={state.year} onSelect={setYear} />
            </motion.div>
          )}

          {currentStep === 'specialization' && state.year && (
            <motion.div key="specialization">
              <SpecializationSelection
                year={state.year}
                selectedSpecialization={state.specialization}
                onSelect={setSpecialization}
                onBack={goBack}
              />
            </motion.div>
          )}

          {currentStep === 'semester' && (
            <motion.div key="semester">
              <SemesterSelection
                selectedSemester={state.semester}
                year={state.year}
                specialization={state.specialization}
                onSelect={setSemester}
                onBack={goBack}
              />
            </motion.div>
          )}

          {currentStep === 'grades' && state.subjects.length > 0 && (
            <motion.div key="grades">
              <GradeInputStep
                subjects={state.subjects}
                onUpdateGrade={updateSubjectGrade}
                onCalculate={calculateAllResults}
                onBack={goBack}
                previousResults={state.results}
              />
            </motion.div>
          )}

          {currentStep === 'results' && state.results && (
            <motion.div key="results">
              <ResultsDisplay 
                results={state.results} 
                onReset={reset}
                onEditGrades={() => goToStep('grades')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-6 pt-0 sm:pb-8 sm:pt-2 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1.5">
          <Copyright className="w-3.5 h-3.5" />
          Developed by Wassim Mars
        </p>
      </footer>
    </div>
  );
};

export default GradeCalculator;
