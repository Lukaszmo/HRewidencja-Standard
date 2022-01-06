import React, { Component } from "react";

import { Container, Button, GridRow, Icon } from 'semantic-ui-react';
import history from '../../../history';
import './HomeComponent.css';
import '../../../index.css';

import { checkMenuAccess } from "../../utils/AuthService";


class HomeComponent extends Component {

    handleButtonClick = (e, data) => {

        const buttonName = data.name.toUpperCase();

        if (buttonName === 'TIMESHEET') { history.push('/czas-pracy/rejestracja'); }
        if (buttonName === 'VACATION') { history.push('/urlopy/dodaj-wniosek'); }
        if (buttonName === 'TASK_TABLE') { history.push("/tablica-zadan/kanban"); }
        if (buttonName === 'REPORTS') { history.push('/raporty/raport-miesieczny'); }

    }

    render() {

        let timesheetBtn = null;
        let vacationBtn = null;
        let tasksBtn = null;
        let reportsBtn = null;

        if (checkMenuAccess('TIMESHEET') === true) {

            timesheetBtn = <Button
                className="bigBoxButton"
                name="timesheet"
                onClick={(e, data) => this.handleButtonClick(e, data)}>
                <Icon name='clock' className='button-icon'></Icon>
                <p>CZAS PRACY</p>
            </Button>
        }

        if (checkMenuAccess('VACATION') === true) {

            tasksBtn = <Button
                className="bigBoxButton"
                name="vacation"
                onClick={(e, data) => this.handleButtonClick(e, data)}>
                <Icon name='travel' className='button-icon'></Icon>
                <p>URLOPY</p>
            </Button>
        }

        if (checkMenuAccess('TASK_TABLE') === true) {

            vacationBtn = <Button
                className="bigBoxButton"
                name="task_table"
                onClick={(e, data) => this.handleButtonClick(e, data)}>
                <Icon name='table' className='button-icon'></Icon>
                <p>TABLICA</p>
            </Button>
        }

        if (checkMenuAccess('REPORTS') === true) {

            reportsBtn = <Button
                className="bigBoxButton"
                name='reports'
                onClick={(e, data) => this.handleButtonClick(e, data)}>
                <Icon name='chart bar' className='button-icon'></Icon>
                <p>RAPORTY</p>
            </Button>
        }

        return (

            <Container className="mainPageContainer">

                <GridRow></GridRow>

                <GridRow>

                    {timesheetBtn}

                    {vacationBtn}

                    {tasksBtn}

                    {reportsBtn}

                </GridRow>


            </Container>
        )
    }
}
// <Content content={this.props.content} /> content przekazywany w App.js*
export default HomeComponent;