
import React, { useEffect,useState } from 'react'

const ReceiverPage = () => {
    const [requests,setRequest]=useState([]);
    const [granted,setGrant]=useState([]);

    const getDetails=async()=>{
        const receiverId=window.localStorage.getItem("user");
        if(receiverId!==undefined){
            const response=await fetch(`http://localhost:4000/aliens/byid/${receiverId}`);
            const res=await response.json();
            console.log(res.data)
            const data=Object.values(res.data)
        
            setRequest(data);
        }
    }
    const AcceptRequest=(id,data)=>{
        let filtered=granted.filter(each=>each._id===id)
        console.log(filtered);
        if(filtered.length===0){
            filtered={_id:id,resourcesGranted:[{...data,status:"Accepted"}]}
            const array=[...granted]
            array.push(filtered);
            console.log(array)
            setGrant(array)
        }
        else{
            console.log("already presnt");
            
            filtered[0].resourcesGranted.push({...data,status:"Accepted"});
            const updatedList=granted.map(each=>{
                if(each._id===id){
                    return filtered[0]
                }
                return each
            })
            console.log("global");
            console.log(updatedList);
            setGrant(updatedList);
        }

        let filtered1 = requests.map(each=> {
            if(each._id===id){
                each.resourcesRequested=each.resourcesRequested.map(each=>{
                    if(each._id===data._id){
                        return {...each,status:"Accepted"}
                    }
                    return each
                })}
            return each;
        });
        setRequest(filtered1)
    
    }

    const CancelRequest=(id,data)=>{
        let filtered = granted.map(each=> {
            if(each._id===id){
                each.resourcesGranted=each.resourcesGranted.filter(each=>each._id!==data._id)
            }
            return each;
        });
        

        let filtered1 = requests.map(each=> {
            if(each._id===id){
                each.resourcesRequested=each.resourcesRequested.map(each=>{
                    if(each._id===data._id){
                        return {...each,status:"Pending"}
                    }
                    return each
                })}
            return each;
        });
        setGrant(filtered)
        setRequest(filtered1)
        
    
    }


    const updateDatabase=async (id)=>{
        const filtered=granted.filter(each=>each._id===id);
        if(filtered.length!==0){
            let req=requests.filter(each=>each._id===id);
            const response=await fetch(`http://localhost:4000/aliens/senderId/${id}`,{
                method: "PUT",
            crossDomain: true,
            headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({resourcesGranted:filtered[0].resourcesGranted,resourcesRequested:req[0].resourcesRequested,Status:"Accepted"}),
            });
            console.log(response);
        }
        
    }

    useEffect(()=>{
        getDetails();
    },[])

    

  return (
    <div>
    <div>Requests Received from various Departments</div>
    
    <ul>
        {requests.map((element)=>(
            <div>
                <h1>{element.senderId}</h1>
                <ul>
                    {element.resourcesRequested.map(each=>(
                        <li>
                            <div>
                                <h1>{each.Item_details.Item}</h1>
                                <p>{each.Item_details.Item_code}</p>
                                <p>Qunatity: 5</p>
                                <p>{each.status}</p>
                                <div>
                                    <button type="button" onClick={()=>AcceptRequest(element._id,each)}>{each.status==="Accepted"?"Accepted":"Accept"}</button>
                                    <button type="button" onClick={()=>CancelRequest(element._id,each)}>Cancel</button>
                                </div>
                                </div>
                            </li>
                        
                    ))}
                </ul>
                <button type="button" onClick={()=>{
                    updateDatabase(element._id)
                    
                    }}>Update</button>
            </div>
        ))}
    </ul>
    </div>
  )
}

export default ReceiverPage