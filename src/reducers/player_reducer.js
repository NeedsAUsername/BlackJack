import { cardMap } from '../helpers/cardMap';

function playerReducer(state = {
  hand: [],
  handTotal: 0,
  status: '',
  bet: 0
}, action) {

  switch(action.type) { 
    case 'DRAW_CARD':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal
      }
    
    case 'DRAW_CARD_BUST':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal,
        status: 'BUST!'
      }

    default: 
      return state
  }
}


export default(playerReducer)