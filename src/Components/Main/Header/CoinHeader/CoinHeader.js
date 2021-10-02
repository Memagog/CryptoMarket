import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { coinCount } from './../../../../redux/coinSlice';

export default function HeaderBag() {
  const [show, setShow] = useState(false);
  const [proc, setProc] = useState(0);
  const myBag = useSelector(coinCount);

  const handleClose = () => {
    setShow(false);
  };

  const myMoney = useMemo(() => {
    let sum = 0;
    let count = 0;
    if (myBag.coin.coins) {
      myBag.coin.coins.forEach(e => {
        sum += e.amount - 0;
        count += e.changePercent24Hr - 0;
      });
      setProc(count / myBag.coin.coins.length);
    }
    return sum;
  }, [myBag]);

  const initialDif = useMemo(() => {
    let count = 0;
    let init = JSON.parse(localStorage.getItem('initialCoinBag'))
    if (init !== 0 && init !== null && init.length !== 0) {
      init.forEach(e => {
        count += e.amount - 0;
      });
      return ((myMoney - count) / count) * 100;
    } else {
      return 0;
    }
  }, [myBag]);

  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="header__coin-bag" onClick={handleShow}>
        <span>{myMoney} USD </span>
        <div>
          <span className="header__coin-bag_pre-procentage">
            {isNaN(proc) ? 0 : proc.toFixed(3)}
          </span>
          <span className="header__coin-bag_dif-procentage">
            {initialDif > 9999 || (initialDif < 1 && initialDif !== 0) ? (
              <td>
                <div className="hover-row" data-hover={`${initialDif}%`}>
                  (
                  {initialDif === 0 ? '0.0' : (initialDif + '').substring(0, 4)}
                  ...%)
                </div>
              </td>
            ) : (
              <td>({initialDif === 0 ? '0' : initialDif.toFixed(4)}%)</td>
            )}
          </span>
        </div>
      </div>      
    </div>
  );
}
