import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mainData } from '../../redux/dataSlice';
import MainTableComponent from '../Table/MainTableComponent';
import Header from './Header/Header';
import { getDataAsync } from './../../redux/dataSlice';
import Loader from '../Loader/Loader';
import './Main.scss';

export default function Main() {  
  const main = useSelector(mainData);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);  

  const table = useMemo(() => {
    let res = [];
    if (main.data.coins === undefined) {
      setLoad(true);     
      dispatch(getDataAsync());      
    }
    else {
      setLoad(false);
      main.data.coins.map( e => 
        res.push({
          rank: e.rank,
          name: e.name,
          symbol: e.symbol,
          priceUsd: e.priceUsd,
          vwap24Hr: e.vwap24Hr,
          changePercent24Hr: e.changePercent24Hr,
        })
      )            
      return res;
    }
  }, [main])
 
  return (
    <div className="main">
      <div className="container__header">
        <Header />
      </div>
      <div className="container__table">
        {load?<Loader/>:<MainTableComponent data = {table} />}
      </div>     
    </div>
  )
}
