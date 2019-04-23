import styled from "styled-components";

const Container = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
`;

const Section = styled.section`
  padding-top: 9rem;
  padding-bottom: 8rem;
  padding-right: 2rem;
  padding-left: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`;

export { Container, Section };
