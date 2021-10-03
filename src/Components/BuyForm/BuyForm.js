import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { addCoin, coinCount } from '../../redux/coinSlice';
import ModalWindow from '../Modal/Modal';
export default function BuyForm(props) {
  const dispatch = useDispatch();
  const coin = useSelector(coinCount);
  const [errorShow, setErrorShow] = useState(false);
  const [count, setCount] = useState(0);
  const [bag, setBag] = useState({});
  const [flag, setFlag] = useState(false); 
  
  const errorView = () => setErrorShow(false);

  const addCoinBag = () => {
    setFlag(!flag);
    if (!isNaN(count - 0) && count > 0) {      
      dispatch(addCoin(bag));
    } else {
      setErrorShow(true);
    }
    //console.log(coin) localStorage dif
  };

  useEffect(() => {    
    setBag({
      id: uuidv4(),
      rank: props.coin.rank,
      name:  props.coin.name,
      price: (+props.coin.priceUsd).toFixed(2),
      amount: count * (+props.coin.priceUsd),
      count: count,
      symbol:  props.coin.symbol,
      changePercent24Hr:  props.coin.changePercent24Hr,
    });
  }, [count, flag]);

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Count</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <FormControl
          aria-label="Dollar amount (with dot and two decimal places)"
          onChange={e => {
            setCount(e.target.value);
          }}
          style={errorShow ? { color: 'red' } : { color: 'black' }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={addCoinBag}
        >
          Buy
        </Button>
      </InputGroup>    
      <ModalWindow 
        style = {{backgroundColor: 'red'}} 
        show = {errorShow} 
        handleClose = {errorView} 
        title = {`Error Window`} 
        body = {`Input Only Numbers`} 
        size = {'sm'} 
      />
    </div>
  );
}
BuyForm.propTypes = {
  name: PropTypes.string,
  priceUsd: PropTypes.string,
  rank: PropTypes.string,
  changePercent: PropTypes.string,
};