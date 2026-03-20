"use client";
import React, { useState, useEffect } from "react";
import { NavbarOnboarding } from "../devlinkModified/NavbarOnboarding";
import { LoginFormContent } from "../devlinkModified/SigninForm";
import "./styles.css";

const App = () => {
  useEffect(() => {
    if(localStorage.getItem("user")) window.location.href = "/dashboard";
  }, [])

  return <div style={{ background: '#eef1fa' }}>
    <div>
      <NavbarOnboarding/>
      <LoginFormContent/>
    </div>
  </div>
};

export default App;