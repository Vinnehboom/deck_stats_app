module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
  plugins: ["prettier"],
}
