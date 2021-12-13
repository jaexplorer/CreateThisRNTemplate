// Its important these are not dynamic and follow a structure
export enum EventName {
  SIGNED_IN = 'User signed in',
}

export type EventValues = { [key: string]: string | number | boolean };
