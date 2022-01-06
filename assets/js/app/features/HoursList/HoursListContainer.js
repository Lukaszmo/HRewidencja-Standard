import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../history';

import { Container } from 'semantic-ui-react';
import HoursListComponent from "./HoursListComponent";
import { fetchHourRecords, removeRecord } from "../Hours/Hours";
import { fetchInferiors, generateUserListForDropdown } from "../User/User";
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import { checkItemAccess } from '../../utils/AuthService';


class HoursListContainer extends Component {

    state = {
        dateFrom: getFirstDayOfMonth(new Date()),
        dateTo: getLastDayOfMonth(new Date()),
        deleteDisabled: false
    };

    componentDidMount() {

        const filters = {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        }

        checkItemAccess("TIMESHEET")
            .then(() => this.props.fetchInferiors(this.props.user.id))
            .then(() => this.props.fetchHourRecords(this.props.user.id, filters));
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {

            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/czas-pracy/edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }

    }

    onFilterSubmit = (userid, filters) => {

        this.props.fetchHourRecords(userid, filters);

        if (userid !== this.props.user.id) {
            this.setState({ deleteDisabled: true });
        }
        else { this.setState({ deleteDisabled: false }); }
    }

    addProperties = (data) => {

        //W tym miejscu możemy dodać nowe properties do tablicy data przed przekazaniem jej do komponentu Tabela

        const dailyRegularTime = 8; //TODO powinno być pobierane z bazy

        for (const index in data) {

            let result = data.filter(obj => {
                return obj.date === data[index].date
            })

            let qnt = 0;
            let hoursType = data[index].type.code;

            //dzienna ilość godzin regularnych
            for (let i = 0; i < result.length; i++) {

                if (result[i].type.code === 'REGULAR') { qnt = qnt + result[i].quantity; }
            }

            if (hoursType === 'REGULAR') {
                if (qnt === dailyRegularTime) { data[index].class = 'row-positive'; }
                else {
                    data[index].class = 'row-negative';
                }
            }

            if (hoursType === 'EXTRA') {

                let msg, labelClass;

                if (data[index].overtacceptance == 0) {

                    msg = 'Czeka na akceptację';
                    labelClass = 'waiting';

                }
                if (data[index].overtacceptance == 1) {

                    msg = 'Zaakceptowane';
                    labelClass = 'positive';
                }

                data[index].label = {
                    dataField: 'type',  //kolumna dla której ma być wyświetlany label
                    msg: msg,
                    class: labelClass
                }
            }

        }

        return data;


    }

    render() {

        if (this.props.data) {

            return (
                <Container className="hours">
                    <HoursListComponent
                        data={this.addProperties(this.props.data)}
                        onTableChange={this.onTableChange}
                        userList={generateUserListForDropdown(this.props.inferiors, this.props.user)}
                        loggedUser={this.props.user}
                        onFilterSubmit={this.onFilterSubmit}
                        dateFrom={this.state.dateFrom}
                        dateTo={this.state.dateTo}
                        deleteDisabled={this.state.deleteDisabled}
                    />
                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    data: state.hour.records,
    user: state.loggedUser,
    inferiors: state.loggedUser.inferiors
})

const mapDispatchToProps = dispatch => ({
    fetchHourRecords: (userid, filters) => dispatch(fetchHourRecords(userid, filters)),
    fetchInferiors: (managerid) => dispatch(fetchInferiors(managerid)),
    removeRecord: (id) => dispatch(removeRecord(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursListContainer);



