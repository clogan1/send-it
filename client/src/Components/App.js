import '../App.css'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import theme from '../Styling/theme'
// import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from "react";
import BrowseCardsPage from './BrowseCards/BrowseCardsPage';
import CreateCardPage from './CreateCards/CreateCardPage';
import MyCardsPage from './MyCards/MyCardsPage'
import NavBar from './NavBar'
import ProfilePage from './Profile/ProfilePage';
import EditCardPage from './EditCards/EditCardPage'
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUser, logOutUser } from '../Redux/Actions/index'


function App() {
  const [user, setUser] = useState(null)
  const [myCards, setMyCards]= useState([])
  const [editTemplate, setEditTemplate] = useState('')
  const [editCard, setEditCard] = useState('')
  const [categories, setCategories] = useState([])
  // const [cards, setCards] = useState([])
  // const [myContributions, setMyContributions]= useState([])

  const storeUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])
  
  console.log("from store:", storeUser)

  // replaced by Redux
  // useEffect(() => {
  //   fetch('/templates')
  //   .then(res => res.json())
  //   .then(temps => setCards(temps))
  // }, [])

  // replaced by Redux
  // useEffect(() => {
  //   fetch('/me')
  //   .then(res => {
  //     if(res.ok){
  //       res.json().then(user => setUser(user))
  //     }
  //   })
  // }, [])

  useEffect(() => {
    if(user){
      fetch(`/users/${storeUser.id}/user_cards`)
      .then(res => res.json())
      .then(setMyCards)
    }
  }, [user] )

  useEffect(()=>{
    fetch('/categories')
    .then(res => res.json())
    .then(cats => setCategories(cats))
}, [])

  // artist add card to the cards array
  // function addNewTemplate(template){

  // }

  function signoutUser(){
    fetch('/logout', {
      method: 'DELETE'
    }).then((r) => {
      if(r.ok){
        // setUser(null)
        dispatch(logOutUser())
      }})
  }

  function handleMyCardDelete(id){
    const newMyCards = myCards.filter(card => card.id !== id)
    setMyCards(newMyCards)
}

function handleAddMyCard(card){
  setMyCards([card, ...myCards])

}

  return (
    <ThemeProvider theme={theme}>
      <NavBar user={user} setUser={setUser} signoutUser={signoutUser}/>
      <Switch>
          {/* <Route path='/addcard'>
            <AddCardPage />
          </Route> */}
          <Route path='/createcard'>
            <CreateCardPage user={user}
              editTemplate={editTemplate}
              handleAddMyCard={handleAddMyCard}/>
          </Route>
          <Route path='/editcard'>
            <EditCardPage editCard={editCard}/>
          </Route>
          <Route path='/mycards'>
            <MyCardsPage user={user} 
              setEditCard={setEditCard} 
              myCards={myCards} 
              setMyCards={setMyCards}
              handleMyCardDelete={handleMyCardDelete}
              />
          </Route>
          <Route path='/myprofile'>
            <ProfilePage user={user}/>
          </Route>
          <Route exact path='/'>
            <BrowseCardsPage 
              // cards={cards} 
              setEditTemplate={setEditTemplate}
              user={user}
              categories={categories}/>
          </Route>
      </Switch>
     
    </ThemeProvider>
  );
}

export default App;
