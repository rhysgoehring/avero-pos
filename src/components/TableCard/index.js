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
  RED,
  MEDIUM_GREY
} from "../../styles/colors";

const TableCard = props => {
  if (props.tableIsOpen) {
    return (
      <Card bgColor={AVERO_GREEN}>
        <CardHeader>
          <CardTitle>{props.cardTitle}</CardTitle>
        </CardHeader>
        <CardButtonContainer>
          <CardButton onClick={props.handleAddItem} buttonColor={AVERO_ORANGE}>
            Modify / View Check
          </CardButton>
          <CardButton onClick={props.handleCloseCheck} buttonColor={RED}>
            Close Current Check
          </CardButton>
        </CardButtonContainer>
      </Card>
    );
  }
  return (
    <Card bgColor={MEDIUM_GREY}>
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
