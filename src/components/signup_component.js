import React, { Component, useState } from "react";

export default function SignUp() {
  const [formData,setForm]=useState({
    deptName:"",
    deptType:"",
    email:"",
    password:"",
    phone:0,
    regno:"",
    longitude:0,
    latitude:0,
    userType:"",
    secretKey:"",
    speciality:"",

  })


  const handleSubmit = (e) => {
    if (formData.userType === "Admin" && formData.secretKey !== "Satwika") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(formData.deptName,formData.deptType, formData.regno, formData.email, formData.location, formData.speciality, formData.password, formData.userType);
      fetch("http://localhost:4000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({...formData}),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setForm({...formData,userType:e.target.value})}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setForm({...formData,userType:e.target.value})}
            />
            Admin
          </div>
          {formData.userType === "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setForm({...formData,secretKey:e.target.value})}
              />
            </div>
          ) : null}

          <div className="mb-3">
            <label>Agency name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Agency Name"
              onChange={(e) => setForm({...formData,deptName:e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label>Agency Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="Agency Type"
              onChange={(e) => setForm({...formData,deptType:e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setForm({...formData,email:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label>Registration Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Registration Number"
              onChange={(e) => setForm({...formData,regno:e.target.value})}
            />  
          </div>
          <div className="mb-3">
            <label>Longitude</label>
            <input
              type="text"
              className="form-control"
              placeholder="Longitude"
              onChange={(e) => setForm({...formData,longitude:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label>Latitude</label>
            <input
              type="text"
              className="form-control"
              placeholder="Latitude"
              onChange={(e) => setForm({...formData,latitude:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label>Speciality</label>
            <input
              type="text"
              className="form-control"
              placeholder="Speciality"
              onChange={(e) => setForm({...formData,speciality:e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setForm({...formData,password:e.target.value})}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
