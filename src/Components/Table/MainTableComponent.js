import React, { useState, useEffect } from 'react';
import MainTableItem from './MainTableItem/MainTableItem';
import { useSelector } from 'react-redux';
import { mainData } from '../../redux/dataSlice';
import PaginationComponent from './Pagination/Pagination';
import { RiArrowUpDownFill } from 'react-icons/ri';

export default function MainTableComponent(props) {
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
            <th scope="col" >Rank</th>
            <th scope="col" >Name</th>
            <th scope="col" >Price</th>
            <th scope="col" >Max</th>
            <th scope="col" ><RiArrowUpDownFill /></th>
            <th scope="col" >Add</th>
          </tr>                    
        </thead>
        <tbody>
          {props.data.slice(pageVisited, pageVisited + perPage).map( e => 
            <MainTableItem scope="row" item = {e}/>
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
