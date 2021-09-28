const initialMyCards = {
    myCards: []
  };
  
  export function myCardsReducer(state = initialMyCards, action) {
    switch (action.type) {
      case "SET_MY_CARDS": {
        return {
          ...state,
          myCards: action.payload
        }
      }

      case "CLEAR_CARDS": {
        return {
          ...state,
          myCards: []
        }
      }

      case "ADD_MY_CARD": {
        return {
          ...state,
          myCards: [action.payload, ...state.myCards]
        }
      }

      case "EDIT_CARD": {
        // console.log("from edit card:", action.payload)
        const newMyCards = state.myCards.map(card => {
            if(card.id === action.payload.id){
              return action.payload
            }
            else return card
          })
        return {
            ...state,
            myCards: newMyCards
            }
      }

      case "DELETE_CARD": {
        const newMyCards = state.myCards.filter(card => card.id !== action.payload.id)
      return {
          ...state,
          myCards: newMyCards
          }
      }

      default:
        return state;
    }
  }