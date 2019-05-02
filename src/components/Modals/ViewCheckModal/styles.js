import styled from "styled-components/macro";
import { ItemName } from "../OpenCheckModal/styles";

const ItemColumnTitle = styled(ItemName)`
  font-weight: bold;
  flex: ${({ flex }) => flex};
`;

export default ItemColumnTitle;
