import { CoinsActionTypes } from './coins.types';
import { Coin } from '../../models/coin.model';

interface IInitialState {
  coins: Coin[];
}

const INITIAL_STATE: IInitialState = {
  coins: [],
};

const coinsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CoinsActionTypes.SET_COINS:
      return {
        ...state,
        coins: action.payload,
      };
    default:
      return state;
  }
};

export default coinsReducer;
