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

      case "ADD_CARD": {
        return {
          ...state,
          myCards: [...state.myCards, action.payload]
        }
      }

      case "EDIT_CARD": {
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
        return {
          ...state,
          myCards: [...myCards.templates, action.payload]
        }
      }

      default:
        return state;
    }
  }