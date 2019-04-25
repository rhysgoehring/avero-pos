import React from "react";
import { ModalContainer, ModalSection, ModalButton } from "./styles";

const Modal = ({
  children,
  showModal,
  handleClose,
  modalColor,
  modalWidth
}) => (
  <ModalContainer show={showModal}>
    <ModalSection modalBgColor={modalColor} width={modalWidth}>
      {children}
      <ModalButton onClick={handleClose} />
    </ModalSection>
  </ModalContainer>
);

export default Modal;
