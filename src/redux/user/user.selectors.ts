import { createSelector } from 'reselect';

const selectUser = (state: any) => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);

export const selectCurrentUserCoins = createSelector([selectCurrentUser], currentUser => currentUser.coins);

export const selectSignInError = createSelector([selectUser], user => user.signInError);

export const selectSignUpError = createSelector([selectUser], user => user.signUpError);

export const selectSignOutError = createSelector([selectUser], user => user.signOutError);

export const selectSignInLoading = createSelector([selectUser], user => user.signInLoading);

export const selectSignInWithGoogleLoading = createSelector([selectUser], user => user.signInWithGoogleLoading);

export const selectSignInWithTouchIdLoading = createSelector([selectUser], user => user.signInWithTouchIdLoading);

export const selectSignUpLoading = createSelector([selectUser], user => user.signUpLoading);

export const selectSignOutLoading = createSelector([selectUser], user => user.signOutLoading);
