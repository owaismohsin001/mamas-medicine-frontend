"use client";
import React, { useState, useEffect } from "react";
import * as _Builtin from "../../devlink/_Builtin";
import * as _utils from "../../devlink/utils";
import _styles from "../../devlink/ResetPasswordForm.module.css";
import { request } from "@/app/api/env";
import { resetPassword } from "@/app/api/resetPassword";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export function ResetPasswordFlow({ as: _Component = _Builtin.Block, token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const storedToken = localStorage.getItem("resetSessionToken");
    const resolvedToken = token || storedToken || "";

    if (!resolvedToken) {
      router.push("/forgot-password");
      return;
    }

    setSessionToken(resolvedToken);

    if (token && token !== storedToken) {
      localStorage.setItem("resetSessionToken", token);
    }

    if (!storedEmail) {
      router.push("/forgot-password");
      return;
    }

    setEmail(storedEmail);
  }, [router, token]);

  const handleSubmit = async () => {
    const newPassword = document.querySelector(
      '[data-ms-member="new-password"]'
    )?.value;
    const confirmPassword = document.querySelector(
      '[data-ms-member="confirm-password"]'
    )?.value;

    if (!newPassword) {
      return swal({
        title: "Error",
        text: "New password is required",
        icon: "error",
      });
    }

    if (newPassword.length < 8) {
      return swal({
        title: "Error",
        text: "Password must be at least 8 characters long",
        icon: "error",
      });
    }

    if (!confirmPassword) {
      return swal({
        title: "Error",
        text: "Please confirm your password",
        icon: "error",
      });
    }

    if (newPassword !== confirmPassword) {
      return swal({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
    }

    setIsLoading(true);

    try {
      await resetPassword(sessionToken, newPassword);

      const { authToken } = await request({
        method: "POST",
        endpoint: "auth/login",
        body: { email, password: newPassword },
      });

      localStorage.setItem("authToken", authToken);

      const data = await request({
        method: "GET",
        endpoint: "auth/me",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetSessionToken");

      setIsSubmitted(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (e) {
      swal({
        title: "Error",
        text: e?.message || "Failed to reset password. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !sessionToken) {
    return (
      <_Component
        className={_utils.cx(
          _styles,
          "padding-global",
          "padding-section-medium"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "reset_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "reset_loading")}
              tag="div"
            >
              <div className={_styles.reset_loading_spinner} />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Component>
    );
  }

  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-medium")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "reset_wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "reset_img-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-huge")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_heading")}
                style={{ whiteSpace: "nowrap" }}
                tag="div"
              >
                {"Reset Password"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-huge")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "sign_subtitle",
                  "text-align-center",
                  "max-width-medium"
                )}
                tag="div"
              >
                {"Enter your new password below."}
              </_Builtin.Block>
            </_Builtin.Block>

          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "reset_content")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "sign_img", "login")}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
              src="https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/69677bed6a46cda22d043cac_sign-img-removebg1.png"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sign_heading-wrapper", "login")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_heading")}
                tag="div"
              >
                {"Create"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "toyour_text")}
                tag="div"
              >
                {"Your"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_name", "text-align-center")}
                tag="div"
              >
                {"New Password"}
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
            {isSubmitted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "reset_success-message")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "reset_success-icon")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    content=""
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "reset_success-title")}
                  tag="div"
                >
                  {"Password Reset Successful!"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "reset_success-text")}
                  tag="div"
                >
                  {
                    "Your password has been updated. Redirecting to dashboard..."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            ) : (
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "reset_form-block")}
              >
                <_Builtin.FormForm
                  className={_utils.cx(_styles, "reset_form")}
                  name="reset-password-form"
                  data-name="Email Form"
                  method="get"
                  data-ms-form="reset-password"
                  id="reset-password-form"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "reset_input-wrap",
                      "password"
                    )}
                    tag="div"
                    style={{ position: "relative" }}
                  >
                    <_Builtin.FormBlockLabel
                      className={_utils.cx(_styles, "reset_field-label")}
                      htmlFor="New-Password"
                    >
                      {"New Password"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "reset_input")}
                      name="New-Password"
                      maxLength={256}
                      data-name="New Password"
                      placeholder="Enter your new password"
                      disabled={isLoading}
                      type={showPassword ? "text" : "password"}
                      required={true}
                      autoFocus={false}
                      data-ms-member="new-password"
                      id="New-Password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#888",
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "reset_input-wrap",
                      "confirm"
                    )}
                    tag="div"
                    style={{ position: "relative" }}
                  >
                    <_Builtin.FormBlockLabel
                      className={_utils.cx(_styles, "reset_field-label")}
                      htmlFor="Confirm-Password"
                    >
                      {"Confirm Password"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "reset_input")}
                      name="Confirm-Password"
                      maxLength={256}
                      data-name="Confirm Password"
                      placeholder="Confirm your new password"
                      disabled={isLoading}
                      type={showConfirmPassword ? "text" : "password"}
                      required={true}
                      autoFocus={false}
                      data-ms-member="confirm-password"
                      id="Confirm-Password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#888",
                      }}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </_Builtin.Block>
                  <button
                    id="reset-submit-btn"
                    type="submit"
                    style={{ display: "none" }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      handleSubmit();
                    }}
                  ></button>
                  <div
                    className={_utils.cx(_styles, "reset_button")}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!isLoading) {
                        document.getElementById("reset-submit-btn").click();
                      }
                    }}
                  >
                    <div>{isLoading ? "Resetting..." : "Reset Password"}</div>
                  </div>
                </_Builtin.FormForm>
                <_Builtin.FormSuccessMessage>
                  <_Builtin.Block tag="div">
                    {"Thank you! Your submission has been received!"}
                  </_Builtin.Block>
                </_Builtin.FormSuccessMessage>
                <_Builtin.FormErrorMessage>
                  <_Builtin.Block tag="div">
                    {"Oops! Something went wrong while submitting the form."}
                  </_Builtin.Block>
                </_Builtin.FormErrorMessage>
              </_Builtin.FormWrapper>
            )}

          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
