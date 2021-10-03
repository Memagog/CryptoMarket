import React from 'react'
import { RiArrowUpDownFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { coinCount, shopCoin } from '../../../../../redux/coinSlice';
import { FiPlusSquare } from 'react-icons/fi';
import ModalWindow from '../../../../Modal/Modal';
import { Button, ButtonGroup } from 'react-bootstrap';
import CoinBagForm from './Form/CoinBagForm';
import CoinBagTable from './Table/CoinBagTable';



export default function CoinBag() {
    const dispatch = useDispatch();
    const coinBag = useSelector(coinCount);
    const [storage, setStorage] = useState([]);  
    const [errorShow, setErrorShow] = useState(false);
    const [value, setValue] = useState('0');
    const [item, setItem] = useState({});    
    const [show, setShow] = useState(false);     

    useEffect(() => {      
        let local = JSON.parse(localStorage.getItem('coinBag'));
        if (local === null) {
            setStorage(coinBag.coin.coins);      
        } else {
            setStorage(local);
        }
    }, [coinBag]);

    const shopCoinBag = () => {
      setShow(false);
      dispatch(shopCoin(item));
    };

    const endChose = e => {
      if (!isNaN(value - 0) && e.count - 0 + (value - 0) >= 0) {
        setItem({
          symbol: e.symbol,
          amount: e.price*((e.count-0) + (value-0)) ,
          changePercent24Hr: e.changePercent24Hr,
          count: (e.count - 0) + (value - 0),
          id: e.id,
          name: e.name,
          price: e.price,
        });
        setShow(true);
      } else {
        setErrorShow(true);
      }
    };

    return (
      <div>
        <CoinBagTable storage = {storage} endChose = {endChose}/>
        <CoinBagForm onChangeValue = {(e) => setValue(e.target.value)}/>
        <ModalWindow 
          style = {{backgroundColor: 'red'}} 
          show = {errorShow} 
          handleClose = {() => setErrorShow(false)} 
          title = {`Error Window`} 
          body = {`Input Only Numbers`} 
          size = {'sm'} 
        />   
        <ModalWindow          
          show = {show} 
          handleClose = {() => setShow(false)} 
          title = {`Want to ${value >= 0 ? 'buy ': 'sell '} coins?`}           
          body = {
            <ButtonGroup style= {{display: 'flex'}}>
              <Button variant="secondary" onClick = {() => setShow(false)}>
                  No
              </Button>              
              <Button variant="dark" onClick = {() => shopCoinBag()}>
                  Yes
              </Button>
            </ButtonGroup>
          } 
          size = {'sm'} 
        />       
      </div>
  )
}
