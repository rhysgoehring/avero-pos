import styled from "styled-components/macro";

const Container = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  margin-top: ${({ marginTop }) => marginTop};
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: center;
  height: ${({ height }) => height};
  border: ${({ border }) => border};
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
  margin-right: auto;
  margin-left: auto;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Column = styled.div`
  padding: ${({ padding }) => padding || "0.5rem"};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};

  ${({ col }) => col && getFlex(col)};
  ${({ col }) => col && getWidth(col)};
`;

/*----------------------------------CHECKS PAGE---------------------------------------------------------*/
const CheckSectionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const CheckSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom: ${({ borderBottom }) => borderBottom};
`;

const CheckRowItem = styled.p`
  font-size: 1.6rem;
  padding-left: 0.5rem;
  flex: ${({ flex }) => flex};
  font-weight: ${({ bold }) => (bold ? "bold" : "none")};
`;

export {
  Container,
  Section,
  GridContainer,
  Column,
  Row,
  CheckSectionContainer,
  CheckSection,
  CheckRowItem
};
