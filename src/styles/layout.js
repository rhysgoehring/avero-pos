import styled from "styled-components";

const Container = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const Row = styled.div`
  margin-right: -1.5rem;
  margin-left: -1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

const Column = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ col }) => col && getFlex(col)};
  ${({ col }) => col && getWidth(col)};
`;

export { Container, Section, GridContainer, Column, Row };
