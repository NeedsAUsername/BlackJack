function dealerReducer(state = {
  hand: [], 
  handTotal: 0,
  status: ''
}, action) {

  switch(action.type) { 
    case 'DEAL_CARDS':
      return {
        ...state,
        hand: action.dealerCards,
        handTotal: action.dealerHandTotal,
      }

    case 'RESET_HANDS':
      return {
        ...state,
        hand: [],
        handTotal: 0,
        status: 'betting',
      }

    default: 
      return state
  }
}


export default(dealerReducer)