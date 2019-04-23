import React from "react";
import { connect } from "react-redux";
import { getTables } from "../actions/index";
import { Section, Container } from "../styles/layout";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const tables = await this.props.getTables();
  }

  render() {
    return (
      <Section>
        <Container>
          <h1>Hello Tables</h1>
        </Container>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    tables: state.tables
  };
}

export default connect(mapStateToProps, { getTables })(Tables);
