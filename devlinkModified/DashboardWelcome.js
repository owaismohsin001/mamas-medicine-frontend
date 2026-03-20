"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardWelcome.module.css";

export function DashboardWelcome({
  as: _Component = _Builtin.Block,
  user = { name: '' },
  nOfChildren = 0,
  text1 = "Welcome, ",
  text2 = "I'm excited to share this work with you.",
  text3 = "Welcome back, ",
  text4 = (
    <>
      {"We can't wait to share lots more personalised,"}
      <br />
      {" insights - just for YOU"}
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
        {nOfChildren == 0 && <_Builtin.Block
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
              {text1} {user?.name}
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
        </_Builtin.Block>}
        {nOfChildren > 0 && <_Builtin.Block
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
              {text3} {user?.name}
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
        </_Builtin.Block>}
      </_Builtin.Block>
    </_Component>
  );
}
