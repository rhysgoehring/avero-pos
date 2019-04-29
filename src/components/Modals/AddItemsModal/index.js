import React from "react";
import Modal from "../../BaseModal";
import { ModalButton } from "../../BaseModal/styles";
import {
  LIGHT_GREY,
  AVERO_ICON_BLUE,
  AVERO_ICON_GREEN,
  AVERO_ICON_RED,
  RED,
  AVERO_GREEN
} from "../../../styles/colors";
import {
  ModalHeader,
  ModalTitle,
  ModalContainer,
  ModalSection,
  ColumnTitle,
  ItemRow,
  ItemName,
  ItemPrice
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
  currentCheckItems,
  checkTotal,
  handleVoidItemClick
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
        <ColumnTitle>Menu Items</ColumnTitle>
        <Row>
          {menuItems.map(item => {
            return (
              <Column
                col="12"
                key={item.name}
                padding="0"
                justifyContent="flex-start"
              >
                <ItemRow>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price}</ItemPrice>
                  <ModalButton
                    width="9rem"
                    fontSize="1.3rem"
                    buttonColor={AVERO_GREEN}
                    onClick={() => handleItemClick(item)}
                    margin="0"
                  >
                    Add Item
                  </ModalButton>
                </ItemRow>
              </Column>
            );
          })}
        </Row>
      </ModalSection>
      <ModalSection alignSelf="start">
        <ColumnTitle>Current Check Total: ${checkTotal}</ColumnTitle>
        {currentCheckItems.map((item, index) => {
          // TODO: create new unique key
          const uniqueKey = parseInt(item.id, 10) + index;
          return (
            <ItemRow key={uniqueKey}>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price}</ItemPrice>
              <ModalButton
                width="9rem"
                fontSize="1rem"
                buttonColor={AVERO_ICON_RED}
                onClick={() => handleVoidItemClick(item)}
                margin="0"
              >
                VOID
              </ModalButton>
            </ItemRow>
          );
        })}
      </ModalSection>
    </ModalContainer>
  </Modal>
);

export default AddItemsModal;
