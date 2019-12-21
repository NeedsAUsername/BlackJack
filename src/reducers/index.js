import {combineReducers} from 'redux'; 
import dealerReducer from './dealer_reducer';
import playerReducer from './player_reducer'
import deck_reducer from './deck_reducer';

const rootReducer = combineReducers({
  dealer: dealerReducer,
  player: playerReducer,
  deck: deck_reducer,
});

export default rootReducer;
