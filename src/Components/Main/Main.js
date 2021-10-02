import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mainData } from '../../redux/dataSlice';
import TableComponent from '../Table/TableComponent';
import Header from './Header/Header';
import { getDataAsync } from './../../redux/dataSlice';
import Loader from '../Loader/Loader';
import { RiArrowUpDownFill } from 'react-icons/ri';

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
          symbol: e.symbol,
          priceUsd: e.priceUsd,
          vwap24Hr: e.vwap24Hr,
        })
      )            
      return res
    }
  }, [main])
 
  return (
    <div>
      <Header />
      {load?<Loader/>:<TableComponent data = {table} header = {['Rank','Name','Price','Max',<RiArrowUpDownFill />, 'Add']}/>}
    </div>
  )
}
