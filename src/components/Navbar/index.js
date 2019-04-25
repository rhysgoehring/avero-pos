import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Header, NavWrapper, NavList, NavItem, Logo, Link } from "./styles";
import { ModalButton } from "../BaseModal/styles";
import { BASE_URL, requestConfig } from "../../config";

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
          View All Checks
        </Link>
      </NavList>
      <ModalButton
        width="3rem"
        buttonColor="red"
        onClick={() => {
          axios.delete(`${BASE_URL}/checks`, requestConfig);
        }}
      >
        DELETE
      </ModalButton>
    </NavWrapper>
  </Header>
);

export default withRouter(Navbar);
