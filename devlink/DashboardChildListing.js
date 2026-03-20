"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DashboardChildListing.module.css";

export function DashboardChildListing({
  as: _Component = _Builtin.Block,
  text1 = "Jasmine",
  text2 = "Zadie",

  link = {
    href: "#",
  },

  text3 = "+ Add another child",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "padding-global-4",
        "padding-section-medium"
      )}
      tag="div"
      id="children-names-container"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-6")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "family_content-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "family_child-wrapper")}
            tag="div"
            id="children-container"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "family_child")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "child_name")}
                tag="div"
              >
                {text1}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "family_child", "is-active")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "child_name", "is-active")}
                tag="div"
              >
                {text2}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Link
            className={_utils.cx(_styles, "family_link")}
            button={false}
            id="add_child_link"
            block=""
            options={link}
          >
            {text3}
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
