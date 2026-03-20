"use client";
import React, { useState, useEffect } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardChildListing.module.css";

export function DashboardChildListing({
  as: _Component = _Builtin.Block,
  family = {},
  selectedChild=null,
  setSelectedChild=() => {},
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
            {Object.entries(family).map(([_, v]) => v.child).map(child => <div
              onClick={() => {
                console.log("setSelectedChild(child?.id)", child)
                setSelectedChild(child?.id)
              }}
              className={_utils.cx(_styles, "family_child", selectedChild == child?.id ? "is-active" : "")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "child_name")}
                tag="div"
              >
                {child?.name}
              </_Builtin.Block>
            </div>)}
          </_Builtin.Block>
          <a
            className={_utils.cx(_styles, "family_link")}
            button={false}
            id="add_child_link"
            block=""
            href={"/onboardingMain"}
          >
            {text3}
          </a>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
