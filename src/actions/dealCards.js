import {cardMap} from '../helpers/cardMap';

export function dealCards(deckId) {
  return (dispatch) => {
    dispatch({type: 'DEALING_CARDS'})
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      const handTotal = data.cards.reduce((total, card) => total += cardMap[card.value], 0)
      dispatch({
        type: 'DEAL_CARDS',
        cards: data.cards,
        handTotal
      })
    })
    .catch(error => console.log(error))
  }
}