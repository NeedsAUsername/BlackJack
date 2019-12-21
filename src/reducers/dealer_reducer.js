import { cardMap } from '../helpers/cardMap';

function dealerReducer(state = {
  hand: [], 
  handTotal: 0
}, action) {

  switch(action.type) { 
    case 'DEALER_DRAW':
      const newCard = action.payload[0]
      const newHand = [...state.hand, newCard]
      const newValue = state.handTotal + cardMap[newCard.value]
      return {
        ...state,
        hand: newHand,
        handTotal: newValue
      }

    default: 
      return state
  }
}


export default(dealerReducer)