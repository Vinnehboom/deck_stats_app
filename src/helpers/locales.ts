import { Platform, NativeModules } from "react-native";

export const availableLocales = () => {
  return ["es", "en"];
};

export const defaultLocale = "en";

export const getDeviceLanguage = () => {
  return Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;
};
