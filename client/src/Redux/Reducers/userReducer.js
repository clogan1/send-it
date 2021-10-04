const initialUser = {
    user: null
  };
  
  export function userReducer(state = initialUser, action) {
    switch (action.type) {
      case "GET_LOGGED_IN_USER": {
        return {
          ...state,
          user: action.payload
        }
      }

      case "LOG_IN_USER": {
        return {
          ...state,
          user: action.payload
        }
      }

      case "SIGN_UP_USER": {
        return {
          ...state,
          user: action.payload
        }
      }

      case "LOG_OUT_USER": {
        return {
          ...state,
          user: null
        }
      }

      case "UPDATE_USER": {
        return {
          ...state,
          user: action.payload
        }
      }

      
      default:
        return state;
    }
  }