import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../history';

import { Container } from 'semantic-ui-react';
import VacationListComponent from "./VacationListComponent";
import { fetchAllRecords } from "../Vacation/Vacation";
import { fetchInferiors, generateUserListForDropdown } from "../User/User";
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import { checkItemAccess } from '../../utils/AuthService';


class VacationListContainer extends Component {

    state = {
        dateFrom: getFirstDayOfMonth(new Date()),
        dateTo: getLastDayOfMonth(new Date())
    };

    componentDidMount() {

        const filters = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        }

        checkItemAccess("VACATION")
            .then(() => this.props.fetchInferiors(this.props.user.id))
            .then(() => this.props.fetchAllRecords(this.props.user.id, filters));
    }

    filterData(data) {

        const filteredData = data.map(function (object) {

            object = { ...object, employeeFullname: object.user.firstname + ' ' + object.user.lastname }
            return object;
        })

        return filteredData;
    }

    onFilterSubmit = (userid, filters) => {

        this.props.fetchAllRecords(userid, filters);
    }

    onTableChange = (rowAction, rowId) => {

        let record = this.props.requests.filter(item => item.id === rowId);
        history.push({ pathname: '/urlopy/szczegoly-wniosku', state: { recordDetails: record } });
    }


    render() {

        if (this.props.requests) {
            return (
                <Container className="vacation">
                    <VacationListComponent
                        data={this.filterData(this.props.requests)}
                        onTableChange={this.onTableChange}
                        loggedUser={this.props.user}
                        userList={generateUserListForDropdown(this.props.inferiors, this.props.user)}
                        onFilterSubmit={this.onFilterSubmit}
                        dateFrom={this.state.dateFrom}
                        dateTo={this.state.dateTo}
                    />
                </Container >
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    user: state.loggedUser,
    requests: state.vacation.records,
    inferiors: state.loggedUser.inferiors
})

const mapDispatchToProps = dispatch => ({
    fetchAllRecords: (id, filters) => dispatch(fetchAllRecords(id, filters)),
    fetchInferiors: (managerid) => dispatch(fetchInferiors(managerid))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VacationListContainer);



