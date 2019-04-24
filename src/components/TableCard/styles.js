import styled from "styled-components";

const Card = styled.div`
  height: 35rem;
  width: 25rem;
  background-color: ${props => props.bgColor};
  display: flex;
  border-radius: 1.5rem;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid black;
`;

export { Card };
