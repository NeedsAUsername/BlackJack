import { cardMap } from '../helpers/cardMap';

function playerReducer(state = {
  hand: [],
  value: 0
}, action) {

  switch(action.type) { 
    case 'DRAW_CARD':
      const newCard = action.payload[0]
      const newHand = [...state.hand, newCard]
      const newValue = state.value + cardMap[newCard.value]
      return {
        ...state,
        hand: newHand
      }

    default: 
      return state
  }
}


export default(playerReducer)