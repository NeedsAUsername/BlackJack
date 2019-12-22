import {cardMap} from '../helpers/cardMap';

export function dealCards(deckId) {
  return (dispatch) => {
    dispatch({type: 'DEALING_CARDS'})
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      const playerCards = data.cards.slice(0,2);
      const dealerCards = data.cards.slice(2,3);
      const playerHandTotal = playerCards.reduce((total, card) => total += cardMap[card.value], 0)
      const dealerHandTotal = dealerCards.reduce((total, card) => total += cardMap[card.value], 0)
      dispatch({
        type: 'DEAL_CARDS',
        playerCards,
        dealerCards,
        playerHandTotal,
        dealerHandTotal
      })
    })
    .catch(error => console.log(error))
  }
}