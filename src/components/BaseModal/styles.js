import styled from "styled-components/macro";
import { CardButton } from "../TableCard/styles";

const ModalContainer = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99999;
`;

const ModalSection = styled.section`
  position: fixed;
  background: ${props => props.modalBgColor};
  width: ${props => props.width};
  height: auto;
  top: 50%;
  left: 50%;
  border-radius: 2rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid black;
`;

const ModalButton = styled(CardButton)`
  width: ${({ width }) => width};
  color: white;
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => fontSize};
`;

export { ModalContainer, ModalSection, ModalButton };
