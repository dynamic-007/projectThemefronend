import { useEffect, useState } from 'react';
import axios from "axios"
import './App.css';
import { categoryoptions, ccoptions, deptnameoptions, deptypeoptions, districtoptions, hroptions, options } from './data/equipment';
import MultiSelectAll from './features/multiSelect';

import FilterContext from './context/context';
import PaginatedItems from './features/paginate';
import Modal from './components/RequestForm';
import AppMap from './components/Maps/Map1';


// const hr=["Select all","Search and Rescue Teams for Collapsed Structures","Search and Rescue Teams with canines","Divers Teams","Search  and Rescue Teams for Flood","Oil Installation fire fighting team","High Rise Buildings fire fighting team","Ports  fire fighting team","Aviation  fire fighting team","Mines fire fighting team","Thermal Power Plant fire fighting team","Nuclear Power Plant fire fighting team","General physician","Trauma specialist","Surgeon","Anesthetist","Gynecologist","Radiologist","Paramedics","Lab technicians","OT assistants","Medical first responders","Ham Radio Operators","Search and Rescue Teams for NBC Disasters","Scuba Divers","Driver HMV","Labour","Health workers","Driver LMV","Aapda Mitra","Ex Army Personnel","Ex CAPFs Personnel"]
const distance=(lat1,
  lat2, lon1, lon2)=>{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 = lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 6371;

// calculate the result
return(c * r);
}


function App() {

  const [selectedOptions, setSelectedOptions] = useState({states:"Telangana",districts:[],category:[],items:[],depttype:[],deptname:[]});
  const [data,setData]=useState([]);
  const [formData,setForm]=useState({list:[]});
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    let inioptions=[];
    inioptions.push(...options);
    inioptions.push(...ccoptions);
    inioptions.push(...hroptions);
    // console.log(inioptions);
    setSelectedOptions({...selectedOptions,districts:[{ label: "All", value: "*" }, ...districtoptions],category:[{ label: "All", value: "*" }, ...categoryoptions],items:[{ label: "All", value: "*" }, ...inioptions],depttype:[{ label: "All", value: "*" }, ...deptypeoptions],deptname:[{ label: "All", value: "*" }, ...deptnameoptions]});
   }, []);

   const getDetails=async ()=>{
    console.log("items selected");
    console.log(selectedOptions.items)
    console.log("depttype selected");
    console.log(selectedOptions.depttype)
    const reponse=await axios.get("http://localhost:4000/api/v1/getResource");
    console.log(reponse);
    const {data} =reponse;
    const {resources}=data
    let afterFilter=[];
      if(selectedOptions.items.length!==0){
      afterFilter=resources.filter((each)=>{
        const index=selectedOptions.items.filter((item)=>item.value===each.Item_details.Item);
      
        if(index.length!==0){
          return true;
        }
        return false;
      })
      }
      if(selectedOptions.depttype.length!==0){
        afterFilter=afterFilter.filter((each)=>{
          // const index=selectedOptions.items.filter((item)=>item.value===each.Item_details.Item);
          const index=selectedOptions.depttype.filter((item)=>item.value===each.Item_description.Source)
          if(index.length!==0){
            return true;
          }
          return false;
        })
        }
        if(selectedOptions.districts.length!==0){
          afterFilter=afterFilter.filter((each)=>{
            // const index=selectedOptions.items.filter((item)=>item.value===each.Item_details.Item);
            const index=selectedOptions.districts.filter((item)=>item.value===each.District)
            if(index.length!==0){
              return true;
            }
            return false;
          })
          } 
      
          // 17.13193916301302, 79.6336286313457
    console.log(afterFilter)
    afterFilter=afterFilter.map(each=>({...each,distance:distance(79.6336286313457,each.location.coordinates[1],17.13193916301302,each.location.coordinates[0])}))
    console.log("added distance")
    console.log(afterFilter)
    afterFilter.sort((a, b) => {
      return a.distance - b.distance;
  })
    setData(afterFilter);
   }
   
   const onChangeList=(e,obj)=>{
    if(e.target.checked===true){
      console.log(obj);

      setForm({...formData,list:[...formData.list,{...obj}]})
    }
    else{
      const newL=formData.list.filter((each)=>each._id!==obj._id);
      setForm({...formData,list:[...newL]});
    }
   }


  
   

  return (modalOpen===true ? (<Modal setOpenModal={setModalOpen} list={formData.list} />):(
    <FilterContext.Provider value={{initialState:selectedOptions,selectedList:formData.list,changeListItem:onChangeList,changeCategory:setSelectedOptions}} >
    <form onSubmit={(e)=> {
      e.preventDefault();
      getDetails();
    }} >
    <div>
      <h1>State filter</h1>
      <h1>Select Category</h1>
      <MultiSelectAll element={"districts"} />

      <MultiSelectAll element={"category"} />
    <MultiSelectAll element={"items"}/>
    <MultiSelectAll element={"depttype"}/>
    <MultiSelectAll element={"deptname"} />
    </div>
    <button type="submit">Submit</button>
    </form> 
    {/* <AppMap data={data}/> */}
    <h1>
      Filtered Data
    </h1>
    
      <h1>Confirm Resources</h1>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Request
      </button>
    {/* <ul>
      {
        formData.list.map(each=>{
          const {State,District,Quantity,Item_details,Department_contact_details}=each;
          const {Item,Item_code}=Item_details;
          const {
            Dept_name,Dept_addr,
            Contact_person,Contact_no,Contact_email
            } =Department_contact_details;
          return (
            <li>
              <label><input type="checkbox" onChange={(e)=>onChangeList(e,each)}/> Select</label>
              <h1>{State}</h1>
              <p>{District}</p>
              <p>{Quantity}</p>
              <p>{Item_code}</p>
              <p>{Item}</p>
              <p>{Dept_name}</p>
              <p>{Dept_addr}</p>
            </li>
          );
        })
      }
    </ul> */}
    <PaginatedItems items={data} itemsPerPage={25} />


    </FilterContext.Provider>
  ));
}

export default App;
