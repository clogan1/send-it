const initialMyCards = {
    myCards: [],
    myContributions: []
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

      case "SET_MY_CONTRIBUTIONS": {
        return {
          ...state,
          myContributions: action.payload
        }
      }

      case "CLEAR_CONTRIBUTIONS": {
        return {
          ...state,
          myContributions: []
        }
      }

      case "EDIT_CONTRIBUTION": {
        // console.log("from edit card:", action.payload)
        const newMyContributor = state.myContributions.map(contrib => {
            if(contrib.id === action.payload.id){
              return action.payload
            }
            else return contrib
          })
        return {
            ...state,
            myContributions: newMyContributor
            }
      }

      default:
        return state;
    }   
  }