/* eslint-disable react-native/no-inline-styles */

import React from "react";
import Svg, { Path } from "react-native-svg";

import { LoginScreenContainerStyle } from "../../styles/login/LoginScreenContainerStyle";

export const LoginScreenGlare = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={[LoginScreenContainerStyle.glareSvg, { enableBackground: "new 0 0 122.88 122.87" }]}
      fill="rgba(255,255,255, 0.08)"
      viewBox="0 0 127.88 122.87">
      <Path
        d="M.01 122.87 0 .01 122.88 0 .01 122.87z"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
        }}
      />
    </Svg>
  );
};
