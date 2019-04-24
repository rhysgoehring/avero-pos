import styled from "styled-components";

const Container = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  width: 100%;
  flex-direction: column;
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

/*----------------------------------GRID---------------------------------------------------------*/

// Helper Functions:
const getWidth = value => {
  if (!value) return;

  const width = (value / 12) * 100;
  return `width: ${width}%;`;
};

const getFlex = value => {
  if (!value) return;

  const flex = (value / 12) * 100;
  return `flex: 0 0 ${flex}%;`;
};

const GridContainer = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 114rem;

  border: 2px solid black;
`;

const Row = styled.div`
  margin-right: -1.5rem;
  margin-left: -1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  border: 1px solid red;
`;

const Column = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 2px solid green;

  ${({ col }) => col && getFlex(col)};
  ${({ col }) => col && getWidth(col)};
`;

export { Container, Section, GridContainer, Column, Row };
