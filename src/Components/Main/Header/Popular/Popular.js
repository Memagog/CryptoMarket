import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { mainData } from './../../../../redux/dataSlice';

export default function Popular() {
  const popCoin = useSelector(mainData);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    setPopular(popCoin.data.coins);
  }, [popCoin]);

  return (
    <div className="popular-list">
      {popular ? (
        popular.slice(0, 3).map((e, i) => (
          <div key={i} className="popular-list__coin">
            {e.name} {(e.priceUsd - 0).toFixed(2)}$
          </div>
        ))
      ) : (
        <div className="popular-list__coin">
          Filled do loading data
        </div>
      )}
    </div>
  );
}