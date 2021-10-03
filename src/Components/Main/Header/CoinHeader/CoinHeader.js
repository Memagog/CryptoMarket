import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { coinCount } from './../../../../redux/coinSlice';
import ModalWindow from '../../../Modal/Modal';
import CoinBag from './CoinBag/CoinBag';

export default function HeaderBag() {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const myBag = useSelector(coinCount);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const myMoney = useMemo(() => {
    let sum = 0;
    if (myBag.coin.coins) {
      myBag.coin.coins.forEach(e => {
        sum += e.amount - 0;
      });
      setAmount();
    }
    return sum;
  }, [myBag]);

  const initialDif = useMemo(() => {
    let count = 0;
    let init = JSON.parse(localStorage.getItem('initialCoinBag'));
    if (init !== 0 && init !== null && init.length !== 0) {
      init.forEach(e => {
        count += e.amount - 0;
      });
      setAmount(count);
      return ((myMoney - count) / count) * 100;
    } else {
      return 0;
    }
  }, [myBag]);

  return (
    <div>
      <div className="header__coin-bag" onClick={handleShow}>
        <span>{myMoney.toFixed(2)} USD </span>
        <div>
          <span className="header__coin-bag_pre-procentage">
            {isNaN(myMoney - amount) ? '0' : (myMoney - amount).toFixed(2)}
          </span>
          <span className="header__coin-bag_dif-procentage">
            <td>({initialDif === 0 ? '0' : initialDif.toFixed(2)}%)</td>
          </span>
        </div>
      </div>
      <ModalWindow
        title={'My coin Bag'}
        show={show}
        handleClose={handleClose}
        body={<CoinBag />}
        size={'lg'}
      />
    </div>
  );
}
