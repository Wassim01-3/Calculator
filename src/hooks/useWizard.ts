import { useState, useCallback } from 'react';
import { WizardState, WizardStep, AcademicYear, Specialization, Semester, Subject } from '@/types/grades';
import { semesterConfigs } from '@/data/semesterConfigs';
import { calculateResults } from '@/utils/calculations';

const initialState: WizardState = {
  year: null,
  specialization: null,
  semester: null,
  subjects: [],
  results: null,
};

export const useWizard = () => {
  const [state, setState] = useState<WizardState>(initialState);
  const [currentStep, setCurrentStep] = useState<WizardStep>('year');
  const [completedSteps, setCompletedSteps] = useState<WizardStep[]>([]);

  const setYear = useCallback((year: AcademicYear) => {
    setState((prev) => ({
      ...prev,
      year,
      specialization: null,
      semester: null,
      subjects: [],
      results: null,
    }));
    setCompletedSteps((prev) => [...prev.filter((s) => s === 'year'), 'year']);
    setCurrentStep('specialization');
  }, []);

  const setSpecialization = useCallback((specialization: Specialization) => {
    setState((prev) => ({
      ...prev,
      specialization,
      semester: null,
      subjects: [],
      results: null,
    }));
    setCompletedSteps((prev) => {
      const filtered = prev.filter((s) => s === 'year');
      return [...filtered, 'year', 'specialization'];
    });
    setCurrentStep('semester');
  }, []);

  const setSemester = useCallback((semester: Semester) => {
    const { year, specialization } = state;
    if (!year || !specialization) return;

    const configKey = `${year}${specialization}${semester}`;
    const config = semesterConfigs[configKey];

    if (config) {
      const subjects = config.subjects.map((s) => ({
        ...s,
        inputs: {},
      }));

      setState((prev) => ({
        ...prev,
        semester,
        subjects,
        results: null,
      }));
      setCompletedSteps((prev) => {
        const filtered = prev.filter((s) => s === 'year' || s === 'specialization');
        return [...filtered, 'semester'];
      });
      setCurrentStep('grades');
    }
  }, [state]);

  const updateSubjectGrade = useCallback(
    (subjectIndex: number, field: keyof Subject['inputs'], value: number) => {
      setState((prev) => {
        const newSubjects = [...prev.subjects];
        newSubjects[subjectIndex] = {
          ...newSubjects[subjectIndex],
          inputs: {
            ...newSubjects[subjectIndex].inputs,
            [field]: value,
          },
        };
        return { ...prev, subjects: newSubjects };
      });
    },
    []
  );

  const calculateAllResults = useCallback(() => {
    const results = calculateResults(state.subjects);
    setState((prev) => ({ ...prev, results }));
    setCompletedSteps((prev) => {
      const filtered = prev.filter((s) => s !== 'results');
      return [...filtered, 'grades', 'results'];
    });
    setCurrentStep('results');
  }, [state.subjects]);

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    setCurrentStep('year');
    setCompletedSteps([]);
  }, []);

  const goBack = useCallback(() => {
    const stepOrder: WizardStep[] = ['year', 'specialization', 'semester', 'grades', 'results'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  }, [currentStep]);

  return {
    state,
    currentStep,
    completedSteps,
    setYear,
    setSpecialization,
    setSemester,
    updateSubjectGrade,
    calculateAllResults,
    goToStep,
    goBack,
    reset,
  };
};
