import React from "react";
import Modal from "../../BaseModal";
import { ModalButton } from "../../BaseModal/styles";
import { ModalHeader, ModalTitle, ModalSection } from "../AddItemsModal/styles";
import {
  LIGHT_GREY,
  AVERO_ICON_RED,
  RED,
  AVERO_GREEN
} from "../../../styles/colors";

const ViewCheckModal = ({ show, close, modalTitle }) => {
  return (
    <Modal
      showModal={show}
      handleClose={close}
      modalColor={LIGHT_GREY}
      modalWidth="60%"
      cancelButtonWidth="75%"
    >
      <ModalHeader>
        <ModalTitle>{modalTitle}</ModalTitle>
      </ModalHeader>
    </Modal>
  );
};

export default ViewCheckModal;
