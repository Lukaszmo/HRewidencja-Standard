import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import MonthlyReportComponent from './MonthlyReportComponent';
import { getHoursRange, getHoursForMonthlyreport } from '../Hours/Hours';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import { getMonths } from '../Reports/ReportsUtility';
import { fetchInferiors, generateUserListForDropdown } from "../User/User";
import { getUserDetails } from "../User/User";
import { checkItemAccess } from '../../utils/AuthService';
import { generatePDF } from '../Reports/Reports';


class MonthlyReportContainer extends Component {

    state = {
        years: null,
        user: null,
        showReport: false
    }

    componentDidMount() {

        checkItemAccess("REPORTS")
            .then(() => this.props.fetchInferiors(this.props.user.id))
            .then(() => getHoursRange().then(resp => this.setState({ years: this.setOptionsForDropdown(resp.data.first, resp.data.last) })));

    }

    setOptionsForDropdown(startYear, lastYear) {

        lastYear = parseInt(lastYear);
        let year = parseInt(startYear);
        let options = [];
        let i = 0;

        while (year <= lastYear) {

            options[i] = { key: i, text: year, value: year };
            i += 1;
            year += 1;
        }

        return options;

    }

    onSubmit = (values) => {

        const year = values.year.toString();
        const month = values.month.toString();
        const date = new Date(year + '-' + month + '-' + '01');

        let filters = {
            datefrom: getFirstDayOfMonth(date),
            dateto: getLastDayOfMonth(date)
        }

        getHoursForMonthlyreport(values.user, filters).then(resp => this.setState({ reportHours: resp.data }));
        getUserDetails(values.user).then(resp => this.setState({
            showReport: true,
            user: resp.data
        }));
    }

    onPrintIconClick = (type) => {

        if (type === 'PDF') {
            generatePDF();
        }

        if (type === 'CSV') {
            // generateCSV();
        }
    }


    render() {

        console.log(this.props);

        return (
            <Container className='reports'>
                <MonthlyReportComponent
                    years={this.state.years}
                    months={getMonths()}
                    userList={generateUserListForDropdown(this.props.inferiors, this.props.user)}
                    loggedUser={this.props.user}
                    onSubmit={this.onSubmit}
                    user={this.state.user}
                    showReport={this.state.showReport}
                    reportHours={this.state.reportHours}
                    onPrintIconClick={this.onPrintIconClick}
                >

                </MonthlyReportComponent>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    user: state.loggedUser,
    inferiors: state.loggedUser.inferiors
})

const mapDispatchToProps = dispatch => ({
    // zastanowić się czy nie przenieść wywołania fetchInferiors po zalogowaniu do aplikacji
    fetchInferiors: (managerid) => dispatch(fetchInferiors(managerid))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthlyReportContainer);



