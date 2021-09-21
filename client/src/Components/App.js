import '../App.css'
import { Switch, Route } from "react-router-dom";
// import { ThemeProvider, createTheme } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
// import { useEffect, useState } from "react";
import AddCardPage from './AddCards/AddCardPage';
import BrowseCardsPage from './BrowseCards/BrowseCardsPage';
import EditCardPage from './EditCards/EditCardPage';
import MyCardsPage from './MyCards/MyCardsPage'


function App() {
  return (
    <div className="App">
      Send It

      <Switch>
          <Route path='/addcard'>
            <AddCardPage />
          </Route>
          <Route path='/editcard'>
            <EditCardPage />
          </Route>
          <Route path='/mycards'>
            <MyCardsPage />
          </Route>
          <Route exact path='/'>
            <BrowseCardsPage />
          </Route>
      </Switch>
     
    </div>
  );
}

export default App;
