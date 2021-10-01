import './App.scss';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import Main from './Main/Main.js';
import CoinInfo from './CoinInfo/CoinInfo';

export default function App() {
  return (
    <Router>        
        <Switch>
          <Route exact path="/"> 
           <Main/>
          </Route>
          <Route path="/coin">
           <CoinInfo />
          </Route>          
        </Switch>      
    </Router>
  );
}
