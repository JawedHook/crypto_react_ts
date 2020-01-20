import { UserActionTypes } from './user.types';
import { User } from '../../models/user.model';
import NavigationService from '../../services/navigation.service';
import { createUserProfileDocument, login, register, loginWithGoogle, logout, auth, firestore } from '../../services/firebase.service';
import { setStorageAuthUserId, setStorageUseTouchId, getStorageAuthUserId } from '../../services/storage.service';

export const setUserCoin = (currentUser: User) => ({
  type: UserActionTypes.SET_USER_COIN,
  payload: currentUser,
});

export const authSuccess = (currentUser: User) => ({
  type: UserActionTypes.AUTH_SUCCESS,
  payload: currentUser,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signInFailed = (error: string) => ({
  type: UserActionTypes.SIGN_IN_FAILED,
  payload: error,
});

export const signUpFailed = (error: string) => ({
  type: UserActionTypes.SIGN_UP_FAILED,
  payload: error,
});

export const signOutFailed = (error: string) => ({
  type: UserActionTypes.SIGN_OUT_FAILED,
  payload: error,
});

export const signInStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
});

export const signInWithGoogleStart = () => ({
  type: UserActionTypes.SIGN_IN_WITH_GOOGLE_START,
});

export const signInWithTouchIdStart = () => ({
  type: UserActionTypes.SIGN_IN_WITH_TOUCH_ID_START,
});

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const handleSignIn = (email: string, password: string) => {
  return async (dispatch: any): Promise<void> => {
    try {
      dispatch(signInStart());
      const { user }: firebase.auth.UserCredential = await login(email, password);
      const currentUser: User = await createUserProfileDocument(user);
      await setStorageAuthUserId(currentUser.id);
      await setStorageUseTouchId(currentUser.useTouchId);
      dispatch(authSuccess(currentUser));
      NavigationService.navigate('main');
    } catch (err) {
      dispatch(signInFailed(err.message || err.toString()));
    }
  };
};

export const handleSignInWithGoogle = () => {
  return async (dispatch: any): Promise<void> => {
    try {
      dispatch(signInWithGoogleStart());
      const { user }: firebase.auth.UserCredential = await loginWithGoogle();
      const currentUser: User = await createUserProfileDocument(user);
      await setStorageAuthUserId(currentUser.id);
      await setStorageUseTouchId(currentUser.useTouchId);
      dispatch(authSuccess(currentUser));
      NavigationService.navigate('main');
    } catch (err) {
      dispatch(signInFailed(err.message || err.toString()));
    }
  };
};

export const handleSignUp = (displayName: string, email: string, password: string) => {
  return async (dispatch: any): Promise<void> => {
    try {
      dispatch(signUpStart());
      const { user }: firebase.auth.UserCredential = await register(email, password);
      const currentUser: User = await createUserProfileDocument(user, { displayName });
      await setStorageAuthUserId(currentUser.id);
      await setStorageUseTouchId(currentUser.useTouchId);
      dispatch(authSuccess(currentUser));
      NavigationService.navigate('main');
    } catch (err) {
      dispatch(signUpFailed(err.message || err.toString()));
    }
  };
};

export const handleSignInWithTouchId = () => {
  return async (dispatch: any): Promise<void> => {
    try {
      dispatch(signInWithTouchIdStart());
      const authUserId = await getStorageAuthUserId();
      const userDocumentSnapshot: firebase.firestore.DocumentSnapshot = await firestore.doc(`users/${authUserId}`).get();
      const currentUser = new User(userDocumentSnapshot);
      await setStorageAuthUserId(currentUser.id);
      await setStorageUseTouchId(currentUser.useTouchId);
      dispatch(authSuccess(currentUser));
      NavigationService.navigate('main');
    } catch (err) {
      dispatch(signInFailed(err.message || err.toString()));
    }
  };
};

export const handleSignOut = () => {
  return async (dispatch: any): Promise<void> => {
    try {
      dispatch(signOutStart());
      await logout();
      dispatch(signOutSuccess());
      NavigationService.navigate('login');
    } catch (err) {
      dispatch(signOutFailed(err.message || err.toString()));
    }
  };
};
