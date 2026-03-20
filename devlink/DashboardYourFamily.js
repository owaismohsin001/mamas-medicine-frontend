"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DashboardYourFamily.module.css";

export function DashboardYourFamily({
  as: _Component = _Builtin.Block,
  text = "Your Family",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "section_divider-returning")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "divider_content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "divider_text-2")}
          tag="div"
        >
          {text}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
