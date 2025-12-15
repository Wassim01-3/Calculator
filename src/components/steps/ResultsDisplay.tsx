import { useEffect, useState } from 'react';
import { CalculationResult } from '@/types/grades';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Confetti } from '@/components/Confetti';
import { RadarChart } from '@/components/RadarChart';
import { SubjectBarChart } from '@/components/SubjectBarChart';
import { PassFailDonutChart } from '@/components/PassFailDonutChart';
import { CoefficientContributionChart } from '@/components/CoefficientContributionChart';
import { RotateCcw, Trophy, AlertTriangle, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsDisplayProps {
  results: CalculationResult;
  onReset: () => void;
  onEditGrades?: () => void;
}

export const ResultsDisplay = ({ results, onReset, onEditGrades }: ResultsDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isPassed = results.generalAverage >= 10;

  useEffect(() => {
    if (isPassed) {
      setShowConfetti(true);
    }
  }, [isPassed]);

  const radarData = results.subjectAverages.map((s) => ({
    name: s.name,
    value: s.average,
    coefficient: s.coefficient,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Confetti isActive={showConfetti} />

      {/* Main result card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'glass rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden',
          isPassed ? 'glow-success' : 'glow-danger'
        )}
      >
        {/* Background gradient */}
        <div
          className={cn(
            'absolute inset-0 opacity-10',
            isPassed
              ? 'bg-gradient-to-br from-success to-primary'
              : 'bg-gradient-to-br from-destructive to-accent'
          )}
        />

        <div className="relative">
          {/* Status icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={cn(
              'w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4',
              isPassed ? 'bg-success' : 'bg-destructive'
            )}
          >
            {isPassed ? (
              <Trophy className="w-10 h-10 text-success-foreground" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-destructive-foreground" />
            )}
          </motion.div>

          {/* Status text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2
              className={cn(
                'text-2xl font-bold mb-2',
                isPassed ? 'text-success' : 'text-destructive'
              )}
            >
              {isPassed ? 'Félicitations !' : 'Courage !'}
            </h2>
            <p className="text-muted-foreground">
              {isPassed
                ? 'Vous avez validé votre semestre'
                : 'Vous devez améliorer vos résultats'}
            </p>
          </motion.div>

          {/* General average */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="my-6 sm:my-8"
          >
            <div className="text-sm text-muted-foreground mb-2">Moyenne Générale</div>
            <div
              className={cn(
                'text-5xl sm:text-6xl font-extrabold tracking-tight',
                isPassed ? 'text-success' : 'text-destructive'
              )}
            >
              {results.generalAverage.toFixed(2)}
            </div>
            <div className="text-xl text-muted-foreground">/20</div>
          </motion.div>

          {/* Pass threshold indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((results.generalAverage / 20) * 100, 100)}%` }}
                transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  isPassed ? 'bg-success' : 'bg-destructive'
                )}
              />
            </div>
            <span>Seuil: 10/20</span>
          </div>
        </div>
      </motion.div>

      {/* Radar chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-center mb-4">
          Vue d'ensemble des matières
        </h3>
        <RadarChart data={radarData} />
      </motion.div>

      {/* Additional Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subject Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-center mb-4">
            Classement des matières
          </h3>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Moyennes triées par ordre décroissant
          </p>
          <SubjectBarChart data={radarData} />
        </motion.div>

        {/* Pass/Fail Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-center mb-4">
            Répartition Admis/Ajourné
          </h3>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Pourcentage de matières validées
          </p>
          <PassFailDonutChart data={radarData} />
        </motion.div>
      </div>

      {/* Coefficient Contribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-center mb-4">
          Contribution des coefficients
        </h3>
        <p className="text-xs text-muted-foreground text-center mb-4">
          Impact de chaque matière sur la moyenne générale
        </p>
        <CoefficientContributionChart data={radarData} generalAverage={results.generalAverage} />
      </motion.div>

      {/* Details toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showDetails ? (
            <>
              Masquer les détails <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Voir les détails <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {results.subjectAverages.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'glass rounded-xl p-4 flex items-center justify-between',
                  subject.average >= 10
                    ? 'border-l-4 border-l-success'
                    : 'border-l-4 border-l-destructive'
                )}
              >
                <div className="flex-1">
                  <div className="font-medium">{subject.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Coefficient: {subject.coefficient}
                  </div>
                </div>
                <div
                  className={cn(
                    'text-xl font-bold',
                    subject.average >= 10 ? 'text-success' : 'text-destructive'
                  )}
                >
                  {subject.average.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row justify-center gap-3 pt-4"
      >
        {onEditGrades && (
          <Button
            onClick={onEditGrades}
            variant="default"
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier les notes
          </Button>
        )}
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Nouveau calcul
        </Button>
      </motion.div>
    </div>
  );
};
