import { StepCard } from '@/components/StepCard';
import { SelectionCard } from '@/components/SelectionCard';
import { Semester, AcademicYear, Specialization } from '@/types/grades';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { semesterConfigs } from '@/data/semesterConfigs';

interface SemesterSelectionProps {
  selectedSemester: Semester | null;
  year: AcademicYear | null;
  specialization: Specialization | null;
  onSelect: (semester: Semester) => void;
  onBack: () => void;
}

// Custom semester number icon component
const SemesterNumberIcon = ({ number }: { number: string }) => (
  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl bg-primary/10 text-primary border-2 border-primary/30">
    {number}
  </div>
);

const allSemesters: { id: Semester; label: string; icon: React.ReactNode; description: string }[] = [
  { 
    id: '1', 
    label: 'Premier Semestre', 
    icon: <SemesterNumberIcon number="1" />, 
    description: 'S1 - Septembre à Janvier' 
  },
  { 
    id: '2', 
    label: 'Deuxième Semestre', 
    icon: <SemesterNumberIcon number="2" />, 
    description: 'S2 - Février à Juin' 
  },
];

export const SemesterSelection = ({
  selectedSemester,
  year,
  specialization,
  onSelect,
  onBack,
}: SemesterSelectionProps) => {
  // Filter semesters based on available configs
  const availableSemesters = allSemesters.filter((semester) => {
    if (!year || !specialization) return true;
    
    const configKey = `${year}${specialization}${semester.id}`;
    return semesterConfigs[configKey] !== undefined;
  });

  return (
    <StepCard
      title="Sélectionnez le semestre"
      subtitle="Choisissez le semestre à calculer"
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
        {availableSemesters.map((semester, index) => (
          <SelectionCard
            key={semester.id}
            icon={semester.icon}
            title={semester.label}
            subtitle={semester.description}
            isSelected={selectedSemester === semester.id}
            onClick={() => onSelect(semester.id)}
            delay={index}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex justify-start"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </motion.div>
    </StepCard>
  );
};
