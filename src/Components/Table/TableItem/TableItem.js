import React from 'react'
import { BsPlusSquare } from 'react-icons/bs';


export default function TableItem(props) {
    const percentRender = (price, max) => {
        let change = (max - price) / max * 100;
        if(change > 0) return <td style = {{ color: 'green', paddingLeft: '4px' }}>{change.toFixed(2)}</td>
        else return <td style = {{ color: 'red' }}>{change.toFixed(2)}</td>
    }
    return (
        <tr>            
            <td>{props.item.rank}</td>
            <td>{props.item.symbol}</td>
            <td>{props.item.priceUsd}</td>
            <td>{props.item.vwap24Hr}</td>
            <td>{percentRender(props.item.priceUsd, props.item.vwap24Hr)}</td>
            <td><BsPlusSquare/></td>
        </tr>
    )
}
