import styled from "styled-components/macro";

import { NavLink } from "react-router-dom";

import { MEDIUM_GREY } from "../../styles/colors";

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0rem 15rem;
`;

const Link = styled(NavLink)`
  font-size: 1.8rem;
  color: white;
  text-decoration: underline;

  &.active {
    color: ${MEDIUM_GREY};
    text-decoration: none;
  }
`;

const Logo = styled.p`
  color: black;
  text-decoration: none;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 0.3rem;
`;

export { Header, NavWrapper, NavList, NavItem, Logo, Link };
