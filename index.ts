/**
 * @format
 */

import { AppRegistry } from "react-native";

import "intl-pluralrules";
import { App } from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
