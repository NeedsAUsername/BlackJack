function playerReducer(state = {
  hand: [],
  handTotal: 0,
  status: 'betting', // betting/playing/bust
  bet: 1,
  cash: 100
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
        status: 'bust',
        cash: state.cash - state.bet
      }
    
    case 'DEAL_CARDS':
      return {
        ...state,
        hand: action.playerCards,
        handTotal: action.playerHandTotal,
        status: 'playing'
      }

    case 'RESET_HANDS':
      return {
        ...state,
        hand: [],
        handTotal: 0,
        status: 'betting'
      }

    case 'STAND': 
      return {
        ...state, 
        status: 'standing'
      }
    
    case 'DEALER_DRAW_CARD_BUST':
      return {
        ...state,
        status: 'waiting',
        cash: state.cash + state.bet
      }

    case 'CALCULATE_WINNER':
      let newCash = state.cash;
      if (action.winner === 'player') {
        newCash += state.bet
      } else if (action.winner === 'dealer') {
        newCash -= state.bet
      }
      return {
        ...state,
        cash: newCash,
        status: 'waiting'
      }
    
    case 'CHANGE_BET':
      return {
        ...state,
        bet: action.newBet
      }

    default: 
      return state
  }
}


export default(playerReducer)