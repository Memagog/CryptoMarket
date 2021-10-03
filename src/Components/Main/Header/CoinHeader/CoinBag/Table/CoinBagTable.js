import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { RiArrowUpDownFill } from 'react-icons/ri'
import './CoinBagTable.scss';
export default function CoinBagTable(props) {
  return (
    <div>
       <table className="table table-dark table-hover">
          <thead >          
            <tr>            
              <th scope="col" className="table-index">#</th>
              <th scope="col">Coin</th>
              <th scope="col" className="table-price">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">
                <RiArrowUpDownFill  />
              </th>
              <th scope="col">Count</th>
              <th scope="col">+/-</th>
            </tr>                    
          </thead>
          <tbody>
            {props.storage.map((el, i) => (
              <tr key={i}>
                <th scope="row" className="table-index">
                    {i + 1}
                </th>
                <td>{el.symbol}</td>
                <td className="table-price">{el.price}$</td>
                <td>{(+el.amount).toFixed(2)}$</td>
                <td>{el.changePercent24Hr.substring(0,4)}%</td>
                <td>{el.count}</td>
                <td>
                <FiPlusSquare
                  className="button-plus"
                  onClick={() => props.endChose(el)}
                />
                </td>
              </tr>
            ))}                      
          </tbody>
        </table>
    </div>
  )
}
