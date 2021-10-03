import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryAsync, mainData } from './../../redux/dataSlice';
import ModalWindow from './../Modal/Modal';
import Graphic from './Graphic/Graphic';
import './CoinInfo.scss';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function CoinInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(mainData);
  const [errorShow, setErrorShow] = useState(true);
  const [coin, setCoin] = useState({
    rank: 1,
    id: '',
    name: 'No Coin',
    symbol: '####',
    priceUsd: '0',
    marketCapUsd: '',
    supply: '',
    volumeUsd24Hr: '',
    vwap24Hr: '',
  });

  const errorView = () => {
    try {
      dispatch(getHistoryAsync(coin.id));
    } catch (error) {
      setErrorShow(false);
    }
  };

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('select-coin'));
    if (local !== null && local !== undefined) {
      setCoin(local);
      dispatch(getHistoryAsync(local.id));
    } else {
      setCoin(data.data.select.id);
      dispatch(getHistoryAsync(data.data.select.id));
    }
  }, []);

  useEffect(() => {
    if (!data.data.history) {
      setErrorShow(true);
    }
  }, []);

  return (
    <div className="coin-info">
      <div className="coin-info__logo-container">
        <span>
          {coin.name}({coin.symbol})#{coin.rank}
        </span>
      </div>
      <div className="coin-info__info-list">
        <p>
          <span>Capital: </span>
          <span>{(coin.marketCapUsd - 0).toFixed(2)}$</span>
        </p>
        <p>
          <span>supply: </span>
          <span>{(coin.supply - 0).toFixed(1)} </span>
        </p>
        <p>
          <span>Volume: </span>
          <span>{(coin.volumeUsd24Hr - 0).toFixed(2)}$</span>
        </p>
        <p>
          <span>Max Value: </span>
          <span>{(coin.vwap24Hr - 0).toFixed(2)}$</span>
        </p>
      </div>
      {data.data.history ? (
        <div className="graphic">
          <Graphic />
        </div>
      ) : (
        <div className="graphic_failed-data">
          <div className="error-window">
            <ModalWindow
              show={errorShow}
              handleClose={errorView}
              title={`Failed data loaded`}
            />
          </div>
        </div>
      )}
      <Button
        variant="light"
        className="coin-info__button-back"
        onClick={() => {
          history.push('/');
        }}
      >
        Back
      </Button>
    </div>
  );
}
