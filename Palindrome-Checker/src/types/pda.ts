export type SimulationStatus = 'idle' | 'running' | 'complete';

export interface PDAState {
  input: string;
  stack: string[];
  currentState: string;
  index: number;
  inPushPhase: boolean;
}

export interface PDAStepResult {
  newStack: string[];
  newState: string;
  newPhase: boolean;
}