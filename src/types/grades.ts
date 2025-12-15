export type GradeInput = {
  td?: number;
  exam?: number;
  ds1?: number;
  ds2?: number;
  tp?: number;
};

export type FormulaType = 
  | 'td_exam' 
  | 'ds1_ds2' 
  | 'td_ds1_ds2' 
  | 'tp_ds1_ds2' 
  | 'td_tp_exam' 
  | 'ds1_exam' 
  | 'td_exam_50_50' 
  | 'tp_exam'
  | 'tp_ds1_exam';

export type Subject = {
  name: string;
  inputs: GradeInput;
  formula: FormulaType;
  coefficient: number;
};

export type SemesterConfig = {
  subjects: Subject[];
};

export type CalculationResult = {
  subjectAverages: { name: string; average: number; coefficient: number }[];
  generalAverage: number;
};

export type AcademicYear = '1' | '2' | '3';

export type Specialization = 
  | 'lse' | 'lbc' | 'lsg' | 'lsc' 
  | 'com' | 'lfin' | 'lmk' | 'lma' 
  | 'ing' | 'mon' | 'leb';

export type Semester = '1' | '2';

export type WizardStep = 'year' | 'specialization' | 'semester' | 'grades' | 'results';

export interface WizardState {
  year: AcademicYear | null;
  specialization: Specialization | null;
  semester: Semester | null;
  subjects: Subject[];
  results: CalculationResult | null;
}
