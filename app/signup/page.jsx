"use client";
import React, { useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { SignupForm } from "../../devlinkModified/SignupForm";

const App = () => {
  return <div style={{ background: '#eef1fa' }}>
    <div>
      <NavbarOnboarding/>
      <SignupForm/>
    </div>
  </div>
};

export default App;