import {cardMap} from '../helpers/cardMap';
import { calculateHandTotal } from '../helpers/calculateHandTotal';

function playerReducer(state = {
  hand: [],
  splitHand: [],
  handTotal: 0,
  status: 'betting', // betting/playing/bust/standing/waiting/splitStand/splitBust
  bet: 1,
  cash: 0,
  doubled: false,
  isSplit: false,
  playingSplitHand: false, // on the split Hand
  roundMessage: ''
}, action) {

  switch(action.type) { 
    case 'DRAW_CARD':
      return {
        ...state,
        hand: state.playingSplitHand ? state.hand : [...state.hand, action.drawnCard],
        splitHand: state.playingSplitHand ? [...state.splitHand, action.drawnCard] : state.splitHand,
        handTotal: (state.playingSplitHand) ? state.handTotal : action.newHandTotal,
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
        hand: state.playingSplitHand ? state.hand : [...state.hand, action.drawnCard],
        splitHand: state.playingSplitHand ? [...state.splitHand, action.drawnCard] : state.splitHand,
        handTotal: (state.playingSplitHand) ? state.handTotal : action.newHandTotal,
        status: (state.isSplit && !state.playingSplitHand) ? 'splitBust' : 'bust',
        cash: state.cash - state.bet,
        playingSplitHand: (state.isSplit && !state.playingSplitHand) ? true : false,
      }
    
    case 'DOUBLE_DRAW_CARD_BUST':
      return {
        ...state,
        hand: [...state.hand, action.drawnCard],
        handTotal: action.newHandTotal,
        status: 'bust',
        cash: state.cash - (state.bet * 2),
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
        splitHand: [],
        handTotal: 0,
        status: 'betting',
        isSplit: false,
        playingSplitHand: false,
        roundMessage: ''
      }

    case 'STAND': 
      return {
        ...state, 
        status: 'standing'
      }
    
    case 'SPLIT_STAND':
      return {
        ...state,
        status: 'splitStand',
        playingSplitHand: true,
      }
    
    case 'SPLIT':
      return {
        ...state,
        hand: [state.hand[0]],
        handTotal: cardMap[state.hand[0].value],
        splitHand: [state.hand[1]],
        isSplit: true
      }
    
    case 'DEALER_DRAW_CARD_BUST': 
      let bet = state.bet
      if (state.isSplit) {
        if (state.handTotal <= 21 && calculateHandTotal(state.splitHand) <= 21) {
          bet *= 2
        }
      }
      return {
        ...state,
        status: 'waiting',
        cash: state.cash + bet,
        bet: state.doubled === true ? bet/2 : bet,
        doubled: false
      }

    case 'CALCULATE_WINNER':
      let newCash = state.cash
      let roundMessage = 'Push'
      // score used when player splits hands
      if (action.score) {
        newCash += (state.bet * action.score)
        if (action.winner === 'player') {
          roundMessage = 'Player Wins'
        } else if (action.winner === 'dealer') {
          roundMessage = 'Dealer Wins'
        }
      }
      // normal games without split hands
      else if (action.winner === 'player') {
        newCash += state.bet
        roundMessage = 'Player Wins'
      } else if (action.winner === 'dealer') {
        newCash -= state.bet
        roundMessage = 'Dealer Wins'
      } return {
        ...state,
        cash: newCash,
        status: 'waiting',
        bet: state.doubled === true ? state.bet/2 : state.bet,
        doubled: false,
        roundMessage
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