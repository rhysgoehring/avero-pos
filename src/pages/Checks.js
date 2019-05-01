import React from "react";
import { connect } from "react-redux";
import { getServerChecks, getClosedCheckById } from "../actions";
import {
  Section,
  Container,
  CheckSectionContainer,
  CheckSection,
  CheckRowItem
} from "../styles/layout";
import { ItemRow as CheckRow } from "../components/Modals/AddItemsModal/styles";
import { CheckSectionTitle } from "../styles/typography";
import { ModalButton as ViewCheckButton } from "../components/BaseModal/styles";
import { AVERO_BLUE } from "../styles/colors";
import ViewCheckModal from "../components/Modals/ViewCheckModal";
import { roundNumber } from "../util";

class Checks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showViewCheckModal: false,
      activeTableNumber: "",
      activeTableOpenDate: "",
      activeCheckId: "",
      activeCheckItems: [],
      activeCheck: {}
    };
  }

  componentDidMount() {
    this.fetchChecksFromServer();
  }

  fetchChecksFromServer = async () => {
    await this.props.getServerChecks();
    // console.log("CHECKS PAGE, fetchChecks response", response);
  };

  showViewCheckModal = async check => {
    console.log("showViewCheckModal, check", check);
    // TODO: Call redux action to get check by id
    const { currentCheck } = await this.props.getClosedCheckById(check.id);
    console.log("RESPONSE", currentCheck);
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
      showViewCheckModal: false
    });
  };

  renderClosedChecks = () => {
    return this.props.closedChecks.map(check => {
      const tax = roundNumber(check.tax, 2);
      const tip = roundNumber(check.tip, 2);
      const checkTotal = roundNumber(tax / 0.08 + tip + tax, 2);
      console.log("checkTotal type", typeof checkTotal);
      return (
        <CheckRow key={check.id}>
          <CheckRowItem flex="0 0 20%">{check.dateUpdated}</CheckRowItem>
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
          <CheckRowItem flex="0 0 20%">{check.dateCreated}</CheckRowItem>
          <CheckRowItem flex="0 0 20%">{check.dateUpdated}</CheckRowItem>
          <CheckRowItem flex="0 0 10%">{check.tableNumber}</CheckRowItem>
          <ViewCheckButton
            width="10%"
            fontSize="1.5rem"
            buttonColor={AVERO_BLUE}
            onClick={() => this.viewCheckDetails(check)}
            margin="0 0 3px 0"
          >
            View Check
          </ViewCheckButton>
        </CheckRow>
      );
    });
  };

  sortClosedChecks = () => {
    console.log("sortClosedChecks clicked");
  };

  sortOpenChecks = () => {
    console.log("sortOpenChecks clicked");
  };

  render() {
    const {
      showViewCheckModal,
      activeTableNumber,
      activeTableOpenDate,
      activeCheckItems,
      activeCheck
    } = this.state;
    const tip = roundNumber(activeCheck.tip, 2);
    const tax = roundNumber(activeCheck.tax, 2);
    const total = roundNumber(tax / 0.08 + tip + tax, 2);
    return (
      <Section>
        <ViewCheckModal
          show={showViewCheckModal}
          close={this.hideViewCheckModal}
          modalTitle={`Check for Table ${activeTableNumber}, Opened On ${activeTableOpenDate}`}
          currentCheckItems={activeCheckItems}
          tax={tax}
          tip={tip}
          total={total}
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
                  Date
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
                <ViewCheckButton
                  width="10%"
                  fontSize="1.5rem"
                  buttonColor={AVERO_BLUE}
                  onClick={this.sortClosedChecks}
                  margin="0 0 3px 0"
                >
                  Sort By
                </ViewCheckButton>
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
                <ViewCheckButton
                  width="10%"
                  fontSize="1.5rem"
                  buttonColor={AVERO_BLUE}
                  onClick={this.sortOpenChecks}
                  margin="0 0 3px 0"
                >
                  Sort By
                </ViewCheckButton>
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
    // checksFromServer: state.checks.checksFromServer,
    openChecks: state.checks.checksFromServer.openChecks,
    closedChecks: state.checks.checksFromServer.closedChecks,
    tables: state.tables
  };
};

export default connect(
  mapStateToProps,
  { getServerChecks, getClosedCheckById }
)(Checks);
