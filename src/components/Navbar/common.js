import styled from "styled-components";

const Header = styled.header`
  position: fixed;
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
  border-bottom: 1px solid white;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  align-items: center;
`;

const NavItem = styled.li`
  font-size: 1.6rem;
  color: white;
  margin: 0rem 5rem;
`;

const Logo = styled.a`
  color: white;
  text-decoration: none;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 0.3rem;
`;

export { Header, NavWrapper, NavList, NavItem, Logo };
