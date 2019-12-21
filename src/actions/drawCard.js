import { cardMap } from '../helpers/cardMap';

export function drawCard(deckId, handTotal) {
  return (dispatch) => {
    dispatch({type: 'DRAWING_CARD'})
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      const drawnCard = data.cards[0];
      const cardValue = cardMap[drawnCard.value];
      const newHandTotal = handTotal + cardValue;
      if (newHandTotal > 21) {
        dispatch({
          type: 'DRAW_CARD_BUST',
          drawnCard,
          newHandTotal
        })
      } else {
        dispatch({ 
          type: 'DRAW_CARD',
          drawnCard,
          newHandTotal
        })
      }
    })
    .catch(error => console.log(error))
  }
}