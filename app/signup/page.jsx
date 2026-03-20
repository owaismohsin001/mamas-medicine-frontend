"use client";
import React, { useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { SignupForm } from "../../devlinkModified/SignupForm";

const App = () => {
  return <>
    <div>
      <NavbarOnboarding/>
      <SignupForm/>
    </div>
  </>
};

export default App;