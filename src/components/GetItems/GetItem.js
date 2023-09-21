import React, { useEffect, useState } from 'react'

import './getItem.css' 

const GetItem = ({obj}) => {

    const [item,setItem]=useState([])

    const getDetails=async (obj)=>{
        const res= await fetch(`http://localhost:4000/api/v1/getAllItems?Dept=${obj.deptName}`)
        const data=await res.json()
        console.log(data.data);
        setItem(data.data);
    }

    useEffect(()=>{
        if(obj!==null){
          console.log(obj)
            getDetails(obj);
        }
    },[obj])
  return (
    <div>
      {item.length!==0 ? (
        <div>
          <h1>Resources that the department offers</h1>
          <ul className='listgroup'>
            {
              item.map((each)=>(
                <li className='listItem'>
                  
                  <p>Item Name: {each.Item_details.Item}</p>
                  <p>Quantity: {each.Quantity}</p>
                  <p>Code: {each.Item_details.Item_code}</p>
                  
                </li>
              ))
            }
          </ul>
        </div>
      ) :(<div>
        <h1>The Organisation does not have any registered resource</h1>
      </div>)}
    </div>
  )
}

export default GetItem