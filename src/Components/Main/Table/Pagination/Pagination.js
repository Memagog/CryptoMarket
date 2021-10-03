import React from 'react'
import ReactPaginate from 'react-paginate'
import './Pagination.scss';
export default function PaginationComponent(props) {
    return (
        <div className="pagination"> 
            <p className="pagination__pagination-row">{props.pageVisited+1 + "-"}{props.pageVisited+props.perPage}</p>           
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={props.pageCount}
                onPageChange={props.changePage}
                containerClassName={"pagination__container"}
                previousLinkClassName={"pagination__button_previous"}
                nextLinkClassName={"pagination__button_next"}
                disabledClassName={"pagination__disabled"}
                activeClassName={"pagination__active"}
            />                 
        </div>  
    )
}
