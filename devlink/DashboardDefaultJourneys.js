"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DashboardDefaultJourneys.module.css";

export function DashboardDefaultJourneys({
  as: _Component = _Builtin.Block,
  text = "",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "divider_text-wrapper",
        "background-color-secondary"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-6")} tag="div">
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
