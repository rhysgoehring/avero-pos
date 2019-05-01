import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  getServerChecks,
  getCheckById,
  voidItem,
  addMenuItem
} from "../actions";
import {
  Section,
  Container,
  CheckSectionContainer,
  CheckSection,
  CheckRowItem
} from "../styles/layout";
import { ItemRow as CheckRow } from "../components/Modals/OpenCheckModal/styles";
import { CheckSectionTitle } from "../styles/typography";
import { ModalButton as ViewCheckButton } from "../components/BaseModal/styles";
import { AVERO_BLUE } from "../styles/colors";
import ViewCheckModal from "../components/Modals/ViewCheckModal";
import OpenCheckModal from "../components/Modals/OpenCheckModal";
import { roundNumber } from "../util";

class Checks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showViewCheckModal: false,
      showOpenCheckModal: false,
      activeTableNumber: "",
      activeTableOpenDate: "",
      activeCheckId: "",
      activeCheckItems: [],
      activeCheck: {},
      menuItems: this.props.menuItems
    };
  }

  componentDidMount() {
    this.fetchChecksFromServer();
  }

  fetchChecksFromServer = async () => {
    await this.props.getServerChecks();
  };

  showViewCheckModal = async check => {
    const { currentCheck } = await this.props.getCheckById(check.id);

    this.setState({
      showViewCheckModal: true,
      activeTableNumber: check.tableNumber,
      activeTableOpenDate: check.dateCreated,
      activeCheckId: check.id,
      activeCheckItems: currentCheck.orderedItems,
      activeCheck: currentCheck
    });
  };

  hideViewCheckModal = () => {
    this.setState({
      showViewCheckModal: false,
      activeTableNumber: "",
      activeTableOpenDate: "",
      activeTableId: "",
      activeCheckId: "",
      activeCheckItems: [],
      activeCheck: {}
    });
  };

  renderClosedChecks = () => {
    return this.props.closedChecks.map(check => {
      const tax = roundNumber(check.tax, 2);
      const tip = roundNumber(check.tip, 2);
      const checkTotal = roundNumber(tax / 0.08 + tip + tax, 2);
      return (
        <CheckRow key={check.id}>
          <CheckRowItem flex="0 0 20%">
            {moment(check.dateUpdated).format("MMMM Do YYYY, h:mm:ss")}
          </CheckRowItem>
          <CheckRowItem flex="0 0 10%">{check.tableNumber}</CheckRowItem>
          <CheckRowItem flex="0 0 10%">{tax.toFixed(2)}</CheckRowItem>
          <CheckRowItem flex="0 0 10%">{tip.toFixed(2)}</CheckRowItem>
          <CheckRowItem flex="0 0 10%">{checkTotal.toFixed(2)}</CheckRowItem>
          <ViewCheckButton
            width="10%"
            fontSize="1.5rem"
            buttonColor={AVERO_BLUE}
            onClick={() => this.showViewCheckModal(check)}
            margin="0 0 3px 0"
          >
            View Check
          </ViewCheckButton>
        </CheckRow>
      );
    });
  };

  renderOpenChecks = () => {
    return this.props.openChecks.map(check => {
      console.log("openCheck", check);
      return (
        <CheckRow key={check.id}>
          <CheckRowItem flex="0 0 20%">
            {moment(check.dateCreated).format("MMMM Do YYYY, h:mm:ss")}
          </CheckRowItem>
          <CheckRowItem flex="0 0 20%">
            {moment(check.dateUpdated).format("MMMM Do YYYY, h:mm:ss")}
          </CheckRowItem>
          <CheckRowItem flex="0 0 10%">{check.tableNumber}</CheckRowItem>
          <ViewCheckButton
            width="10%"
            fontSize="1.5rem"
            buttonColor={AVERO_BLUE}
            onClick={() => this.showOpenCheckModal(check)}
            margin="0 0 3px 0"
          >
            View Check
          </ViewCheckButton>
        </CheckRow>
      );
    });
  };

  showOpenCheckModal = async check => {
    const { currentCheck } = await this.props.getCheckById(check.id);
    this.setState({
      showOpenCheckModal: true,
      activeTableNumber: check.tableNumber,
      activeTableId: check.tableId,
      activeTableOpenDate: check.dateCreated,
      activeCheckId: check.id,
      activeCheckItems: currentCheck.orderedItems,
      activeCheck: currentCheck
    });
  };

  hideOpenCheckModal = () => {
    this.setState({
      showOpenCheckModal: false,
      activeTableId: "",
      activeTableNumber: "",
      activeTableOpenDate: "",
      activeCheckId: "",
      activeCheckItems: [],
      activeCheck: {}
    });
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

  sortClosedChecks = () => {
    console.log("sortClosedChecks clicked");
  };

  sortOpenChecks = () => {
    console.log("sortOpenChecks clicked");
  };

  calculateSubTotal = () => {
    if (this.state.activeCheckItems.length > 0) {
      const subTotal = this.state.activeCheckItems
        .map(item => parseFloat(item.price, 10))
        .reduce((a, b) => a + b);
      return subTotal;
    }
  };

  render() {
    const {
      showViewCheckModal,
      activeTableNumber,
      activeTableOpenDate,
      activeCheckItems,
      activeCheck,
      showOpenCheckModal
    } = this.state;
    const tip = roundNumber(activeCheck.tip, 2);
    const tax = roundNumber(activeCheck.tax, 2);
    const total = roundNumber(tax / 0.08 + tip + tax, 2);
    return (
      <Section>
        <ViewCheckModal
          show={showViewCheckModal}
          close={this.hideViewCheckModal}
          modalTitle={`Table ${activeTableNumber}, Opened On ${moment(
            activeTableOpenDate
          ).format("MMMM Do YYYY, h:mm:ss")}`}
          currentCheckItems={activeCheckItems}
          tax={tax}
          tip={tip}
          total={total}
        />
        <OpenCheckModal
          show={showOpenCheckModal}
          checkTotal={this.calculateSubTotal()}
          close={this.hideOpenCheckModal}
          modalTitle={`Table ${this.state.activeTableNumber}`}
          menuItems={this.state.menuItems}
          currentCheckItems={this.state.activeCheckItems}
          handleItemClick={item => this.itemClickHandler(item)}
          handleVoidItemClick={(item, index) =>
            this.handleVoidItem(item, index)
          }
        />
        <Container
          marginTop="1rem"
          height="42vh"
          justifyContent="flex-start"
          border="2px solid black"
        >
          <CheckSectionTitle>CLOSED CHECKS</CheckSectionTitle>
          <CheckSectionContainer>
            <CheckSection>
              <CheckRow>
                <CheckRowItem bold flex="0 0 20%">
                  Closed On
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  Table Number
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  Tax
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  Tip
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  Total
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  View Check
                </CheckRowItem>
              </CheckRow>

              {this.renderClosedChecks()}
            </CheckSection>
          </CheckSectionContainer>
        </Container>
        <Container
          marginTop="1rem"
          height="42vh"
          justifyContent="flex-start"
          border="2px solid black"
        >
          <CheckSectionTitle>OPEN CHECKS</CheckSectionTitle>
          <CheckSectionContainer>
            <CheckSection>
              <CheckRow>
                <CheckRowItem bold flex="0 0 20%">
                  Opened On
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 20%">
                  Updated On
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  Table Number
                </CheckRowItem>
                <CheckRowItem bold flex="0 0 10%">
                  View Check
                </CheckRowItem>
              </CheckRow>
              {this.renderOpenChecks()}
            </CheckSection>
          </CheckSectionContainer>
        </Container>
      </Section>
    );
  }
}

const mapStateToProps = state => {
  return {
    openChecks: state.checks.checksFromServer.openChecks,
    closedChecks: state.checks.checksFromServer.closedChecks,
    tables: state.tables,
    menuItems: state.menu.menuItems
  };
};

export default connect(
  mapStateToProps,
  {
    getServerChecks,
    getCheckById,
    voidItem,
    addMenuItem
  }
)(Checks);
