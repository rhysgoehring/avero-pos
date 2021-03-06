import React from "react";
import Modal from "../../BaseModal";
import ItemColumnTitle from "./styles";
import {
  ModalHeader,
  ModalTitle,
  ModalSection,
  ModalContainer,
  ItemRow,
  ItemName,
  ItemPrice
} from "../OpenCheckModal/styles";
import { LIGHT_GREY, RED } from "../../../styles/colors";

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
        <ModalSection
          height="auto"
          borderRight="none"
          width="100%"
          alignSelf="start"
          maxHeight="60rem"
        >
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
                  {item.voided ? "VOID" : `${item.price.toFixed(2)}`}
                </ItemPrice>
              </ItemRow>
            );
          })}
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Tax</ItemColumnTitle>
            <ItemPrice>{tax.toFixed(2).toString()}</ItemPrice>
          </ItemRow>
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Tip</ItemColumnTitle>
            <ItemPrice>{tip.toFixed(2).toString()}</ItemPrice>
          </ItemRow>
          <ItemRow>
            <ItemColumnTitle flex="0 0 50%">Total</ItemColumnTitle>
            <ItemPrice>{total.toFixed(2).toString()}</ItemPrice>
          </ItemRow>
        </ModalSection>
      </ModalContainer>
    </Modal>
  );
};

export default ViewCheckModal;
