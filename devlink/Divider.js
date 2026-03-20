"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Divider.module.css";

export function Divider({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "section_divider")} tag="div">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "divider_text-wrapper",
          "background-color-secondary"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "divider_text-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "divider_text")}
            tag="div"
          >
            <_Builtin.Strong className={_utils.cx(_styles, "", "bold-text")}>
              {"What is Soul Sighted?"}
            </_Builtin.Strong>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
