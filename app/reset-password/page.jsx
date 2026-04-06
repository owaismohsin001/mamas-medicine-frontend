"use client";

import "../swal.css";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { ResetPasswordFlow } from "../components/ResetPasswordFlow";

export default function ResetPasswordPage() {
  return (
    <>
      <NavbarOnboarding />
      <ResetPasswordFlow />
    </>
  );
}
