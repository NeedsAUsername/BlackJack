export function changeBet(bet) {
  return {
    type: 'CHANGE_BET',
    newBet: bet
  }
}