import React from "react";
import { KeyboardAvoidingView } from "native-base";
import { Image } from "native-base";

import { LoginScreenContainerStyle } from "../../styles/login/LoginScreenContainerStyle";
import { LoginScreenGlare } from "./LoginScreenGlare";

export const LoginScreenContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView style={LoginScreenContainerStyle.container} behavior="padding">
      {children}
      <Image
        alt="button"
        style={[LoginScreenContainerStyle.buttonImage, LoginScreenContainerStyle.buttonLeft]}
        source={require("../../assets/images/button-blue.png")}
      />
      <Image
        alt="button"
        style={[LoginScreenContainerStyle.buttonImage, LoginScreenContainerStyle.buttonRight]}
        source={require("../../assets/images/button-blue.png")}
      />
      <Image
        alt="screw-left"
        style={[LoginScreenContainerStyle.screwImage, LoginScreenContainerStyle.screwImageLeft]}
        source={require("../../assets/images/screw.png")}
      />
      <Image
        alt="screw-right"
        style={[LoginScreenContainerStyle.screwImage, LoginScreenContainerStyle.screwImageRight]}
        source={require("../../assets/images/screw.png")}
      />
      <Image
        alt="speaker-left-2"
        style={[LoginScreenContainerStyle.speakerImage, LoginScreenContainerStyle.speakerImageLeft2]}
        source={require("../../assets/images/dots.png")}
      />
      <Image
        alt="speaker-left-1"
        style={[LoginScreenContainerStyle.speakerImage, LoginScreenContainerStyle.speakerImageLeft1]}
        source={require("../../assets/images/dots.png")}
      />
      <Image
        alt="speaker-right-2"
        style={[LoginScreenContainerStyle.speakerImage, LoginScreenContainerStyle.speakerImageRight2]}
        source={require("../../assets/images/dots.png")}
      />
      <Image
        alt="speaker-right-1"
        style={[LoginScreenContainerStyle.speakerImage, LoginScreenContainerStyle.speakerImageRight1]}
        source={require("../../assets/images/dots.png")}
      />
      <LoginScreenGlare />
    </KeyboardAvoidingView>
  );
};
