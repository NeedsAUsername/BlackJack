function dealerReducer(state = {
  hand: [], 
  value: 0
}, action) {

  switch(action.type) { 
    case 'deal':
      const newCard = action.payload[0]
      const newHand = [...state.hand, newCard]
      return {
        ...state,
        newHand
      }

    default: 
      return state
  }
}


export default(dealerReducer)