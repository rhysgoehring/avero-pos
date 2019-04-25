import styled from "styled-components/macro";

const Card = styled.div`
  height: 31rem;
  width: 25rem;
  background-color: ${props => props.bgColor};
  display: flex;
  border-radius: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.bgColor};
`;

const CardHeader = styled.div`
  height: 15%;
  width: 100%;
  border-bottom: 1px solid white;
  display: flex;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.p`
  font-size: 1.8rem;
  color: white;
`;

const CardButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const CardButton = styled.button`
  background-color: ${props => props.buttonColor};
  color: white;
  font-size: 2rem;
  width: 80%;
  border-radius: 1rem;
  text-decoration: none;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.buttonColor};
  z-index: 999;
  padding: 1rem 1.2rem;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export { Card, CardHeader, CardTitle, CardButton, CardButtonContainer };
