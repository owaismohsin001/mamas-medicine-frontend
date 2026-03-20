import * as React from "react";
import * as Types from "./types";

declare function OnboardingComplete(props: {
  as?: React.ElementType;
  title?: React.ReactNode;
  image1?: Types.Asset.Image;
  text1?: React.ReactNode;
  text2?: React.ReactNode;
  image2?: Types.Asset.Image;
}): React.JSX.Element;
