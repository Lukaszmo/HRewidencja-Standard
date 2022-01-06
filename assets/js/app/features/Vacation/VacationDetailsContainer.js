import React, { Component } from "react";
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import VacationDetailsComponent from './VacationDetailsComponent';
import { updateRecord, generatePDF } from './Vacation';

class VacationDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
        mode: null,
        acceptor: null,
        acceptorid: null,
        labelClass: null,
        leftButtonClass: 'cancelButton'
    }

    componentDidMount() {

        const recordOwnerId = this.state.recordDetails.user.id;
        const requestState = this.state.recordDetails.state.state;

        this.setMode(recordOwnerId);
        this.setLabelClass(requestState);

    }

    setMode(recordOwnerId) {

        if (this.props.user.id !== recordOwnerId) {

            this.setState({
                mode: 'ACCEPTANCE'
            })
        }
    }

    setLabelClass(requestState) {

        let labelClass = null;

        if (requestState == 1) labelClass = 'neutral';          // Utworzony
        else if (requestState == 2) labelClass = 'waiting';     // Czeka na akceptację
        else if (requestState == 3) labelClass = 'neutral';     // Wniosek do poprawienia
        else if (requestState == 4) labelClass = 'positive';    // Zaakceptowany
        else if (requestState == 5) labelClass = 'negative';    // Odrzucony
        else if (requestState == 6) labelClass = 'negative';    // Anulowany

        this.setState({ labelClass: labelClass });

    }

    changeStatus = (id, newState, msg) => {

        this.props.updateRecord(id, newState, msg).then(() => this.setState({ recordDetails: this.props.updatedRecord }));
        this.setLabelClass(newState);
    }

    onPrintIconClick = () => {

        generatePDF(this.state.recordDetails);
    }


    render() {


        return (
            <Container className="vacation">
                <VacationDetailsComponent
                    recordDetails={this.state.recordDetails}
                    mode={this.state.mode}
                    labelClass={this.state.labelClass}
                    leftButtonClass={this.state.leftButtonClass}
                    changeStatus={this.changeStatus}
                    onPrintIconClick={this.onPrintIconClick}
                />
            </Container>

        )
    }
}

const mapStateToProps = state => ({
    user: state.loggedUser,
    updatedRecord: state.vacation.updatedRecord
})

const mapDispatchToProps = dispatch => ({
    updateRecord: (id, newStatus, msg) => dispatch(updateRecord(id, newStatus, msg))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VacationDetailsContainer);
