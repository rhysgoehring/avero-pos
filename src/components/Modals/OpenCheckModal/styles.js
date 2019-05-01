import styled from "styled-components/macro";
import { MEDIUM_GREY } from "../../../styles/colors";

const ModalHeader = styled.div`
  height: 15%;
  width: 100%;
  border-bottom: 2px solid ${MEDIUM_GREY};
  display: flex;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 3rem;
  color: black;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: flex-start;
  width: 100%;
  height: auto;
`;

const ModalSection = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: ${({ alignSelf }) => alignSelf};
  justify-content: flex-start;
  flex-direction: column;
  width: ${({ width }) => width || "50%"};
  height: ${({ height }) => height || "59.3rem"};
  border-right: ${({ borderRight }) => borderRight || "1px solid black"};
  max-height: ${({ maxHeight }) => maxHeight};
  overflow-x: hidden;
  overflow-y: auto;
`;

const ColumnTitle = styled.h2`
  font-size: 2rem;
  color: black;
  align-self: flex-start;
  padding-left: 0.5rem;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 0.5rem 0.5rem;
`;

const ItemName = styled.p`
  font-size: 1.6rem;
  padding-left: 0.5rem;
  flex: 0 0 50%;
  ${({ color }) => color || "black"};
  text-decoration: ${({ textDecoration }) => textDecoration};
`;

const ItemPrice = styled.p`
  font-size: 1.6rem;
  color: ${({ color }) => color || "black"};
  align-self: center;
  flex: 0 0 33%;
`;

export {
  ModalHeader,
  ModalTitle,
  ModalContainer,
  ModalSection,
  ColumnTitle,
  ItemRow,
  ItemName,
  ItemPrice
};
