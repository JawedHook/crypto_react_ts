import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import coinsReducer from './coins/coins.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  coins: coinsReducer,
});

export default rootReducer;
