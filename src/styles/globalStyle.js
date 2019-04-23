import { createGlobalStyle } from "styled-components";
import { LIGHT_GREY } from "./colors";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: Lato;
    font-size: 62.5%;
  }
  body {
    background-color: ${LIGHT_GREY};
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
