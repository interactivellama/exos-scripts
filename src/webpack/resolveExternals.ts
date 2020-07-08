import type webpack from "webpack";

export default (isDevelopment: boolean, isLibrary?: true): webpack.ExternalsElement => {
  if (isDevelopment || isLibrary) {
    return {};
  }

  return {
    react: "React",
    "react-dom": "ReactDOM",
  };
};
