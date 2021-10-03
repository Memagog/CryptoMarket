import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryAsync, mainData } from './../../redux/dataSlice';
import ModalWindow from './../Modal/Modal';
import { FaBitcoin } from 'react-icons/fa';
import Graphic from './Graphic/Graphic';
export default function CoinInfo() {
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
    useEffect(() => {
        console.log(data)
    }, [])
    return (
        <div>
            <div className="info-container">
                <div className="info-container_info">
                <p>
                    {/* <FaBitcoin className="info-container_info_icon" /> */}
                    <span>{coin.id} {coin.name}</span>
                </p>
                <p>
                    <span>Rank: </span> <span>{coin.rank}</span>
                </p>
                <p>
                    <span>Symbol: </span> <span>{coin.symbol}</span>
                </p>
                <p>
                    <span>Capital: </span>
                    <span>
                    {(coin.marketCapUsd - 0).toFixed(2)}$
                    </span>
                </p>
                <p>
                    <span>supply: </span>
                    <span >
                    {(coin.supply - 0).toFixed(4)}{' '}
                    </span>
                </p>
                <p>
                    <span>Volume: </span>
                    <span>
                    {(coin.volumeUsd24Hr - 0).toFixed(2)}$
                    </span>
                </p>
                <p>
                    <span>Max Value: </span>
                    <span>
                    {(coin.vwap24Hr - 0).toFixed(2)}$
                    </span>
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
            </div>
            </div>
    )
}
