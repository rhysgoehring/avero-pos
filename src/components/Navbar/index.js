import React from "react";
import { withRouter } from "react-router-dom";
import { Header, NavWrapper, NavList, NavItem, Logo, Link } from "./styles";

const Navbar = () => (
  <Header>
    <NavWrapper>
      <NavList>
        <Link exact to="/">
          View Tables
        </Link>

        <NavItem>
          <Logo>The Greasy Spoon</Logo>
        </NavItem>

        <Link exact to="/checks">
          View Checks
        </Link>
      </NavList>
    </NavWrapper>
  </Header>
);

export default withRouter(Navbar);
