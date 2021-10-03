import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { RiArrowUpDownFill } from 'react-icons/ri'

export default function CoinBagTable(props) {
  return (
    <div>
       <table className="table table-dark table-hover">
          <thead >          
            <tr>            
              <th scope="col">#</th>
              <th scope="col">Coin</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">
                <RiArrowUpDownFill style={{ marginLeft: '10px' }} />
              </th>
              <th scope="col">Count</th>
              <th scope="col">Change</th>
            </tr>                    
          </thead>
          <tbody>
            {props.storage.map((el, i) => (
              <tr key={i}>
                <th scope="row" className="table-index">
                    {i + 1}
                </th>
                <td>{el.symbol}</td>
                <td>{el.price}</td>
                <td>{el.amount}</td>
                <td>{el.changePercent24Hr}</td>
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
