import React from "react";
import { connect } from "react-redux";
import {
  getTables,
  startNewCheck,
  addMenuItem,
  closeCheck,
  voidItem,
  getMenuItems
} from "../actions/index";
import {
  Section,
  Container,
  GridContainer,
  Column,
  Row
} from "../styles/layout";
import TableCard from "../components/TableCard";
import OpenCheckModal from "../components/Modals/OpenCheckModal";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      return;
    } else {
      this.fetchTables();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tables !== nextProps.tables ||
      this.state.tables !== nextProps.tables
    ) {
      return;
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

    this.setState({
      activeCheckItems: [...this.state.activeCheckItems, newItem]
    });
  };

  handleVoidItem = async (item, index) => {
    await this.props.voidItem(item, this.state.activeCheckId, index);

    this.setState(state => {
      const activeCheckItems = state.activeCheckItems.map((checkItem, i) => {
        if (index === i) {
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

  calculateSubTotal = () => {
    if (this.state.activeCheckItems.length > 0) {
      const subTotal = this.state.activeCheckItems
        .map(item => parseFloat(item.price, 10))
        .reduce((a, b) => a + b);
      return subTotal;
    }
  };

  fetchTables = async () => {
    await this.props.getTables();
  };

  fetchMenuItems = async () => {
    await this.props.getMenuItems();
    this.setState({ menuItems: this.props.menuItems });
  };

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
        <OpenCheckModal
          show={this.state.showItemsModal}
          checkTotal={this.calculateSubTotal()}
          close={this.hideItemsModal}
          modalTitle={`Table ${this.state.activeTableNumber}`}
          menuItems={this.state.menuItems}
          currentCheckItems={this.state.activeCheckItems}
          handleItemClick={item => this.itemClickHandler(item)}
          handleVoidItemClick={(item, index) =>
            this.handleVoidItem(item, index)
          }
        />
        <Container>
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
    closedChecks: state.checks.closedChecks,
    menuItems: state.menu.menuItems
  };
};

export default connect(
  mapStateToProps,
  {
    getTables,
    startNewCheck,
    addMenuItem,
    closeCheck,
    voidItem,
    getMenuItems
  }
)(Tables);
