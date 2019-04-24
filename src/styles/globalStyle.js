import { createGlobalStyle } from "styled-components";
import { LIGHT_GREY } from "./colors";

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  body {
    background-color: ${LIGHT_GREY};
    font-family: Lato;
  }

`;

export default GlobalStyle;
