import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getTables, startNewCheck } from "../actions/index";
import {
  Section,
  Container,
  GridContainer,
  Column,
  Row
} from "../styles/layout";
import { SubHeading } from "../styles/typography";
import TableCard from "../components/TableCard";
import { BASE_URL, requestConfig } from "../config";
import {
  AVERO_GREEN,
  AVERO_ORANGE,
  AVERO_BLUE,
  RED,
  MEDIUM_GREY
} from "../styles/colors";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTables: [],
      closedTables: [],
      menuItems: []
    };
  }

  componentDidMount() {
    const { openTables, closedTables } = this.props.tables;

    if (openTables.length > 0 || closedTables.length > 0) {
      this.setState({
        openTables,
        closedTables
      });
    } else {
      this.fetchTables();
    }
    // if (openTables.length === 0 || closedTables.length === 0) {
    //   this.fetchTables();
    // }
    // this.fetchTables();
    console.log("this.state", this.state);
    this.fetchMenuItems();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tables !== nextProps.tables ||
      this.state.tables !== nextProps.tables ||
      this.state.tables.openTables !== nextProps.tables.openTables ||
      this.state.tables.closedTables !== nextProps.tables.closedTables
    ) {
      console.log("component received props and changed state");
      this.setState({
        openTables: nextProps.tables.openTables,
        closedTables: nextProps.tables.closedTables
      });
    }
  }

  async fetchTables() {
    await this.props.getTables();
    this.setState({
      openTables: this.props.tables.openTables,
      closedTables: this.props.tables.closedTables
    });
  }

  async fetchMenuItems() {
    const { data } = await axios.get(`${BASE_URL}/items`, requestConfig);

    this.setState({ menuItems: data });
  }

  checkIfTableIsOpen(table) {
    if (this.state.closedTables.includes(table)) {
      return true;
    }
    return false;
  }

  async newCheckClickHandler(table, index) {
    const data = await this.props.startNewCheck(table, index);
    console.log("newCheckClick data on Tables page", data);

    // Remove table from openTables and add table to closedTables
    // const newOpenTables = [...this.state.openTables];
    // newOpenTables.splice(index, 1);
    // this.setState({
    //   openTables: newOpenTables,
    //   closedTables: [table, ...this.state.closedTables]
    // });
  }

  // async newCheckClickHandler(table, index) {
  //   await axios.delete(`${BASE_URL}/checks`, requestConfig);
  // }

  renderTables() {
    return this.props.tables.allTables.map((table, index) => {
      return (
        <Column col="2.4" key={table.number}>
          <TableCard
            tableIsOpen={this.checkIfTableIsOpen(table)}
            bgColor={
              this.checkIfTableIsOpen(table) ? { MEDIUM_GREY } : { AVERO_GREEN }
            }
            cardTitle={`Table ${table.number}`}
            handleNewCheckClick={() => this.newCheckClickHandler(table, index)}
          />
        </Column>
      );
    });
  }

  render() {
    return (
      <Section>
        <Container>
          <GridContainer>
            <Row>{this.renderTables()}</Row>
          </GridContainer>
        </Container>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    tables: state.tables,
    checks: state.checks
  };
}

export default connect(
  mapStateToProps,
  { getTables, startNewCheck }
)(Tables);
