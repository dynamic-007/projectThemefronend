import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import FilterContext from '../context/context';

import './paginate.css'

function Items({ currentItems,onChangeList,isSelected }) {
    return (
        <>
          {currentItems &&
            currentItems.map((each) => {
                const {State,District,Quantity,Item_details,Department_contact_details}=each;
                const {Item,Item_code}=Item_details;
                const {
                  Dept_name,Dept_addr,
                  Contact_person,Contact_no,Contact_email
                  } =Department_contact_details;
                return (
                  <div>        
              <label><input id={each._id} type="checkbox" onChange={(e)=>onChangeList(e,each)} checked={isSelected(each._id)}/> Select</label>
              <h1>{State}</h1>
              <p>{District}</p>
              <p>{Quantity}</p>
              <p>{Item_code}</p>
              <p>{Item}</p>
              <Link to={`/profile/${Dept_name}`} target='_blank'><p>{Dept_name}</p></Link>
              <p>{Dept_addr}</p>
        
          
                  </div>
                );
            }
            )}
        </>
      );
          
}

function PaginatedItems({ items,itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <FilterContext.Consumer>{value=>{
        const {changeListItem,isSelected}=value
        return (
        <>
        <Items currentItems={currentItems} onChangeList={changeListItem} isSelected={isSelected} />
        <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}
    >
      <ReactPaginate
      activeClassName={'item active '}
      breakClassName={'item break-me '}
      breakLabel={'...'}
      containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        pageClassName={'item pagination-page '}
        previousClassName={"item previous"}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
      </>
    )}}
     
    </FilterContext.Consumer>
  );
}

export default PaginatedItems;