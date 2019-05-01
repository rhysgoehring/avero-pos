import styled from "styled-components/macro";
import { ItemName } from "../AddItemsModal/styles";

const ItemColumnTitle = styled(ItemName)`
  font-weight: bold;
  flex: ${({ flex }) => flex};
`;

export { ItemColumnTitle };
