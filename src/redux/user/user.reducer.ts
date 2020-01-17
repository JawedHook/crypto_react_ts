import { UserActionTypes } from './user.types';
import { User } from '../../models/user.model';

interface IInitialState {
  currentUser: User;
  signInLoading: boolean;
  signInWithGoogleLoading: boolean;
  signInWithTouchIdLoading: boolean;
  signUpLoading: boolean;
  signOutLoading: boolean;
  signInError: string | null;
  signUpError: string | null;
  signOutError: string | null;
}

const INITIAL_STATE: IInitialState = {
  currentUser: null,
  signInLoading: false,
  signInWithGoogleLoading: false,
  signInWithTouchIdLoading: false,
  signUpLoading: false,
  signOutLoading: false,
  signInError: null,
  signUpError: null,
  signOutError: null,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        signInLoading: true,
      };
    case UserActionTypes.SIGN_IN_WITH_GOOGLE_START:
      return {
        ...state,
        signInWithGoogleLoading: true,
      };
    case UserActionTypes.SIGN_IN_WITH_TOUCH_ID_START:
      return {
        ...state,
        signInWithTouchIdLoading: true,
      };
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpLoading: true,
      };
    case UserActionTypes.SIGN_OUT_START:
      return {
        ...state,
        signOutLoading: true,
      };
    case UserActionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        currentUser: null,
        signInLoading: false,
        signInWithGoogleLoading: false,
        signInWithTouchIdLoading: false,
        signInError: action.payload,
      };
    case UserActionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        currentUser: null,
        signUpLoading: false,
        signUpError: action.payload,
      };
    case UserActionTypes.SIGN_OUT_FAILED:
      return {
        ...state,
        signOutLoading: false,
        signOutError: action.payload,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        signOutLoading: false,
        signOutError: null,
      };
    case UserActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        signInLoading: false,
        signUpLoading: false,
        signInWithGoogleLoading: false,
        signInWithTouchIdLoading: false,
        signInError: null,
        signUpError: null,
      };
    default:
      return state;
  }
};

export default userReducer;
