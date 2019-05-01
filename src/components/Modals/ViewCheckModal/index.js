import React from "react";
import Modal from "../../BaseModal";
import { ModalButton } from "../../BaseModal/styles";
import { ItemColumnTitle } from "./styles";
import {
  ModalHeader,
  ModalTitle,
  ModalSection,
  ModalContainer,
  ItemRow,
  ItemName,
  ItemPrice
} from "../AddItemsModal/styles";
import {
  LIGHT_GREY,
  AVERO_ICON_RED,
  RED,
  AVERO_GREEN
} from "../../../styles/colors";

// TODO: Display tax, tip, total under currentCheckItems
const ViewCheckModal = ({
  show,
  close,
  modalTitle,
  currentCheckItems,
  tax,
  tip,
  total
}) => {
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
      <ModalContainer flexDirection="column">
        <ModalSection borderRight="none" width="100%" alignSelf="start">
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Item</ItemColumnTitle>
            <ItemColumnTitle flex="0 0 33%">Price</ItemColumnTitle>
          </ItemRow>
          {currentCheckItems.map(item => {
            return (
              <ItemRow key={item.orderedItemId}>
                <ItemName
                  textDecoration={item.voided ? `line-through ${RED}` : "none"}
                  color={item.voided ? `${RED}` : "black"}
                >
                  {item.name}
                </ItemName>
                <ItemPrice color={item.voided ? `${RED}` : "black"}>
                  {item.voided ? "VOID" : `${item.price}`}
                </ItemPrice>
              </ItemRow>
            );
          })}
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Tax</ItemColumnTitle>
            <ItemPrice>{tax}</ItemPrice>
          </ItemRow>
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Tip</ItemColumnTitle>
            <ItemPrice>{tip}</ItemPrice>
          </ItemRow>
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Total</ItemColumnTitle>
            <ItemPrice>{total}</ItemPrice>
          </ItemRow>
        </ModalSection>
      </ModalContainer>
    </Modal>
  );
};

export default ViewCheckModal;
