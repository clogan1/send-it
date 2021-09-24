import '../App.css'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import theme from '../Styling/theme'
// import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from "react";
import AddCardPage from './AddCards/AddCardPage';
import BrowseCardsPage from './BrowseCards/BrowseCardsPage';
import EditCardPage from './EditCards/EditCardPage';
import MyCardsPage from './MyCards/MyCardsPage'
import NavBar from './NavBar'

function App() {
  const [user, setUser] = useState(null)
  const [cards, setCards] = useState([])
  const [editTemplate, setEditTemplate] = useState('')


  useEffect(() => {
    fetch('/templates')
    .then(res => res.json())
    .then(temps => setCards(temps))
  }, [])

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      }
    })
  }, [])

  // artist add card to the cards array
  // function addNewTemplate(template){

  // }

  function signoutUser(){
    fetch('/logout', {
      method: 'DELETE'
    }).then((r) => {
      if(r.ok){
        setUser(null)
      }})
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar user={user} setUser={setUser} signoutUser={signoutUser}/>
      <Switch>
          <Route path='/addcard'>
            <AddCardPage />
          </Route>
          <Route path='/editcard'>
            <EditCardPage user={user}
              editTemplate={editTemplate}/>
          </Route>
          <Route path='/mycards'>
            <MyCardsPage user={user}/>
          </Route>
          <Route exact path='/'>
            <BrowseCardsPage 
              cards={cards} 
              setEditTemplate={setEditTemplate}
              user={user}/>
          </Route>
      </Switch>
     
    </ThemeProvider>
  );
}

export default App;
