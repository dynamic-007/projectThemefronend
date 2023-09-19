import React, { useEffect,useState } from 'react'

const SenderPage = () => {
    const [requests,setRequest]=useState([]);

    const getDetails=async ()=>{
        const senderId=window.localStorage.getItem("user");
        if(senderId!==undefined){
            const response=await fetch(`http://localhost:4000/aliens/${senderId}`);
            const res=await response.json();
            console.log(res)
            const data=Object.values(res.data)
            console.log(data);
            setRequest(data);
        }
    }
    useEffect(()=>{
        getDetails();
    },[])
  return (
    <div>
    <div>Asked for Help to the other departments</div>
    {
        requests.length!==0 && requests.map(each=>(
            <div>
                <h1> ASked department: ${each.receiverId}</h1>
                <p>Items ASked</p>
                <ul>
                    {
                        each.resourcesRequested.map(item=>(
                            <li>
                                <div>
                                    <p>{item.Item_details.Item}</p>
                                    <p>{item.Item_details.Item_code}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <p>Resources Granted</p>
                <ul>
                    {
                        each.resourcesGranted.length!==0 && each.resourcesGranted.map(item=>(
                            <li>
                                <div>
                                    <p>{item.Item_details.Item}</p>
                                    <p>{item.Item_details.Item_code}</p>
                                    <p>Status:{item.status}</p>
                                </div>
                            </li>
                        ))
                    }
                    {
                       each.resourcesGranted.length===0 && (<div>Resources not yet granted from the department</div>) 
                    }
                </ul>
            </div>
        ))
    }
    </div>
  )
}

export default SenderPage