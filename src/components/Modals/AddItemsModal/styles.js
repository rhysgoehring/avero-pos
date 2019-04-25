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

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: black;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid black;
  width: 100%;
  height: auto;
`;

const ModalSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid red;
  width: 50%;
`;

const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 3px solid black;
  padding: 0;
  width: 100%;
`;

export { ModalHeader, ModalTitle, ModalContainer, CheckWrapper, ModalSection };
