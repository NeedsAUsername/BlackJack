import { cardMap } from '../helpers/cardMap';

function dealerReducer(state = {
  hand: [], 
  handTotal: 0
}, action) {

  switch(action.type) { 
    case 'DRAW_CARD':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal
      }
    

    default: 
      return state
  }
}


export default(dealerReducer)