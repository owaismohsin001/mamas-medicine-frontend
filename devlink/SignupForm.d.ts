import * as React from "react";
import * as Types from "./types";

declare function SignupForm(props: {
  as?: React.ElementType;
  text1?: React.ReactNode;
  text2?: React.ReactNode;
  link?: Types.Basic.Link;
  text3?: React.ReactNode;
  image?: Types.Asset.Image;
  text4?: React.ReactNode;
}): React.JSX.Element;
