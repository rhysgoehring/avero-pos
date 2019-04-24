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

const TableCard = props => (
  <Card bgColor={props.bgColor}>
    <CardHeader>
      <CardTitle>{props.cardTitle}</CardTitle>
    </CardHeader>
    <CardButtonContainer>
      <CardButton onClick={props.handleNewCheckClick} buttonColor={AVERO_GREEN}>Start New Check</CardButton>
    </CardButtonContainer>
  </Card>
);

export default TableCard;
