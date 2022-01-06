import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import HoursSummaryComponent from './HoursSummaryComponent';
import { fetchInferiors, generateUserListForDropdown } from "../User/User";
import { fetchHoursByType, fetchHoursByProject, fetchHoursByTask } from "../Hours/Hours";
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import { checkItemAccess } from '../../utils/AuthService';



class HoursSummaryContainer extends Component {

    componentDidMount() {

        const userId = this.props.user.id;
        const currentDate = new Date();
        const filters = {
            dateFrom: getFirstDayOfMonth(currentDate),
            dateTo: getLastDayOfMonth(currentDate)
        }

        checkItemAccess("TIMESHEET")
            .then(() => this.props.fetchInferiors(userId))
            .then(() => this.props.fetchHoursByType(userId, filters))
            .then(() => this.props.fetchHoursByProject(userId, filters))
            .then(() => this.props.fetchHoursByTask(userId, filters));
    }

    onFilterSubmit = (userid, filters) => {

        this.props.fetchHoursByType(userid, filters);
        this.props.fetchHoursByProject(userid, filters);
        this.props.fetchHoursByTask(userid, filters);
    }


    render() {

        return (
            <Container className="hours">
                <HoursSummaryComponent

                    userList={generateUserListForDropdown(this.props.inferiors, this.props.user)}
                    loggedUser={this.props.user}
                    onFilterSubmit={this.onFilterSubmit}
                    hoursByType={this.props.hours.recordsByType}
                    hoursByProject={this.props.hours.recordsByProject}
                    hoursByTask={this.props.hours.recordsByTask}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    hours: state.hour,
    user: state.loggedUser,
    inferiors: state.loggedUser.inferiors
})

const mapDispatchToProps = dispatch => ({
    fetchInferiors: (managerid) => dispatch(fetchInferiors(managerid)),
    fetchHoursByType: (userid, filters) => dispatch(fetchHoursByType(userid, filters)),
    fetchHoursByProject: (userid, filters) => dispatch(fetchHoursByProject(userid, filters)),
    fetchHoursByTask: (userid, filters) => dispatch(fetchHoursByTask(userid, filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursSummaryContainer);



