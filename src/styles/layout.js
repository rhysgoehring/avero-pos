import styled from "styled-components";

const Container = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Section = styled.main`
  padding-right: 2rem;
  padding-left: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-block-start: 7rem;

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
