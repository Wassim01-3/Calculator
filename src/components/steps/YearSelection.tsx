import { StepCard } from '@/components/StepCard';
import { SelectionCard } from '@/components/SelectionCard';
import { AcademicYear } from '@/types/grades';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Trophy } from 'lucide-react';

interface YearSelectionProps {
  selectedYear: AcademicYear | null;
  onSelect: (year: AcademicYear) => void;
}

const years: { id: AcademicYear; label: string; icon: React.ReactNode; description: string }[] = [
  { id: '1', label: 'Première année', icon: <GraduationCap className="w-full h-full" />, description: 'L1 - Fondamentaux' },
  { id: '2', label: 'Deuxième année', icon: <BookOpen className="w-full h-full" />, description: 'L2 - Approfondissement' },
  { id: '3', label: 'Troisième année', icon: <Trophy className="w-full h-full" />, description: 'L3 - Spécialisation' },
];

export const YearSelection = ({ selectedYear, onSelect }: YearSelectionProps) => {
  return (
    <StepCard
      title="Sélectionnez votre année"
      subtitle="Commencez par choisir votre niveau d'études"
    >
      <motion.div
        className="grid gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {years.map((year, index) => (
          <SelectionCard
            key={year.id}
            icon={year.icon}
            title={year.label}
            subtitle={year.description}
            isSelected={selectedYear === year.id}
            onClick={() => onSelect(year.id)}
            delay={index}
          />
        ))}
      </motion.div>
    </StepCard>
  );
};
