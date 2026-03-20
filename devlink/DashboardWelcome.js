"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DashboardWelcome.module.css";

export function DashboardWelcome({
  as: _Component = _Builtin.Block,
  text1 = "Welcome, Sarah",
  text2 = "I'm excited to share this work with you.",
  text3 = "Welcome back, Sarah",
  text4 = (
    <>
      {"We can't wait to share lots more personalised,"}
      <br />
      {" insights - just "}
      {"!"}
    </>
  ),
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "padding-global-4",
        "padding-section-small"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-6")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "welcome_container-first")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "margin-bottom", "margin-custom3")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "paragraph",
                "big",
                "text-color-primary"
              )}
              id="welcome-parent-name"
            >
              {text1}
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "margin-bottom")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "paragraph",
                "big",
                "text-color-primary",
                "text-align-center"
              )}
            >
              {text2}
            </_Builtin.Paragraph>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "welcome_container-returning")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "margin-bottom", "margin-custom3")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "paragraph",
                "big",
                "text-color-primary",
                "dash"
              )}
              id="welcome-back-parent-name"
            >
              {text3}
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "margin-bottom")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "paragraph",
                "big",
                "text-color-primary",
                "text-align-center"
              )}
            >
              {text4}
            </_Builtin.Paragraph>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
