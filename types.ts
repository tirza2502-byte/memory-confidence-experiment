
export enum ExperimentPhase {
  START = 'START',
  LEARNING = 'LEARNING',
  DISTRACTION = 'DISTRACTION',
  TEST = 'TEST',
  RESULTS = 'RESULTS'
}

export interface WordPair {
  word1: string;
  word2: string;
}

export interface TrialData extends WordPair {
  confidence?: number;
  response?: string;
  accuracy?: number;
}

export interface VerbalProblem {
  options: string[];
  correctAnswer: string;
}
