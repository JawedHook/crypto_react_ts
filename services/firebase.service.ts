import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../config/firebase.config';

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

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData?: any,
): Promise<firebase.firestore.DocumentReference | undefined> => {
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
  } catch (err) {
    throw new Error(err);
  }

  return userRef;
};

export const googleProvider: firebase.auth.GoogleAuthProvider_Instance = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoole = async (): Promise<firebase.auth.UserCredential> => auth.signInWithPopup(googleProvider);

export default firebase;
