"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardChildJourney.module.css";

export function DashboardChildJourney({
  as: _Component = _Builtin.Block,
  text = "Your Journey with ",
  child = { name: '' },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "section_divider-returning", "journey")}
      tag="div"
      id="journey-with-child-title"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "divider_content", "journey")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "divider_text-2")}
          tag="div"
        >
          {text} {child?.name}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
