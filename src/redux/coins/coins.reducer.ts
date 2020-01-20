import { CoinsActionTypes } from './coins.types';
import { Coin, UserCoin } from '../../models/coin.model';

interface IInitialState {
  coins: Coin[];
  savedCoins: Coin[];
}

const INITIAL_STATE: IInitialState = {
  coins: [],
  savedCoins: [],
};

const coinsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CoinsActionTypes.SET_COINS:
      return {
        ...state,
        coins: action.payload,
      };
    case CoinsActionTypes.ADD_SAVED_COIN:
      return {
        ...state,
        savedCoins: [...state.savedCoins, action.payload],
      };
    case CoinsActionTypes.REMOVE_SAVED_COIN:
      return {
        ...state,
        savedCoins: state.savedCoins.filter((savedCoin: Coin) => savedCoin.symbol !== action.payload),
      };
    case CoinsActionTypes.GET_SAVED_COINS_FROM_COINS:
      return {
        ...state,
        savedCoins: action.payload.map((currentUserCoin: UserCoin) => {
          const { symbol, min, max } = currentUserCoin;
          const matchedCoin = state.coins.find((coin: Coin) => coin.symbol === symbol);
          return new Coin({ ...matchedCoin, min, max });
        }),
      };
    default:
      return state;
  }
};

export default coinsReducer;
