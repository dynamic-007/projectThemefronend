import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import ImageUpload from "./components/imageUpload.";
import App from "./App";
import ReceiverPage from "./components/receiverPage";
import SenderPage from "./components/senderPage";

function Apps() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/resourceDetails" element={<App />} />
          <Route path="/receiverRequests" element={<ReceiverPage />} />
          <Route path="/requestSent" element={<SenderPage />} />
        </Routes>
        {/* <ImageUpload/> */}
      </div>
    </Router>
  );
}

export default Apps;
