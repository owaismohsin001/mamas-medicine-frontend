"use client";
import React, { useEffect, useState } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/NavbarOnboarding.module.css";

export function NavbarOnboarding({ as: _Component = _Builtin.NavbarWrapper }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if(user) setUser(JSON.parse(user))
  }, [])

  return (
    <_Component
      className={_utils.cx(_styles, "navbar")}
      tag="div"
      data-nav="1"
      config={{
        easing: "ease",
        easing2: "ease",
        duration: 400,
        docHeight: false,
        noScroll: false,
        animation: "default",
        collapse: "all",
      }}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "padding-global")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large-5")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "nav_container-2")}
            tag="div"
          >
            <_Builtin.NavbarBrand
              className={_utils.cx(_styles, "brand")}
              aria-label="Mama’s Medicine — home page"
              options={{
                href: "https://mamasmedicine.webflow.io/",
                preload: "none",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "image-12")}
                width="auto"
                height="auto"
                loading="eager"
                alt="Mama’s Medicine logo"
                src="https://cdn.prod.website-files.com/695a4a423b1b9862c9aea287/695a4a423b1b9862c9aea28c_Logo-compress.webp"
              />
            </_Builtin.NavbarBrand>
            <_Builtin.NavbarMenu
              className={_utils.cx(_styles, "nav-menu-2")}
              tag="nav"
              role="navigation"
            >
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link-7")}
                options={{
                  href: "https://mamasmedicine.webflow.io/about",
                }}
              >
                {"About"}
              </_Builtin.NavbarLink>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "soul_drop")}
                tag="div"
                delay={0}
                hover={true}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "dropdown-toggle-2")}
                  tag="div"
                >
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "icon")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-2")}
                    tag="div"
                  >
                    {"Soul Sighted"}
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "soul_drop-list")}
                  tag="nav"
                >
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://mamasmedicine.webflow.io/soul-sighted",
                    }}
                  >
                    {"What is Soul Sighted?"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://mamasmedicine.webflow.io/parent-child-relationship",
                    }}
                  >
                    {"Your Vibes"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Ask Me Anything!"}
                  </_Builtin.DropdownLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "soul_drop", "mob")}
                tag="div"
                delay={0}
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "dropdown-toggle-2")}
                  tag="div"
                >
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "icon")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-2")}
                    tag="div"
                  >
                    {"Soul Sighted"}
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "soul_drop-list")}
                  tag="nav"
                >
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"What is Soul Sighted?"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Vibes"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Ask Me Anything!"}
                  </_Builtin.DropdownLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link-6")}
                options={{
                  href: "https://mamasmedicine.webflow.io/faqs",
                }}
              >
                {"FAQ's"}
              </_Builtin.NavbarLink>
              <_Builtin.Link
                className={_utils.cx(
                  _styles,
                  "menu_bnt",
                  "background-color-secondary"
                )}
                button={true}
                block=""
                options={{
                  href: user ? "/dashboard" : "/signin",
                }}
              >
                {user ? "Dashboard" : "Log In"}
              </_Builtin.Link>
              {user && <div
                className={_utils.cx(_styles, "nav-link-6")}
                onClick={() => {
                  localStorage.clear()
                  window.location.href = "/signin"
                }}
              >
                {"Logout"}
              </div>}
            </_Builtin.NavbarMenu>
            <_Builtin.NavbarButton
              className={_utils.cx(_styles, "nav_menu-bnt-2")}
              tag="div"
            >
              <_Builtin.Icon
                className={_utils.cx(_styles, "icon-5")}
                widget={{
                  type: "icon",
                  icon: "nav-menu",
                }}
              />
            </_Builtin.NavbarButton>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
