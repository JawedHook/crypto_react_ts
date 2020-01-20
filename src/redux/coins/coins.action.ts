import { Coin } from '../../models/coin.model';
import { CoinsActionTypes } from './coins.types';

export const setCoins = (coins: Coin[]) => ({
  type: CoinsActionTypes.SET_COINS,
  payload: coins,
});
