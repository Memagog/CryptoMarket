import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import TableItem from './TableItem/TableItem';

export default function TableComponent(props) {
    
    useEffect(() => {

      console.log();
    
    }, [props])

    return (
      <div>
           <Table bordered hover variant="dark">
                <thead >
                    <tr>                   
                     {props.header.map(e =>
                      <th style = {{ backgroundColor: '#bdbfc1', color: 'black' }}>{e}</th>
                     )}
                    </tr>                    
                </thead>
                <tbody>
                    {props.data.map( e => 
                      <TableItem item = {e}/>
                    )}                    
                </tbody>
            </Table>
      </div>
    )
}
