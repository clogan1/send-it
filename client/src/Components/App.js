import '../App.css'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import theme from '../Styling/theme'
import { useEffect, useState } from "react";
import BrowseCardsPage from './BrowseCards/BrowseCardsPage';
import CreateCardPage from './CreateCards/CreateCardPage';
import MyCardsPage from './MyCards/MyCardsPage'
import NavBar from './NavBar'
import ProfilePage from './Profile/ProfilePage';
import EditCardPage from './EditCards/EditCardPage';
import EditContributor from './EditCards/EditContributor'
import CreateTemplatePage from './CreateTemplate/CreateTemplatePage'
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUser } from '../Redux/Actions/index'


function App() {
  const [editTemplate, setEditTemplate] = useState('')
  const [editCard, setEditCard] = useState('')
  const [editContrib, setEditContrib] = useState('')
  const [categories, setCategories] = useState([])
  const [openModal, setOpenModal] = useState(false);
  // const [user, setUser] = useState(null)
  // const [cards, setCards] = useState([])
  // const [myContributions, setMyContributions]= useState([])
  // const [myCards, setMyCards]= useState([])

  const storeUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])

  useEffect(()=>{
    fetch('/categories')
    .then(res => res.json())
    .then(cats => setCategories(cats))
}, [])
  
  // console.log("from store:", storeUser)

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

  // function signoutUser(){
  //   fetch('/logout', {
  //     method: 'DELETE'
  //   }).then((r) => {
  //     if(r.ok){
  //       // setUser(null)
  //       dispatch(logOutUser())
  //     }})
  // }

  // useEffect(() => {
  //   if(storeUser){
  //     fetch(`/users/${storeUser.id}/user_cards`)
  //     .then(res => res.json())
  //     .then(cards => console.log("from user card fetch:", cards))
  //   }
  // }, [] )

  // artist add card to the cards array
  // function addNewTemplate(template){

  // }

 

//   function handleMyCardDelete(id){
//     const newMyCards = myCards.filter(card => card.id !== id)
//     setMyCards(newMyCards)
// }

// function handleAddMyCard(card){
//   setMyCards([card, ...myCards])

// }

  return (
    <ThemeProvider theme={theme}>
      <NavBar  openModal={openModal} setOpenModal={setOpenModal}/>
      <Switch>
          <Route path='/createcard'>
            <CreateCardPage
              editTemplate={editTemplate}
              />
          </Route>
          <Route path='/editcard'>
            <EditCardPage editCard={editCard} />
          </Route>
          <Route path='/editcontributor'>
            <EditContributor editCard={editCard} editContrib={editContrib} />
          </Route>
          <Route path='/mycards'>
            <MyCardsPage 
              setEditCard={setEditCard}
              setEditContrib={setEditContrib} 
              />
          </Route>
          <Route path='/createtemplate'>
            <CreateTemplatePage categories={categories}/>
          </Route>
          <Route path='/myprofile'>
            <ProfilePage />
          </Route>
          <Route exact path='/'>
            <BrowseCardsPage 
              setEditTemplate={setEditTemplate}
              categories={categories}
              setOpenModal={setOpenModal}/>
          </Route>
      </Switch>
     
    </ThemeProvider>
  );
}

export default App;
