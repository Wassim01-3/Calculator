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

  // Pre-calculate which groups have active inputs
  const activeGroups = new Set<string>();
  subjects.forEach((subject) => {
    if (subject.optionalGroup) {
      const requiredInputs = getRequiredInputs(subject.formula);
      const hasInput = requiredInputs.some(
        (input) =>
          subject.inputs[input] !== undefined &&
          subject.inputs[input] !== null &&
          subject.inputs[input] !== 0 // Consider 0 as no input for locking purposes, or strictly undefined? 
        // Re-reading logic: "once he fill one... the other must be locked".
        // Usually valid grades include 0. But for "selection", typically presence of value matters.
        // Let's assume any non-null/undefined value counts as "active".
      );
      if (hasInput) {
        // However, we need to know WHICH one is active to lock the OTHER.
        // If both have inputs (edge case), we might need a tie-breaker or just count both (error) or count first.
        // For calculation, let's say: if THIS subject has input, it counts.
        // The UI prevents both being filled. 
        // But what if the user fills A, then B? UI should prevent B.
        // Here we just calculate what is given.
        // The request says: "not considered as required and not calculated".
        // Use a helper to determine if *this* specific subject is the selected one.
      }
    }
  });

  // Simple approach: calculate all, but filter out subjects that shouldn't count.
  // Actually, simpler: iterate and check if PEER is active.

  subjects.forEach((subject) => {
    let shouldInclude = true;

    if (subject.optionalGroup) {
      // Find peers in the same group
      const peers = subjects.filter(s => s.name !== subject.name && s.optionalGroup === subject.optionalGroup);

      // precise check: does CURRENT subject have data?
      const requiredInputs = getRequiredInputs(subject.formula);
      const hasData = requiredInputs.some(k => subject.inputs[k] !== undefined && subject.inputs[k] !== null);

      // does PEER have data?
      const peerHasData = peers.some(p => {
        const pReq = getRequiredInputs(p.formula);
        // strictly check if any input is set
        return pReq.some(k => p.inputs[k] !== undefined && p.inputs[k] !== null);
      });

      if (!hasData && peerHasData) {
        shouldInclude = false;
      }
      // If both have data, we include both (or undefined behavior), but UI prevents this.
      // If neither has data, both are "incomplete" but coefficient counts as 0? 
      // No, if neither has data, usually it drags average down. 
      // User said: "not considered as required".
      // If neither is filled, and it's optional, maybe it shouldn't count as 0? 
      // "must be locked and not considered as required" implies if NOT selected, it doesn't count.
      // So if NO selection is made in the group, NEITHER counts? Or one is mandatory?
      // "student choose a subject... to fill". Implies one IS required.
      // If one is required, then at least one must be calculated.
      // If both empty -> both count as 0? Or just one?
      // Standard logic: if both empty, treated as 0 for the first one found?
      // Let's stick to: If I don't have data, and my peer DOES, I am ignored.
      // If neither has data, I am NOT ignored (so I count as 0, prompting user to fill one).
    }

    if (shouldInclude) {
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
    let shouldInclude = true;

    if (subject.optionalGroup) {
      const peers = subjects.filter(s => s.name !== subject.name && s.optionalGroup === subject.optionalGroup);
      // Check if I have data (in current inputs or previous results)
      // Actually for preview, we look at "isComplete" or "filledInputs".
      // The logic is: if PEER is "active", I am excluded.

      // Helper to check if a subject is "active" (has intended input)
      const isSubjectActive = (s: Subject) => {
        return getRequiredInputs(s.formula).some(k => s.inputs[k] !== undefined && s.inputs[k] !== null);
      };

      const iamActive = isSubjectActive(subject);
      const peerActive = peers.some(p => isSubjectActive(p));

      if (!iamActive && peerActive) {
        shouldInclude = false;
      }
    }

    if (!shouldInclude) return;

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
