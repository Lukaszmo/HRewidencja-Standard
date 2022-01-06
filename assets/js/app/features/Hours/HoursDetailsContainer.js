import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import HoursDetailsComponent from "./HoursDetailsComponent";
import { updateRecord, HourValidationSchema } from "../Hours/Hours";
import { getUserDetails } from "../User/User";
import { fetchProjectTasks, generateTasksForDropdown } from "../Admin/ProjectTasks/ProjectTasks";

class HoursDetailsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recordDetails: this.props.location.state.recordDetails[0],
            disabled: false,
            mode: 'EDIT',
            acceptor: null,     //dane kierownika który zaakceptował nadgodziny
            acceptorid: null    //id zalogowanego kierownika akceptującego nadgodziny
        }
    }

    componentDidMount() {

        const recordOwnerId = this.state.recordDetails.userid.id;
        const overtAcceptance = this.state.recordDetails.overtacceptance;
        const projectId = this.state.recordDetails.project.id;

        this.isRecordOwner(recordOwnerId);

        if (overtAcceptance === 1) {
            //użytkownik nie może edytować zaakceptowanych nadgodzin
            if (this.state.mode === 'EDIT') { this.setState({ disabled: true }); }
            const acceptorId = this.state.recordDetails.acceptorid;
            this.setAcceptor(acceptorId);
        }

        fetchProjectTasks(projectId).then(resp => this.setState({ tasks: generateTasksForDropdown(resp.data) }));
    }

    onEditFormSubmit = (id, values, msg) => {

        this.props.updateRecord(id, values, msg).then(() => this.setState({ recordDetails: this.props.updatedRecord }));

        const overtAcceptance = values.overtacceptance;

        if (overtAcceptance === 1) {
            const acceptorId = values.acceptorid;
            this.setAcceptor(acceptorId);
        }
    }

    setAcceptor(acceptorId) {

        getUserDetails(acceptorId).then(resp => this.setState({ acceptor: resp.data }));
    }

    onProjectDropdownChange = (projectId) => {

        fetchProjectTasks(projectId).then(resp => this.setState({ tasks: generateTasksForDropdown(resp.data) }));

    }

    isRecordOwner(recordOwnerId) {

        //recordOwnerId = 2; //dla testów

        if (this.props.user.id !== recordOwnerId) {

            this.setState({
                disabled: true,
                mode: 'ACCEPTANCE',
                acceptorid: this.props.user.id,
            })
        }
    }


    render() {
        console.log(this.state);
        return (
            <Container className="hours">
                <HoursDetailsComponent
                    types={this.props.hourTypes}
                    validationSchema={HourValidationSchema}
                    recordDetails={this.state.recordDetails}
                    onEditFormSubmit={this.onEditFormSubmit}
                    disabled={this.state.disabled}
                    mode={this.state.mode}
                    acceptor={this.state.acceptor}
                    acceptorid={this.state.acceptorid}
                    projects={this.props.user.projectList}
                    tasks={this.state.tasks}
                    onProjectDropdownChange={this.onProjectDropdownChange} />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    hourTypes: state.hour.types,
    user: state.loggedUser,
    updatedRecord: state.hour.updatedRecord
})

const mapDispatchToProps = dispatch => ({
    updateRecord: (id, values, msg) => dispatch(updateRecord(id, values, msg))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursDetailsContainer);



