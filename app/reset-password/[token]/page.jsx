"use client";

import { use } from "react";
import "../../swal.css";
import { NavbarOnboarding } from "../../../devlinkModified/NavbarOnboarding";
import { ResetPasswordFlow } from "../../components/ResetPasswordFlow";

export default function ResetPasswordPage({ params }) {
  const { token } = use(params);

  return (
    <>
      <NavbarOnboarding />
      <ResetPasswordFlow token={token} />
    </>
  );
}
