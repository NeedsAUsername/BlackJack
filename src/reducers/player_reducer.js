function playerReducer(state = {
  hand: [],
  handTotal: 0,
  status: 'betting', // betting/playing/bust
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
        status: 'bust'
      }
    
    case 'DEAL_CARDS':
      return {
        ...state,
        hand: action.cards,
        handTotal: action.handTotal,
        status: 'playing'
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


export default(playerReducer)