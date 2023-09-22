import React, { useEffect, useState } from "react";
import "./RequestForm.css";
import { deptname } from "../data/equipment";

function Modal({ setOpenModal,list }) {
  const [requestData,setRequest]=useState([]);
  
  useEffect(()=>{
    const deptwiseList=[];
    const depts=deptname;
    depts.forEach(eachDept => {
      const itemsofDept=list.filter((each)=>each.Department_contact_details.Dept_name===eachDept);
      if(itemsofDept.length!==0){
        console.log(eachDept,itemsofDept)
        deptwiseList.push({deptname:eachDept,items:[...itemsofDept]})
      }
    });
    console.log(deptwiseList)
    setRequest(deptwiseList);
  },[])

  const sendRequest=async ()=>{
    requestData.forEach(element=>{
      fetch("http://localhost:4000/aliens", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({request:{...element},sender:window.localStorage.getItem("user")}),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "Request Successful");
        });
    })
    
  }

  const changeQuantity=(e,deptname,ic)=>{
    
    const item=requestData.filter((each)=>each.deptname===deptname);
    const updatedList=item[0].items.map((each)=>{
      if(each.Item_details.Item_code===ic){
        return {...each,reqQuantity:e.target.value};
      }
      return each;
    })
    const newList=requestData.map(each=>{
      if(each.deptname===deptname){
        return {...each,items:[...updatedList]};
      }
      return each;
    })
    setRequest(newList)
  }


  return (
    <div >
      <div>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
        <ul>
      {
        requestData.map(eachRequest=>{
          return (
          <>
          <h1>Department name: {eachRequest.deptname}</h1>
          <p>Items Requested From the Department are</p>
          {
            eachRequest.items.map(each=>{
            const {State,District,Quantity,Item_details,Department_contact_details}=each;
            const {Item,Item_code}=Item_details;
            const {
              Dept_name,Dept_addr,
              Contact_person,Contact_no,Contact_email
              } =Department_contact_details;
            return (
              <div>
                
                <p>{Item}</p>
                <p>Max Quantity available :{Quantity}</p>
                <input type="text" value={each.reqQuantity} onChange={(e)=>changeQuantity(e,eachRequest.deptname,Item_code)}/>
              </div>
            );
          })
        }
        </>)
        })
       
      }
    </ul>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type="button" onClick={sendRequest}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;