import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getTables } from "../actions/index";
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
    this.fetchTables();
    this.fetchMenuItems();
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

  renderTables() {
    const allTables = this.state.openTables.concat(this.state.closedTables);
    console.log("allTables", allTables);
    return allTables.map(table => {
      console.log("table", table);
      return (
        <Column col="2.4" key={table.id}>
          <TableCard
            bgColor={MEDIUM_GREY}
            cardTitle={`Table ${table.number}`}
          />
        </Column>
      );
    });
  }

  render() {
    return (
      <Section>
        <Container>
          {/* <SubHeading>Tables</SubHeading> */}
          <GridContainer>
            <Row>
              {this.renderTables()}
              {/* <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column>
              <Column col="2.4">
                <TableCard />
              </Column> */}
            </Row>
          </GridContainer>
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

export default connect(
  mapStateToProps,
  { getTables }
)(Tables);
