
  //Templates
  
  export function getTemplates() {
    return (dispatch, getState) => {
      fetch('/templates')
        .then(res => res.json())
        .then(temps => {
          dispatch({ type: "SET_TEMPLATES", payload: temps})
        })
    }
  }

  export function addTemplate(template) {
      return (dispatch, getState) => {
        dispatch({ type: "ADD_TEMPLATE", payload: template})
      }
  }

  // Users

  //fetch user if saved in cookies
  export function getLoggedInUser(){
    return (dispatch, getState) => {
        fetch('/me')
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    dispatch( {type: "GET_LOGGED_IN_USER", payload: user })
                    fetch( `/mycards`)
                    .then(res => res.json())
                    .then(cards =>{
                      dispatch( {type: "SET_MY_CARDS", payload: cards })
                    })
                  })
                }
            })
      }
  }


  // log user out
  export function logOutUser(){
    return (dispatch, getState) => {
          dispatch( {type: "LOG_OUT_USER" } )
          dispatch( {type: "CLEAR_CARDS" } )
      }
  }

  //log in user 
  export function logInUser(user){
    return (dispatch, getState) => {
      dispatch( {type: "LOG_IN_USER", payload: user })
      fetch(`/mycards`)
      .then(res => res.json())
      .then(cards =>{
        dispatch( {type: "SET_MY_CARDS", payload: cards })
      })
      }
  }

  //sign in/up new user
  export function signUpUser(user){
    return (dispatch, getState) => {
      dispatch( {type: "SIGN_UP_USER", payload: user })
      fetch( `/mycards`)
      .then(res => res.json())
      .then(cards =>{
        dispatch( {type: "SET_MY_CARDS", payload: cards })
      })
      }
  }


//my cards CRUD


//add card to my cards
export function addMyCard(card) {
  return (dispatch, getState) => {
    dispatch({ type: "ADD_MY_CARD", payload: card})
  }
}

//edit card and update my cards array
export function editMyCard(card) {
  return (dispatch, getState) => {
    dispatch({ type: "EDIT_CARD", payload: card})
  }
}

//delete card from my cards
export function deleteMyCard(card) {
  return (dispatch, getState) => {
    dispatch({ type: "DELETE_CARD", payload: card})
  }
}




