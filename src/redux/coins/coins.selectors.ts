import { createSelector } from 'reselect';

const selectStateCoins = (state: any) => state.coins;

export const selectCoins = createSelector([selectStateCoins], coins => coins.coins);
