import { Coin, UserCoin } from '../../models/coin.model';
import { CoinsActionTypes } from './coins.types';

export const setCoins = (coins: Coin[]) => ({
  type: CoinsActionTypes.SET_COINS,
  payload: coins,
});

export const getSavedCoinsFromCoins = (currentUserCoins: UserCoin[]) => ({
  type: CoinsActionTypes.GET_SAVED_COINS_FROM_COINS,
  payload: currentUserCoins,
});

export const addSavedCoin = (coin: Coin) => ({
  type: CoinsActionTypes.ADD_SAVED_COIN,
  payload: coin,
});

export const removeSavedCoin = (symbol: string) => ({
  type: CoinsActionTypes.REMOVE_SAVED_COIN,
  payload: symbol,
});

export const updateSavedCoin = (userCoin: UserCoin) => ({
  type: CoinsActionTypes.UPDATE_SAVED_COIN,
  payload: userCoin,
});
