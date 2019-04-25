import React from "react";
import Modal from "../../BaseModal";
import { ModalButton } from "../../BaseModal/styles";
import { LIGHT_GREY, AVERO_ICON_BLUE } from "../../../styles/colors";
import {
  ModalHeader,
  ModalTitle,
  ModalContainer,
  CheckWrapper,
  ModalSection
} from "./styles";
import {
  Container,
  GridContainer,
  Row,
  Column,
  Section
} from "../../../styles/layout";

const AddItemsModal = ({
  show,
  close,
  modalTitle,
  menuItems,
  handleItemClick,
  currentCheckItems
}) => (
  <Modal
    showModal={show}
    handleClose={close}
    modalColor={LIGHT_GREY}
    modalWidth="75%"
    cancelButtonWidth="75%"
  >
    <ModalHeader>
      <ModalTitle>{modalTitle}</ModalTitle>
    </ModalHeader>
    <ModalContainer>
      <ModalSection>
        {menuItems.map(item => {
          return (
            <ModalButton
              width="60%"
              buttonColor={AVERO_ICON_BLUE}
              onClick={() => handleItemClick(item)}
              margin="0.5rem"
              key={item.name}
            >
              {item.name}
            </ModalButton>
          );
        })}
      </ModalSection>
      <ModalSection>
        {currentCheckItems.map(item => {
          return (
            <ModalButton
              width="60%"
              buttonColor={AVERO_ICON_BLUE}
              onClick={handleItemClick}
              margin="0.5rem"
              key={item.name}
            >
              {item.name}
            </ModalButton>
          );
        })}
      </ModalSection>
    </ModalContainer>
  </Modal>
);

export default AddItemsModal;
