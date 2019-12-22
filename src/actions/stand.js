export function stand() {
  return (dispatch) => {
    dispatch({
      type: 'STAND',
    })
  }
}