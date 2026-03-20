import * as React from "react";
import * as Types from "./types";

declare function OnboardingNames(props: {
  as?: React.ElementType;
  text1?: React.ReactNode;
  link1?: Types.Basic.Link;
  image?: Types.Asset.Image;
  text2?: React.ReactNode;
  link2?: Types.Basic.Link;
  text3?: React.ReactNode;
}): React.JSX.Element;
