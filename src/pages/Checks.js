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

class Checks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showViewCheckModal: false,
      activeTableNumber: "",
      activeTableOpenDate: "",
      activeCheckId: "",
      activeCheckItems: []
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
      activeCheckItems: currentCheck.orderedItems
    });
  };

  hideViewCheckModal = () => {
    this.setState({
      showViewCheckModal: false
    });
  };

  renderClosedChecks = () => {
    return this.props.closedChecks.map(check => {
      const checkTotal = check.tax / 0.08 + check.tip;
      return (
        <CheckRow key={check.id}>
          <CheckRowItem>{check.dateUpdated}</CheckRowItem>
          <CheckRowItem>{check.tableNumber}</CheckRowItem>
          <CheckRowItem>{check.tax}</CheckRowItem>
          <CheckRowItem>{check.tip}</CheckRowItem>
          <CheckRowItem>{checkTotal}</CheckRowItem>
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
          <CheckRowItem>{check.dateCreated}</CheckRowItem>
          <CheckRowItem>{check.dateUpdated}</CheckRowItem>
          <CheckRowItem>{check.tableNumber}</CheckRowItem>
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
      activeTableOpenDate
    } = this.state;
    return (
      <Section>
        <ViewCheckModal
          show={showViewCheckModal}
          close={this.hideViewCheckModal}
          modalTitle={`Check for Table ${activeTableNumber}, Opened On ${activeTableOpenDate}`}
          currentCheckItems={this.state.activeCheckItems}
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
                <CheckRowItem>Date</CheckRowItem>
                <CheckRowItem>Table Number</CheckRowItem>
                <CheckRowItem>Tax</CheckRowItem>
                <CheckRowItem>Tip</CheckRowItem>
                <CheckRowItem>Total</CheckRowItem>
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
                <CheckRowItem>Opened On</CheckRowItem>
                <CheckRowItem>Updated On</CheckRowItem>
                <CheckRowItem>Table Number</CheckRowItem>
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
