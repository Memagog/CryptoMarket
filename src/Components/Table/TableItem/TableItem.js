import React from 'react'
import { BsPlusSquare } from 'react-icons/bs';
export default function TableItem(props) {
    return (
        <tr>
            {Object.values(props.item).map(e =>                 
                <td>{e}</td>
            )}
            <td><BsPlusSquare/></td>
        </tr>
    )
}
