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
                <thead>
                    <tr>
                      {Object.keys(props.data[0]).map( e => 
                        <th style = {{ backgroundColor: 'grey' }}>{e}</th>
                      )}
                      <th style = {{ backgroundColor: 'grey' }}>+/-</th>
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
