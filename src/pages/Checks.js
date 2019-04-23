import React from "react";
import { Section, Container } from "../styles/layout";

class Checks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Section>
        <Container>
          <h1>Hello Checks</h1>
        </Container>
      </Section>
    );
  }
}

export default Checks;
