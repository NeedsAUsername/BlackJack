
function deckReducer(state = {
  id: null
}, action) {

  switch(action.type) { 
    case 'GET_DECK':
      return {
        id: action.payload
      }

    default: 
      return state
  }
}


export default(deckReducer)