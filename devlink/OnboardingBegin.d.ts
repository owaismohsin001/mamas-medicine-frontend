import * as React from "react";
import * as Types from "./types";

declare function OnboardingBegin(props: {
  as?: React.ElementType;
  title?: React.ReactNode;
  text1?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  link?: Types.Basic.Link;
  text5?: React.ReactNode;
}): React.JSX.Element;
