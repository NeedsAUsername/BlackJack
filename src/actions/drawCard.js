export function drawCard(deckId) {
  return (dispatch) => {
    dispatch({type: 'DRAWING_CARD'})
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: 'DRAW_CARD',
        payload: data.cards
      })
    })
    .catch(error => console.log(error))
  }
}