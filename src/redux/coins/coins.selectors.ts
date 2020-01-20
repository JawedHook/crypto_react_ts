import { createSelector } from 'reselect';

const selectStateCoins = (state: any) => state.coins;

export const selectCoins = createSelector([selectStateCoins], coins => coins.coins);

export const selectSavedCoins = createSelector([selectStateCoins], coins => coins.savedCoins);
