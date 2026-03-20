"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { listOfElementsToText } from "./values/Basic/listOfElementsToText";
import * as _utils from "./utils";
import _styles from "./CFormWaitlist.module.css";

export function CFormWaitlist({
  as: _Component = _Builtin.FormWrapper,
  variant = "Base",
  buttonLabel = "Subscribe",
}) {
  const _styleVariantMap = {
    Base: "",
    inline: "w-variant-db48d54b-0057-0626-55a2-258bbe5c1b6f",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "c-form-subscribe", _activeStyleVariant)}
      data-klaviyo-form="true"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "", "", "form-3", _activeStyleVariant)}
        name="email-form"
        data-name="Email Form"
        method="get"
        data-signup-source="webflow"
        id="email-form"
      >
        <_Builtin.FormTextInput
          className={_utils.cx(
            _styles,
            "form-input-email",
            _activeStyleVariant
          )}
          name="email_address"
          maxLength={256}
          data-name="email_address"
          placeholder="Email address"
          disabled={false}
          type="email"
          required={true}
          autoFocus={false}
          id="email_address"
        />
        <_Builtin.FormButton
          className={_utils.cx(_styles, "bnt-waitlist", _activeStyleVariant)}
          type="submit"
          data-wait="Please wait..."
          value={listOfElementsToText(buttonLabel)}
        />
      </_Builtin.FormForm>
      <_Builtin.FormSuccessMessage
        className={_utils.cx(_styles, "success-message", _activeStyleVariant)}
      >
        <_Builtin.Block tag="div">
          {"Thanks for subscribing! Please check your email to confirm."}
        </_Builtin.Block>
      </_Builtin.FormSuccessMessage>
      <_Builtin.FormErrorMessage
        className={_utils.cx(_styles, "error-message", _activeStyleVariant)}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-block-3", _activeStyleVariant)}
          tag="div"
        >
          {"We couldn’t submit the form. Please try again."}
        </_Builtin.Block>
      </_Builtin.FormErrorMessage>
    </_Component>
  );
}
