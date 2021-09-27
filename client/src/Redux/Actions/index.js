
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
                  })
                }
            })
      }
  }

  //log in user 
  export function logInUser(user){
    return (dispatch, getState) => {
      dispatch( {type: "LOG_IN_USER", payload: user })
      }
  }

  //sign in/up new user
  export function signUpUser(user){
    return (dispatch, getState) => {
      dispatch( {type: "SIGN_UP_USER", payload: user })
      }
  }

  // log user out
  export function logOutUser(){
    return (dispatch, getState) => {
        // fetch('/logout')
        // .then(res => {
        //     if(res.ok){
        //         res.json().then(user => {
          dispatch( {type: "LOG_OUT_USER" } )
            //       })
            //     }
            // })
      }
  }



    // My Cards

//   export function getMyCards(){
//     return (dispatch, getState) => {
//         fetch('/templates')
//           .then(res => res.json())
//           .then(temps => {
//             dispatch({ type: "SET_TEMPLATES", payload: temps})
//           })
//       }
//   }

