import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  getTables,
  startNewCheck,
  addMenuItem,
  closeCheck
} from '../actions/index';
import {
  Section,
  Container,
  GridContainer,
  Column,
  Row
} from '../styles/layout';
import { SubHeading } from '../styles/typography';
import TableCard from '../components/TableCard';
import Modal from '../components/BaseModal';
import AddItemsModal from '../components/Modals/AddItemsModal';
import { BASE_URL, requestConfig } from '../config';
import {
  AVERO_GREEN,
  AVERO_ORANGE,
  AVERO_BLUE,
  RED,
  MEDIUM_GREY
} from '../styles/colors';

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTables: [],
      closedTables: [],
      menuItems: [],
      activeTableId: '',
      activeTableNumber: '',
      activeCheckId: '',
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
      this.state.tables !== nextProps.tables ||
      this.state.tables.openTables !== nextProps.tables.openTables
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

  checkIfTableIsOpen = table => {
    if (this.props.tables.closedTables.includes(table)) {
      return true;
    }
    return false;
  };

  newCheckClickHandler = async (table, index) => {
    const { data } = await this.props.startNewCheck(table, index);

    this.setState({
      activeTableId: table.id,
      activeTableNumber: table.number,
      activeCheckId: data.id
    });
  };

  showItemsModal = (table, index) => {
    this.setState({ showItemsModal: true });
    this.setState({
      activeTableId: table.id
    });
  };

  hideItemsModal = () => {
    this.setState({ showItemsModal: false });
    this.setState({
      activeTableId: '',
      activeTableNumber: '',
      activeCheckId: ''
    });
  };
  handleCloseCurrentCheck = (table, index) => {
    this.props.closeCheck(table, index);
  };

  renderTables() {
    return this.props.tables.allTables.map((table, index) => {
      return (
        <Column col="2.4" key={table.number}>
          <TableCard
            tableIsOpen={this.checkIfTableIsOpen(table)}
            cardTitle={`Table ${table.number}`}
            handleNewCheckClick={() => this.newCheckClickHandler(table, index)}
            handleAddItem={() => this.showItemsModal(table, index)}
            handleViewCheck={() => this.handleViewCurrentCheck(table, index)}
            handleCloseCheck={() => this.handleCloseCurrentCheck(table, index)}
          />
        </Column>
      );
    });
  }

  itemClickHandler = async item => {
    // TODO: Get CheckId in redux action, activeCheckId is not reliable
    const tableId = this.state.activeTableId;

    await this.props.addMenuItem(item, tableId);
  };

  render() {
    return (
      <Section>
        <AddItemsModal
          show={this.state.showItemsModal}
          // show={true}
          close={this.hideItemsModal}
          modalTitle={`Table ${this.state.activeTableNumber}`}
          menuItems={this.state.menuItems}
          currentCheckItems={this.state.menuItems}
          handleItemClick={item => this.itemClickHandler(item)}
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

function mapStateToProps(state) {
  return {
    tables: state.tables,
    checks: state.checks
  };
}

export default connect(
  mapStateToProps,
  { getTables, startNewCheck, addMenuItem, closeCheck }
)(Tables);
