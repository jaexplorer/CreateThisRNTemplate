/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import FirebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getItem, setItem, StorageKey } from './Storage';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';
import { logError, logEvent } from './analytics/Analytics';
import { EventName } from './analytics/AnalyticsConstants';

let token: string | null = null;

export const getToken = async (): Promise<string | null> => {
  if (!token) {
    token = await getItem(StorageKey.AUTH_TOKEN);
  }
  return token;
};

const setToken = async (
  credential: FirebaseAuthTypes.UserCredential,
  force = false,
): Promise<FirebaseAuthTypes.UserCredential> => {
  const id = credential.user.uid;
  const userDetails = {
    email: credential.user.email || 'no-email',
    username: credential.user.displayName || 'no-displayName',
  };

  await Promise.all([
    logEvent(EventName.SIGNED_IN),
    crashlytics().setUserId(id),
    crashlytics().setAttributes(userDetails),
  ]);

  Sentry.setUser({ id, ...userDetails });

  const newToken = await credential.user.getIdToken(force);
  const success = await setItem(StorageKey.AUTH_TOKEN, newToken);
  if (success) {
    token = newToken;
  }
  return credential;
};

// FIREBASE AUTH ------------------------------------------------------------------------------------- //
export const handleError = (error: string): string => {
  switch (error) {
    case 'auth/invalid-email':
      return 'Email is not a valid email address';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/user-disabled':
      return 'This email has been disabled';
    case 'auth/user-not-found':
      return 'No user found with the given email';
    case 'auth/wrong-password':
      return 'Password is invalid for the given email';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/operation-not-allowed':
      return 'Enable anonymous in your firebase console.';
    case 'auth/account-exists-with-different-credential':
      return 'Email already associated with another account.';
    default:
      return error;
  }
};

export const onAuthChange = (callback: FirebaseAuthTypes.AuthListenerCallback): (() => void) =>
  FirebaseAuth().onAuthStateChanged(callback);

export const signUp = (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential | void> =>
  FirebaseAuth()
    .createUserWithEmailAndPassword(email, password)
    .then(setToken)
    .catch((error) => logError(handleError(error.code)));

export const signInAnon = async (): Promise<FirebaseAuthTypes.UserCredential | void> =>
  FirebaseAuth()
    .signInAnonymously()
    .then(setToken)
    .catch((error) => logError(handleError(error.code)));

export const signIn = (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential | void> =>
  FirebaseAuth()
    .signInWithEmailAndPassword(email, password)
    .then(setToken)
    .catch((error) => logError(handleError(error.code)));

export const signInWithFacebook = (
  socialToken: string,
): Promise<FirebaseAuthTypes.UserCredential | void> =>
  FirebaseAuth()
    .signInWithCredential(FirebaseAuth.FacebookAuthProvider.credential(socialToken))
    .then(setToken)
    .catch((error) => logError(handleError(error.code)));

export const signInWithGoogle = (
  socialToken: string,
): Promise<FirebaseAuthTypes.UserCredential | void> =>
  FirebaseAuth()
    .signInWithCredential(FirebaseAuth.GoogleAuthProvider.credential(socialToken))
    .then(setToken)
    .catch((error) => logError(handleError(error.code)));

export const signInWithApple = (
  identityToken: string,
  secret: string,
): Promise<FirebaseAuthTypes.UserCredential | void> =>
  FirebaseAuth()
    .signInWithCredential(FirebaseAuth.AppleAuthProvider.credential(identityToken, secret))
    .then(setToken)
    .catch((error) => logError(handleError(error.code)));

export const signOut = (): Promise<void> => FirebaseAuth().signOut();
