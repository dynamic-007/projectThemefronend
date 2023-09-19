import React, { Component, useEffect, useState } from "react";

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">

        <div>
          Agency Name<h1>{userData.deptName}</h1>
          <br />
          Agency Type<h1>{userData.deptType}</h1>
          <br />
          Registration Number<h1>{userData.regno}</h1>
          <br />
          Longitude<h1>{userData.longitude}</h1>
          <br />
          Latitude<h1>{userData.latitude}</h1>
          <br />
          Speciality<h1>{userData.speciality}</h1>
          <br />
          Email <h1>{userData.email}</h1>
          <br />
          Phone <h1>{userData.phone}</h1>
          <br />

          <div>
            <a href="/resourceDetails">Cilcik here for organisations</a>
          </div>
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
