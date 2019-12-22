export function endRound() {
  return (dispatch) => {
    dispatch({
      type: 'END_ROUND',
    })
  }
}