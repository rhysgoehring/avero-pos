import styled from "styled-components";
import { CardButton as ModalButton } from "../TableCard/styles";

const ModalContainer = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalSection = styled.section`
  position: fixed;
  background: ${props => props.modalBgColor};
  width: ${props => props.width};
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export { ModalContainer, ModalSection, ModalButton };
