import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getTables,
  startNewCheck,
  addMenuItem,
  closeCheck,
  voidItem
} from "../actions/index";
import {
  Section,
  Container,
  GridContainer,
  Column,
  Row
} from "../styles/layout";
import { SubHeading } from "../styles/typography";
import TableCard from "../components/TableCard";
import Modal from "../components/BaseModal";
import AddItemsModal from "../components/Modals/AddItemsModal";
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
      menuItems: [],
      activeCheckItems: [],
      activeTableId: "",
      activeTableNumber: "",
      activeCheckId: "",
      showItemsModal: false
    };
  }

  componentDidMount() {
    const { openTables, closedTables } = this.props.tables;

    this.fetchMenuItems();

    if (openTables.length > 0 || closedTables.length > 0) {
      this.setState({
        openTables,
        closedTables
      });
    } else {
      this.fetchTables();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tables !== nextProps.tables ||
      this.state.tables !== nextProps.tables
      // this.state.tables.openTables !== nextProps.tables.openTables
      // this.state.tables.closedTables !== nextProps.tables.closedTables ||
      // this.props.tables.openTables !== nextProps.tables.openTables ||
      // this.props.tables.closedTables !== nextProps.tables.closedTables
    ) {
      this.setState({
        openTables: nextProps.tables.openTables,
        closedTables: nextProps.tables.closedTables
      });
    }
  }

  checkIfTableIsOpen = table => {
    if (this.props.tables.closedTables.includes(table)) {
      return true;
    }
    return false;
  };

  newCheckClickHandler = async table => {
    const { data } = await this.props.startNewCheck(table);

    this.setState({
      activeTableId: table.id,
      activeTableNumber: table.number,
      activeCheckId: data.id
    });
  };

  showItemsModal = async table => {
    const checkForTable = await this.props.openChecks.find(
      check => check.tableId === table.id
    );
    const checkId = checkForTable.id;
    console.log("table, ", table);
    this.setState({
      showItemsModal: true,
      activeTableId: table.id,
      activeTableNumber: table.number,
      activeCheckId: checkId,
      activeCheckItems: checkForTable.orderedItems
    });
  };

  hideItemsModal = () => {
    this.setState({
      showItemsModal: false,
      activeTableId: "",
      activeTableNumber: "",
      activeCheckId: ""
    });
  };

  handleCloseCurrentCheck = table => {
    this.props.closeCheck(table);
  };

  itemClickHandler = async item => {
    const tableId = this.state.activeTableId;

    const { newItem } = await this.props.addMenuItem(item, tableId);

    // TODO: Use state callback like in handleVoidItem
    this.setState({
      activeCheckItems: [...this.state.activeCheckItems, newItem]
    });
  };

  handleVoidItem = async item => {
    await this.props.voidItem(item, this.state.activeCheckId);
    this.setState(state => {
      const activeCheckItems = state.activeCheckItems.map(checkItem => {
        if (checkItem.id === item.id) {
          return {
            ...checkItem,
            voided: true,
            price: 0
          };
        } else {
          return checkItem;
        }
      });
      return {
        activeCheckItems
      };
    });
  };

  calculateTotal = () => {
    if (this.state.activeCheckItems.length > 0) {
      const total = this.state.activeCheckItems
        .map(item => parseFloat(item.price, 10))
        .reduce((a, b) => a + b);
      return total;
    }
  };

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
    return this.props.tables.allTables.map((table, index) => {
      return (
        <Column col="2.4" key={table.number}>
          <TableCard
            tableIsOpen={this.checkIfTableIsOpen(table)}
            cardTitle={`Table ${table.number}`}
            handleNewCheckClick={() => this.newCheckClickHandler(table)}
            handleAddItem={() => this.showItemsModal(table)}
            handleViewCheck={() => this.handleViewCurrentCheck(table, index)}
            handleCloseCheck={() => this.handleCloseCurrentCheck(table)}
          />
        </Column>
      );
    });
  }

  render() {
    return (
      <Section>
        <AddItemsModal
          show={this.state.showItemsModal}
          // show={true}
          checkTotal={this.calculateTotal()}
          close={this.hideItemsModal}
          modalTitle={`Table ${this.state.activeTableNumber}`}
          menuItems={this.state.menuItems}
          currentCheckItems={this.state.activeCheckItems}
          handleItemClick={item => this.itemClickHandler(item)}
          handleVoidItemClick={item => this.handleVoidItem(item)}
        />
        <Container>
          <SubHeading>Tables</SubHeading>
          <GridContainer>
            <Row>{this.renderTables()}</Row>
          </GridContainer>
        </Container>
      </Section>
    );
  }
}

const mapStateToProps = state => {
  return {
    tables: state.tables,
    openChecks: state.checks.openChecks,
    closedChecks: state.checks.closedChecks
  };
};

export default connect(
  mapStateToProps,
  { getTables, startNewCheck, addMenuItem, closeCheck, voidItem }
)(Tables);
