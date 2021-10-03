import React, {useState} from 'react'
import { BsPlusSquare } from 'react-icons/bs';
import { useHistory } from 'react-router';
import BuyForm from '../../../BuyForm/BuyForm';
import ModalWindow from '../../../Modal/Modal';
import { useDispatch } from 'react-redux';
import { selectCoin } from '../../../../redux/dataSlice';

export default function MainTableItem(props) {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false); 
    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const percentRender = (price, max) => {
        let change = (max - price) / max * 100;
        if(change > 0) return <td style = {{ color: 'green', paddingLeft: '4px' }}>{change.toFixed(2)}%</td>
        else return <td style = {{ color: 'red' }}>{change.toFixed(2)}%</td>
    }

    const checkCoin = target => {
      localStorage.setItem('select-coin', JSON.stringify(target));
      dispatch(selectCoin(target));
      history.push('/coin');
    };

    return (
        <>  
          <tr>                      
            <td onClick={() => checkCoin(props.item)}>{props.item.rank}</td>
            <td onClick={() => checkCoin(props.item)}>{props.item.symbol}</td>
            <td onClick={() => checkCoin(props.item)}>{props.item.priceUsd.substring(0,8)}$</td>
            <td onClick={() => checkCoin(props.item)}>{props.item.vwap24Hr.substring(0,8)}$</td>
            <td onClick={() => checkCoin(props.item)}>{percentRender(props.item.priceUsd, props.item.vwap24Hr)}</td>           
            <td><BsPlusSquare className="button-plus" onClick = {()=>handleShow()}/></td>
          </tr>         
          <ModalWindow 
            show = {show} 
            handleClose = {handleClose} 
            title = {'Buy Crypto Coin'} 
            body = {<BuyForm coin = {props.item}/>} 
            coin={props.item} 
            footer= {`${props.item.symbol} ${props.item.priceUsd.substring(0,8)}$`}
            size={'lg'}
          />
        </>
      
    )
}
