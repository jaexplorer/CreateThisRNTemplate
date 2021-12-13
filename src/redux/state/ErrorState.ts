export interface ErrorState {
  [type: string]: Error | undefined;
}

export const initialErrorState: ErrorState = {};
