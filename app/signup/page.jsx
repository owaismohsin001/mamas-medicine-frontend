"use client";
import React, { useEffect, useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { SignupForm } from "../../devlinkModified/SignupForm";
import "../swal.css";

const App = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(window.location.search.includes("?purchase_email=")) {
      const email = window.location.search.split("?purchase_email=")[1].split("&")[0]
      // setEmail(emailParam);
      setTimeout(() => {
        console.log(email)
        document.querySelector('[type=email]').value = email
      }, 1000);
    }
  }, [])

  return <div style={{ background: '#eef1fa' }}>
    <div>
      <NavbarOnboarding/>
      <SignupForm email={email} />
    </div>
  </div>
};

export default App;