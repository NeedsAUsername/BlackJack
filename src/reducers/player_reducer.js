function playerReducer(state = {
  hand: [],
  handTotal: 0,
  status: 'betting', // betting/playing/bust
  bet: 1,
  cash: 2,
  doubled: false
}, action) {

  switch(action.type) { 
    case 'DRAW_CARD':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal
      }
    
    case 'DOUBLE_DRAW_CARD':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal,
        bet: state.bet * 2,
        doubled: true,
      }
    
    case 'DRAW_CARD_BUST':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal,
        status: 'bust',
        cash: state.cash - state.bet
      }
    
    case 'DOUBLE_DRAW_CARD_BUST':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal,
        status: 'bust',
        cash: state.cash - (state.bet * 2)
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
        cash: state.cash + state.bet,
        bet: state.doubled === true ? state.bet/2 : state.bet,
        doubled: false
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
        status: 'waiting',
        bet: state.doubled === true ? state.bet/2 : state.bet,
        doubled: false
      }
    
    case 'CHANGE_BET':
      const newBet = Number(action.newBet)
      return {
        ...state,
        bet: Number.isNaN(newBet) ? 1 : newBet
      }

    default: 
      return state
  }
}


export default(playerReducer)