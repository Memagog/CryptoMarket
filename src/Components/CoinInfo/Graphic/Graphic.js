import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { mainData } from '../../../redux/dataSlice';
import { useMediaQuery } from 'react-responsive';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function Graphic() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)'
  });
  const graphic = useSelector(mainData);
  const [width, setWidth] = useState(350)
  const [height, setHeight] = useState(400)
  const [data, setData] = useState([
    {
      priceUsd: '',
      time: 0,
      date: '',
    },
  ]);

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setWidth(1000)
      setHeight(500)
    }
    else if(isTablet){
      setWidth(700)
      setHeight(500)
    }
  }, [isDesktopOrLaptop]);

  useEffect(() => {   
    setData(graphic.data.history);
  }, [graphic]);

  const max = useMemo(() => {
    let res = [];
    if (graphic.data.history.length > 0) {
      graphic.data.history.forEach(e => {
        res.push(e.priceUsd);
      });
    }
    if (res.length > 0) {
      return Math.max(...res) | 0
    }
  }, [graphic]);

  return (
    <>
      <LineChart  width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis padding={{ left: 40, right: 40 }} />
        <YAxis type="number" domain={[0, max + max * 0.1]} />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="priceUsd"
          stroke="#f92371"
          activeDot={{ r: 4 }}
          dot={false}
        />
        {/* <Line type="monotone"  stroke="#82ca9d" /> */}
      </LineChart>       
    </>
    
  );
}
