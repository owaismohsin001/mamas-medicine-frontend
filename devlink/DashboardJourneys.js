"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DashboardJourneys.module.css";

export function DashboardJourneys({
  as: _Component = _Builtin.Block,

  link1 = {
    href: "#",
  },

  text1 = "BEGIN",
  text2 = "Your Parenting Dynamic",

  link2 = {
    href: "#",
  },

  text3 = "VIEW",
  text4 = "Your Emotional Flavor",

  link3 = {
    href: "#",
  },

  text5 = "EXPLORE",
  text6 = "Your Core Ingredients",

  link4 = {
    href: "#",
  },

  text7 = "EXPLORE",
  text8 = "Ask Me Anything!",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "padding-global-4",
        "padding-section-medium"
      )}
      tag="div"
      id="journeys-cards-section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-6")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "journeys_first")}
          tag="div"
        >
          <_Builtin.Grid
            className={_utils.cx(_styles, "journey_first-grid")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "journey_card",
                "is-view",
                "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66ba-d7aa66b6"
              )}
              id={_utils.cx(_styles, "your-parenting-dynamics")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "journey_card-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "journey_card-img",
                    "is-parenting"
                  )}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "journey_btn", "is-begin")}
                    button={false}
                    block="inline"
                    options={link1}
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "journey_btn-text")}
                      tag="div"
                    >
                      {text1}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "img_overlay")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-text")}
                  tag="div"
                >
                  {text2}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "journey_card",
                "is-view",
                "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66c3-d7aa66b6"
              )}
              id={_utils.cx(_styles, "your-emotional-flavor")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "journey_card-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "journey_card-img",
                    "is-emotional"
                  )}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "link-block", "small")}
                    button={false}
                    block="inline"
                    options={link2}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "journey_bnt-text",
                        "small"
                      )}
                      tag="div"
                    >
                      {text3}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "img_overlay")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-text")}
                  tag="div"
                >
                  {text4}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "journey_card",
                "is-explore",
                "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66cc-d7aa66b6"
              )}
              id={_utils.cx(_styles, "your-core-ingredients")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "journey_card-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "journey_card-img",
                    "is-ingredients"
                  )}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "link-block-2", "small")}
                    button={false}
                    block="inline"
                    options={link3}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "journey_bnt-text",
                        "small"
                      )}
                      tag="div"
                    >
                      {text5}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "img_overlay")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-text")}
                  tag="div"
                >
                  {text6}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "journey_card",
                "is-begin",
                "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66d5-d7aa66b6"
              )}
              id={_utils.cx(_styles, "ask-me-anything")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "journey_card-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-img", "is-ask")}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "link-block-2", "small")}
                    button={false}
                    block="inline"
                    options={link4}
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "journey_bnt-text",
                        "small"
                      )}
                      tag="div"
                    >
                      {text7}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "img_overlay")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-text")}
                  tag="div"
                >
                  {text8}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Grid>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
