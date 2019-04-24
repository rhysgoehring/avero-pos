import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardButton,
  CardButtonContainer
} from "./styles";
import {
  AVERO_GREEN,
  AVERO_ORANGE,
  AVERO_BLUE,
  RED,
  MEDIUM_GREY
} from "../../styles/colors";

const TableCard = props => {
  if (props.tableIsOpen) {
    return (
      <Card bgColor={props.bgColor}>
        <CardHeader>
          <CardTitle>{props.cardTitle}</CardTitle>
        </CardHeader>
        <CardButtonContainer>
          <CardButton onClick={props.handleAddItem} buttonColor={AVERO_ORANGE}>
            Add Item To Check
          </CardButton>
          <CardButton
            onClick={props.handleViewCurrentCheck}
            buttonColor={AVERO_BLUE}
          >
            View Current Check
          </CardButton>
          <CardButton onClick={props.handleCloseCheck} buttonColor={RED}>
            Close Current Check
          </CardButton>
        </CardButtonContainer>
      </Card>
    );
  }
  return (
    <Card bgColor={props.bgColor}>
      <CardHeader>
        <CardTitle>{props.cardTitle}</CardTitle>
      </CardHeader>
      <CardButtonContainer>
        <CardButton
          onClick={props.handleNewCheckClick}
          buttonColor={AVERO_GREEN}
        >
          Start New Check
        </CardButton>
      </CardButtonContainer>
    </Card>
  );
};

export default TableCard;
