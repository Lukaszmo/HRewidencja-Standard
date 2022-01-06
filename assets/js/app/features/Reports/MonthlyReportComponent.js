import React, { Component, Fragment } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Form, Grid, GridRow, Dropdown, Button, Table, Icon } from 'semantic-ui-react';

import './Reports.css';
import Media from 'react-media';
import { numberToTime, pad } from '../../utils/Utils';
import { getDayOfWeek } from './ReportsUtility';


class MonthlyReportComponent extends Component {

    constructor(props) {
        super(props);

        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
    }

    onSubmit(values) {

        this.props.onSubmit(values);

        this.setState({
            year: values.year,
            month: values.month.pad(2)
        })
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    handlePrintIconClick = (type) => {

        this.props.onPrintIconClick(type);

    }

    render() {
        console.log(this.props);


        const showReport = this.props.showReport;
        let printBar = null;
        let report = null;

        if (showReport && this.props.reportHours) {

            const employeeFullName = this.props.user.firstname + ' ' + this.props.user.lastname;

            let dayOfWeek = getDayOfWeek(this.state.year, this.state.month);

            const days = []
            for (var i = 1; i <= 31; i++) {
                let className = 'cell';
                if (((dayOfWeek[i] === 6) || (dayOfWeek[i] === 0))) { className = 'cell-day-off'; }
                days.push(<Table.Cell className={className} textAlign='center' verticalAlign='middle' key={i}>{i}</Table.Cell>)
            }

            const regularHours = []
            for (var i = 1; i <= 31; i++) {
                let val = '8:00' // docelowo pobierane z contracts
                let className = 'cell';
                if (((dayOfWeek[i] === 6) || (dayOfWeek[i] === 0))) { val = null; className = 'cell-day-off' }
                regularHours.push(<Table.Cell className={className} verticalAlign='middle' key={i}>{val}</Table.Cell>)
            }

            const hours = []
            for (var i = 1; i <= 31; i++) {
                let date = this.state.year + '-' + this.state.month + '-' + i.pad(2);
                const h = this.props.reportHours[date] ? numberToTime(this.props.reportHours[date].summary) : null;
                let className = null;
                if (((dayOfWeek[i] === 6) || (dayOfWeek[i] === 0))) { className = 'cell-day-off'; }
                hours.push(<Table.Cell className={className} textAlign='center' verticalAlign='middle' key={i}>{h}</Table.Cell>)
            }

            const mock = []
            for (var i = 1; i <= 31; i++) {
                let className = null;
                if (((dayOfWeek[i] === 6) || (dayOfWeek[i] === 0))) { className = 'cell-day-off' }
                mock.push(<Table.Cell className={className} key={i}></Table.Cell>)
            }

            printBar = <Segment className='printbar'>
                <div className='print-icon'
                    id='pdf-icon'
                    title='generuj PDF'
                    onClick={() => this.handlePrintIconClick('PDF')}>
                    <Icon name='file pdf' bordered></Icon>
                </div>
                <div className='print-icon'
                    id='excel-icon'
                    title='generuj plik CSV'
                    onClick={() => this.handlePrintIconClick('CSV')}>
                    <Icon name='file excel' bordered></Icon>
                </div>
            </Segment>

            report = <Table celled fixed striped unstackable className='monthly-report' id='monthly-report'>
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell textAlign='center' colSpan={36}>RAPORT MIESIĘCZNY</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell colSpan={5} >Normatywny czas pracy:</Table.Cell>
                        <Table.Cell colSpan={5}></Table.Cell>
                        <Table.Cell colSpan={5} >Wymiar etatu:</Table.Cell>
                        <Table.Cell colSpan={21}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={5} >Nazwisko i imię:</Table.Cell>
                        <Table.Cell colSpan={5}>{employeeFullName}</Table.Cell>
                        <Table.Cell colSpan={5} >Stanowisko:</Table.Cell>
                        <Table.Cell colSpan={21}>{this.props.user.position}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={5} >Numer ewidencyjny:</Table.Cell>
                        <Table.Cell colSpan={5}>{this.props.user.regnum}</Table.Cell>
                        <Table.Cell colSpan={5} >Dział:</Table.Cell>
                        <Table.Cell colSpan={21}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Dzień</Table.Cell>
                        {days}
                        <Table.Cell colSpan={2} textAlign='center'>Suma</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Norm. czas pracy</Table.Cell>
                        {regularHours}
                        <Table.Cell colSpan={2}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Godz. przeprac.</Table.Cell>
                        {hours}
                        <Table.Cell colSpan={2}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Praca autorska:</Table.Cell>
                        {mock}
                        <Table.Cell colSpan={2}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Praca inna:</Table.Cell>
                        {mock}
                        <Table.Cell colSpan={2}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Nieobecności rodzaj:</Table.Cell>
                        {mock}
                        <Table.Cell colSpan={2}></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colSpan={3}>godz:</Table.Cell>
                        {mock}
                        <Table.Cell colSpan={2}></Table.Cell>
                    </Table.Row>

                    <Table.Row>

                    </Table.Row>
                </Table.Body>
            </Table>;
        }

        return (
            <div>
                <Segment color="teal" className='report-segment' >
                    <Header size='medium'>Raport miesięczny</Header>
                    <Divider></Divider>
                    <Header className='filter-header'>Filtry</Header>

                    <Formik
                        initialValues={{ year: this.currentYear, month: this.currentMonth, user: this.props.loggedUser.id }}

                        onSubmit={(values, { setSubmitting }) => {
                            this.onSubmit(values);
                            setSubmitting(false);
                        }}>

                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            errors,
                            touched
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Media queries={{
                                    small: "(max-width: 599px)",                            //mobile 
                                    medium: "(min-width: 600px) and (max-width: 1199px)",   //tablet
                                    large: "(min-width: 1200px)"                            //laptop
                                }}>
                                    {matches => (

                                        <Fragment>
                                            {(matches.large) &&
                                                <Grid columns={2} textAlign="right" verticalAlign="middle" >
                                                    <GridRow>
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='year'
                                                                className='dropdown-year'
                                                                value={values.year}
                                                                options={this.props.years}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='month'
                                                                className='dropdown-month'
                                                                value={values.month}
                                                                options={this.props.months}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='user'
                                                                className='dropdown-userlist'
                                                                value={values.user}
                                                                options={this.props.userList}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>

                                                        <Grid.Column width={2}>
                                                            <Button
                                                                type='submit'
                                                                className='filterButton'>Generuj Raport
                                                            </Button>
                                                        </Grid.Column>
                                                    </GridRow>
                                                </Grid >}

                                            {(matches.small || matches.medium) &&
                                                <Grid columns={2} textAlign="center" verticalAlign="middle" >
                                                    <GridRow>
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='year'
                                                                className='dropdown-year'
                                                                value={values.year}
                                                                options={this.props.years}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>
                                                    </GridRow>
                                                    <GridRow>
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='month'
                                                                className='dropdown-month'
                                                                value={values.month}
                                                                options={this.props.months}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>
                                                    </GridRow>
                                                    <GridRow>
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='user'
                                                                className='dropdown-userlist'
                                                                value={values.user}
                                                                options={this.props.userList}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>
                                                    </GridRow>
                                                    <Button
                                                        type='submit'
                                                        className='filterButton'>Generuj Raport
                                                    </Button>
                                                </Grid >}
                                        </Fragment>
                                    )}
                                </Media>
                            </Form >
                        )
                        }
                    </Formik>
                </Segment >
                <div className='report-table'>
                    {printBar}
                    {report}
                </div>

            </div >

        )
    }
}

export default MonthlyReportComponent;