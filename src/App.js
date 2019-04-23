import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";

import Navbar from "./components/Navbar";
import Tables from "./pages/Tables";
import Checks from "./pages/Checks";

import GlobalStyle from "./styles/globalStyle";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Tables} />
            <Route path="/checks" component={Checks} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
