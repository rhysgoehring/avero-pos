import React from "react";

import { Header, NavWrapper, NavList, NavItem, Logo } from "./common";

class Navbar extends React.Component {
  render() {
    return (
      <Header>
        <NavWrapper>
          <NavList>
            <NavItem>Tables</NavItem>
            <NavItem>
              <Logo>The Greasy Spoon</Logo>
            </NavItem>
            <NavItem>Checks</NavItem>
          </NavList>
        </NavWrapper>
      </Header>
    );
  }
}

export default Navbar;
