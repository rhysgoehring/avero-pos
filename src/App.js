import React from "react";
import { createGlobalStyle } from "styled-components";

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
    background-color: orange;
  }
`;

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </React.Fragment>
  );
};

export default App;
