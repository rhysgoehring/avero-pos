import React from "react";
import { ModalContainer, ModalSection, ModalButton } from "./styles";
import { RED } from "../../styles/colors";

const Modal = ({
  children,
  showModal,
  handleClose,
  modalColor,
  modalWidth,
  cancelButtonWidth
}) => (
  <ModalContainer show={showModal}>
    <ModalSection modalBgColor={modalColor} width={modalWidth}>
      {children}
      <ModalButton
        width={cancelButtonWidth}
        buttonColor={RED}
        onClick={handleClose}
      >
        Close
      </ModalButton>
    </ModalSection>
  </ModalContainer>
);

export default Modal;
