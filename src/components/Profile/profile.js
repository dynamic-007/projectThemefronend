import React, { useEffect, useState } from 'react';
import './profile.css';
import Map from '../Maps/Map1';
import GetItem from '../GetItems/GetItem';


function SearchOrganization() {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationData, setOrganizationData] = useState(null);

  const handleInputChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchOrganization?organizationName=${organizationName}`);
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setOrganizationData(data);
      } else {
        setOrganizationData(null);
      }


    } catch (error) {
      console.error('Error searching for organization:', error);
      setOrganizationData(null);
    }

  };

  const setProfile=async ()=>{
    const userid=window.localStorage.getItem("user");
    if(userid!==undefined){
    const response=await fetch(`http://localhost:4000/profile/${userid}`)
    const {data}=await response.json();
    console.log("data",data);
    setOrganizationData(data[0]);
    }
  }

  useEffect(()=>{
    setProfile();
  },[])

  return (

    <div>

      <h2>Search for an Organization</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Organization Name"
          value={organizationName}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {organizationData ? (
        <div className="border">
          <div className="profile">
            <p>Profile</p>
          </div>
          <div className="top-right">
            <div>
                <p>Longitude {organizationData.longitude}</p>
                <p>Latitude {organizationData.latitude}</p>
            </div>
            <p>{organizationData.email}</p>
            <p>{organizationData.phone}</p>


          </div>
          <div className="top-left">
            <p>{organizationData.deptName}</p>
            <p>{organizationData.deptType}</p>

          </div>

          {/* {organizationData.requests ? (
            <div className="scrolling-alert-container">
              <div className="scrolling-alert"><h4 style={{color: 'red'}}>There is a request. Sender ID: {organizationData.requests.senderID}. Sender Name: {organizationData.requests.senderName} </h4></div>
            </div>
          ) : null
          } */}
          <div>

            <ul class="nav">
              <li class="nav-item"><a href="#about">About</a></li>
              <li class="nav-item"><a href="#current-requests">Current Requests</a></li>
              <li class="nav-item"><a href="#history">History</a></li>
            </ul>
            <div id="about">
              <h2>About</h2>
              <p>Organization Name : {organizationData.deptName}</p>
              <p>Department Type: {organizationData.deptType}</p>
              <p>Location: {organizationData.longitude}, {organizationData.latitude}</p>

              {/* {organizationData.longitude ? (
                <Map longitude={organizationData.longitude} latitude={organizationData.latitude}/>
              ) : <div>Map not updated yet</div>} */}

              <p>Email: {organizationData.email}</p>
              <p>Contact Details: {organizationData.phone}</p>
            </div>

            {organizationData.requests ? (
              <div id="current-requests">
                <h2>Current Requests</h2>
                <p>Sender ID: {organizationData.requests.senderID}</p>
                <p>Sender Name: {organizationData.requests.senderName}</p>
                <p>Display other details from the db</p>
              </div>
            ) : <div id="current-requests">
              <h2>Current Requests</h2>
              <p>No current requests</p>
            </div>
            }

            {organizationData.history ? (
              <div id="history">
                <h2>History</h2>
                <p>Sender ID: {organizationData.history.sender_ID}</p>
                <p>Sender Name: {organizationData.history.sender_Name}</p>
                <p>Year: {organizationData.history.date}</p>
              </div>
            ) : <div id="history">
              <h2>History</h2>
              <p>Nothing to show</p>
            </div>}

          </div>

          {organizationData.requests ? (
            <div id="current-requests">

            </div>
          ) : null}


        </div>
      ) : null}

    <GetItem obj={organizationData}/>

    </div>
  );
}

export default SearchOrganization;
