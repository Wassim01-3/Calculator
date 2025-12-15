import { Subject, GradeInput, CalculationResult, FormulaType } from '@/types/grades';

// Get required inputs for a formula
export const getRequiredInputs = (formula: FormulaType): (keyof GradeInput)[] => {
  switch (formula) {
    case 'td_exam':
      return ['td', 'exam'];
    case 'ds1_ds2':
      return ['ds1', 'ds2'];
    case 'td_ds1_ds2':
      return ['td', 'ds1', 'ds2'];
    case 'tp_ds1_ds2':
      return ['tp', 'ds1', 'ds2'];
    case 'td_tp_exam':
      return ['td', 'tp', 'exam'];
    case 'ds1_exam':
      return ['ds1', 'exam'];
    case 'td_exam_50_50':
      return ['td', 'exam'];
    case 'tp_exam':
      return ['tp', 'exam'];
    case 'tp_ds1_exam':
      return ['tp', 'ds1', 'exam'];
    default:
      return [];
  }
};

// Calculate subject average based on formula
export const calculateSubjectAverage = (inputs: GradeInput, formula: FormulaType): number | null => {
  const { td, exam, ds1, ds2, tp } = inputs;

  switch (formula) {
    case 'td_exam':
      if (td !== undefined && exam !== undefined) {
        return td * 0.3 + exam * 0.7;
      }
      break;
    case 'ds1_ds2':
      if (ds1 !== undefined && ds2 !== undefined) {
        return ds1 * 0.5 + ds2 * 0.5;
      }
      break;
    case 'td_ds1_ds2':
      if (td !== undefined && ds1 !== undefined && ds2 !== undefined) {
        return td * 0.2 + ds1 * 0.4 + ds2 * 0.4;
      }
      break;
    case 'tp_ds1_ds2':
      if (tp !== undefined && ds1 !== undefined && ds2 !== undefined) {
        return tp * 0.2 + ds1 * 0.4 + ds2 * 0.4;
      }
      break;
    case 'td_tp_exam':
      if (td !== undefined && tp !== undefined && exam !== undefined) {
        return td * 0.1 + tp * 0.2 + exam * 0.7;
      }
      break;
    case 'ds1_exam':
      if (ds1 !== undefined && exam !== undefined) {
        return ds1 * 0.3 + exam * 0.7;
      }
      break;
    case 'td_exam_50_50':
      if (td !== undefined && exam !== undefined) {
        return td * 0.5 + exam * 0.5;
      }
      break;
    case 'tp_exam':
      if (tp !== undefined && exam !== undefined) {
        return tp * 0.3 + exam * 0.7;
      }
      break;
    case 'tp_ds1_exam':
      if (tp !== undefined && ds1 !== undefined && exam !== undefined) {
        return tp * 0.1 + ds1 * 0.2 + exam * 0.7;
      }
      break;
  }

  return null;
};

// Calculate all results
export const calculateResults = (subjects: Subject[]): CalculationResult => {
  const subjectAverages: { name: string; average: number; coefficient: number }[] = [];
  let totalWeighted = 0;
  let totalCoefficients = 0;

  subjects.forEach((subject) => {
    const average = calculateSubjectAverage(subject.inputs, subject.formula);
    if (average !== null) {
      subjectAverages.push({
        name: subject.name,
        average,
        coefficient: subject.coefficient,
      });
      totalWeighted += average * subject.coefficient;
      totalCoefficients += subject.coefficient;
    }
  });

  const generalAverage = totalCoefficients > 0 ? totalWeighted / totalCoefficients : 0;

  return {
    subjectAverages,
    generalAverage,
  };
};

// Calculate preview results including all subjects (using 0 for missing inputs, or previous average if in edit mode)
export const calculatePreviewResults = (
  subjects: Subject[],
  previousResults?: CalculationResult | null
): CalculationResult => {
  const subjectAverages: { name: string; average: number; coefficient: number }[] = [];
  let totalWeighted = 0;
  let totalCoefficients = 0;

  subjects.forEach((subject) => {
    const isComplete = isSubjectComplete(subject);
    let average: number | null = null;

    if (isComplete) {
      // Subject is complete, use current inputs
      average = calculateSubjectAverage(subject.inputs, subject.formula);
    } else {
      // Subject is not complete
      if (previousResults) {
        // In edit mode: use previous average if available
        const previousSubject = previousResults.subjectAverages.find(
          (s) => s.name === subject.name
        );
        if (previousSubject) {
          average = previousSubject.average;
        } else {
          // No previous average, fill missing inputs with 0
          const requiredInputs = getRequiredInputs(subject.formula);
          const filledInputs: GradeInput = { ...subject.inputs };
          requiredInputs.forEach((input) => {
            if (filledInputs[input] === undefined || filledInputs[input] === null) {
              filledInputs[input] = 0;
            }
          });
          average = calculateSubjectAverage(filledInputs, subject.formula);
        }
      } else {
        // Fresh input: fill missing inputs with 0
        const requiredInputs = getRequiredInputs(subject.formula);
        const filledInputs: GradeInput = { ...subject.inputs };
        requiredInputs.forEach((input) => {
          if (filledInputs[input] === undefined || filledInputs[input] === null) {
            filledInputs[input] = 0;
          }
        });
        average = calculateSubjectAverage(filledInputs, subject.formula);
      }
    }

    if (average !== null) {
      subjectAverages.push({
        name: subject.name,
        average,
        coefficient: subject.coefficient,
      });
      totalWeighted += average * subject.coefficient;
      totalCoefficients += subject.coefficient;
    }
  });

  const generalAverage = totalCoefficients > 0 ? totalWeighted / totalCoefficients : 0;

  return {
    subjectAverages,
    generalAverage,
  };
};

// Check if all required inputs are filled for a subject
export const isSubjectComplete = (subject: Subject): boolean => {
  const requiredInputs = getRequiredInputs(subject.formula);
  return requiredInputs.every(
    (input) => subject.inputs[input] !== undefined && subject.inputs[input] !== null
  );
};

// Get formula description
export const getFormulaDescription = (formula: FormulaType): string => {
  switch (formula) {
    case 'td_exam':
      return 'TD × 0.3 + Examen × 0.7';
    case 'ds1_ds2':
      return 'DS1 × 0.5 + DS2 × 0.5';
    case 'td_ds1_ds2':
      return 'TD × 0.2 + DS1 × 0.4 + DS2 × 0.4';
    case 'tp_ds1_ds2':
      return 'TP × 0.2 + DS1 × 0.4 + DS2 × 0.4';
    case 'td_tp_exam':
      return 'TD × 0.1 + TP × 0.2 + Examen × 0.7';
    case 'ds1_exam':
      return 'DS1 × 0.3 + Examen × 0.7';
    case 'td_exam_50_50':
      return 'TD × 0.5 + Examen × 0.5';
    case 'tp_exam':
      return 'TP × 0.3 + Examen × 0.7';
    case 'tp_ds1_exam':
      return 'TP × 0.1 + DS1 × 0.2 + Examen × 0.7';
    default:
      return '';
  }
};

// Get input label
export const getInputLabel = (input: keyof GradeInput): string => {
  const labels: Record<keyof GradeInput, string> = {
    td: 'TD',
    tp: 'TP',
    ds1: 'DS1',
    ds2: 'DS2',
    exam: 'Examen',
  };
  return labels[input];
};
