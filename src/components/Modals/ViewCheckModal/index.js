import React from "react";
import Modal from "../../BaseModal";
import { ModalButton } from "../../BaseModal/styles";
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
const ViewCheckModal = ({ show, close, modalTitle, currentCheckItems }) => {
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
            <ItemName>
              <strong>Item</strong>
            </ItemName>
            <ItemPrice>
              <strong>Price</strong>
            </ItemPrice>
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
        </ModalSection>
      </ModalContainer>
    </Modal>
  );
};

export default ViewCheckModal;
