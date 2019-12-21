export function resetHands() {
  return (dispatch) => {
    dispatch({
      type: 'RESET_HANDS',
    })
  }
}