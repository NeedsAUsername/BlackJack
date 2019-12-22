import { cardMap } from '../helpers/cardMap';

export function drawCard(deckId, hand, person) {
  return (dispatch) => {
    dispatch({type: 'DRAWING_CARD'})
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      const drawnCard = data.cards[0];
      hand.push(drawnCard);
      let numberOfAcesValue11 = 0;
      let newHandTotal = 0;
      hand.forEach(card => {
        newHandTotal += cardMap[card.value]
      })
      while (numberOfAcesValue11 > 0 && newHandTotal > 21) {
        newHandTotal -= 10;
        numberOfAcesValue11 -= 1;
      }
      

      if (newHandTotal > 21) {
        dispatch({
          type: person === 'player' ? 'DRAW_CARD_BUST' : 'DEALER_DRAW_CARD_BUST',
          drawnCard,
          newHandTotal
        })
      } else {
        dispatch({
          type: person === 'player' ? 'DRAW_CARD' : 'DEALER_DRAW_CARD',
          drawnCard,
          newHandTotal
        })
      }
    })
    .catch(error => console.log(error))
  }
}