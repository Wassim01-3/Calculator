import { StepCard } from '@/components/StepCard';
import { SelectionCard } from '@/components/SelectionCard';
import { AcademicYear, Specialization } from '@/types/grades';
import { specializationsByYear } from '@/data/semesterConfigs';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { getSpecializationIcon } from '@/data/specializationIcons';

interface SpecializationSelectionProps {
  year: AcademicYear;
  selectedSpecialization: Specialization | null;
  onSelect: (spec: Specialization) => void;
  onBack: () => void;
}

export const SpecializationSelection = ({
  year,
  selectedSpecialization,
  onSelect,
  onBack,
}: SpecializationSelectionProps) => {
  const specializations = specializationsByYear[year] || [];

  return (
    <StepCard
      title="Choisissez votre filière"
      subtitle="Sélectionnez votre spécialisation"
    >
      <motion.div
        className="grid gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {specializations.map((spec, index) => (
          <SelectionCard
            key={spec.id}
            icon={getSpecializationIcon(spec.id)}
            title={spec.name}
            isSelected={selectedSpecialization === spec.id}
            onClick={() => onSelect(spec.id as Specialization)}
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
