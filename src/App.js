import React from "react";
import { createGlobalStyle } from "styled-components";

import Navbar from "./components/Navbar/Navbar";

import { LIGHT_GREY, DARK_BLUE } from "./styles/colors";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: Lato;
  }

  body {
    background-color: ${LIGHT_GREY};
  }
`;

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Navbar />
    </React.Fragment>
  );
};

export default App;
