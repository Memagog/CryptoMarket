import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import Main from './Components/Main/Main';
import CoinInfo from './Components/CoinInfo/CoinInfo'
import { useDispatch } from "react-redux";
import { getDataAsync } from "./redux/dataSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

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
