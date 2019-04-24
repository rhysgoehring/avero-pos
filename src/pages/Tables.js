import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getTables } from "../actions/index";
import { Section, Container } from "../styles/layout";
import { BASE_URL, requestConfig } from "../config";

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
      return <h1 key={table.id}>{table.number}</h1>;
    });
  }

  render() {
    return (
      <Section>
        <Container>{this.renderTables()}</Container>
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
