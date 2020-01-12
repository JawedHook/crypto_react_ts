import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { logInAsync, LogInResult } from 'expo-google-app-auth';

import firebaseConfig from '../../config/firebase.config';
import { User } from '../models/user.model';
import googleAuthConfig from '../../config/google-auth.config';

firebase.initializeApp(firebaseConfig);

export const auth: firebase.auth.Auth = firebase.auth();
export const firestore: firebase.firestore.Firestore = firebase.firestore();

export const register = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = (): Promise<void> => {
  return auth.signOut();
};

export const createUserProfileDocument = async (userAuth: firebase.User | null, additionalData?: any): Promise<User> => {
  if (!userAuth) {
    return;
  }
  const userRef: firebase.firestore.DocumentReference = firestore.doc(`users/${userAuth.uid}`);

  try {
    const snapShot: firebase.firestore.DocumentSnapshot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email }: firebase.User = userAuth;
      const createdAt: Date | number = Date.now();
      const updatedAt: Date | number = Date.now();

      await userRef.set({
        displayName,
        email,
        createdAt,
        updatedAt,
        ...additionalData,
      });
    }

    const userDocumentSnapshot: firebase.firestore.DocumentSnapshot = await userRef?.get();
    return new User(userDocumentSnapshot);
  } catch (err) {
    throw new Error(err);
  }
};

const getGoogleCredential = async (): Promise<firebase.auth.OAuthCredential> => {
  const googleProvider = firebase.auth.GoogleAuthProvider;
  const result: LogInResult = await logInAsync(googleAuthConfig);
  if (result.type === 'success') {
    return googleProvider.credential(result.idToken, result.accessToken);
  } else {
    throw new Error('Authentification with google failed !');
  }
};

export const loginWithGoogle = async (): Promise<firebase.auth.UserCredential> => {
  const credential: firebase.auth.OAuthCredential = await getGoogleCredential();
  return auth.signInWithCredential(credential);
};

export default firebase;
