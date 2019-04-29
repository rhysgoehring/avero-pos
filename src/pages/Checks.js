import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getServerChecks } from '../actions';
import {
  Section,
  Container,
  GridContainer,
  Column,
  Row
} from '../styles/layout';
import { SubHeading } from '../styles/typography';

class Checks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.fetchChecksFromServer();
  }

  fetchChecksFromServer = async () => {
    const response = await this.props.getServerChecks();
    console.log('CHECKS PAGE, fetchChecks response', response);
  };

  render() {
    return (
      <Section>
        <Container style={{ border:"1px solid black"}}>
          <SubHeading>Closed Checks</SubHeading>
        </Container>
        <Container>
          <SubHeading>Open Checks</SubHeading>
        </Container>
      </Section>
    );
  }
}

const mapStateToProps = state => {
  return {
    checksFromServer: state.checks.checksFromServer,
    openChecks: state.checks.openChecks,
    closedChecks: state.checks.closedChecks,
    tables: state.tables
  };
};

export default connect(
  mapStateToProps,
  { getServerChecks }
)(Checks);
