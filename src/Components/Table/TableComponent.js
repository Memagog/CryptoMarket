import React, { useState, useEffect } from 'react';
import TableItem from './TableItem/TableItem';
import { useSelector } from 'react-redux';
import { mainData } from './../../redux/dataSlice';
import PaginationComponent from './Pagination/Pagination';

export default function TableComponent(props) {
  const main = useSelector(mainData);
  const [len, setLen] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const pageVisited = currentPage * perPage;
  const pageCount = Math.ceil(len / perPage);

  useEffect(() => {
    if (main.data.status === 'fin' && main.data.coins !== undefined) {
      setLen(main.data.coins.length);
    }
  }, [main]);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
      <div>
           <table className="table table-dark table-hover">
                <thead >
                    <tr>                   
                     {props.header.map(e =>
                      <th scope="col" >{e}</th>
                     )}
                    </tr>                    
                </thead>
                <tbody>
                    {props.data.slice(pageVisited, pageVisited + perPage).map( e => 
                      <TableItem scope="row" item = {e}/>
                    )}                    
                </tbody>
            </table>
            <PaginationComponent
              pageVisited={pageVisited}
              perPage={perPage}
              pageCount={pageCount}
              changePage={changePage}
            />
      </div>
  )
}
