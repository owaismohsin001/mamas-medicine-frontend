"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardYourFamily.module.css";

export function DashboardYourFamily({
  as: _Component = _Builtin.Block,
  text = "Your Family",
  family = {}
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
