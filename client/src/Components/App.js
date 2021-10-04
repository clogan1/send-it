import '../App.css'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import theme from '../Styling/theme'
import { useEffect, useState } from "react";
import BrowseCardsPage from './BrowseCards/BrowseCardsPage';
import CreateCardPage from './CreateCards/CreateCardPage';
import MyCardsPage from './MyCards/MyCardsPage'
import NavBar from './NavBar'
import Footer from './Footer'
import ProfilePage from './Profile/ProfilePage';
import EditCardPage from './EditCards/EditCardPage';
import EditContributor from './EditCards/EditContributor'
import CreateTemplatePage from './CreateTemplate/CreateTemplatePage'
import { useDispatch } from "react-redux";
import { getLoggedInUser } from '../Redux/Actions/index'


function App() {
  const [editTemplate, setEditTemplate] = useState('')
  const [editCard, setEditCard] = useState('')
  const [editContrib, setEditContrib] = useState('')
  const [categories, setCategories] = useState([])
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])

  useEffect(()=>{
    fetch('/categories')
    .then(res => res.json())
    .then(cats => setCategories(cats))
}, [])


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
      <Footer />
      
     
    </ThemeProvider>
  );
}

export default App;
