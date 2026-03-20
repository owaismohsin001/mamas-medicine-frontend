"use client";
import React, { useState } from "react";
import { NavbarOnboarding } from "../devlinkModified/NavbarOnboarding";
import { FooterOnboarding } from "../devlink/FooterOnboarding";
import { SignupForm } from "../devlink/SignupForm";

const App = () => {
  return <>
    <div>
      <NavbarOnboarding/>
      <SignupForm/>
      <FooterOnboarding/>
    </div>
  </>
};

export default App;