export function shuffleDeck(deckId) {
  return (dispatch) => {
    dispatch({type: 'SHUFFLING_DECK'})
    const url = `https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        dispatch({
          type: 'SHUFFLE_DECK',
          payload: data.deck_id
        })
      } else {
        throw new Error('Could not shuffle deck')
      }
    })
    .catch(error => console.log(error))
  }
}