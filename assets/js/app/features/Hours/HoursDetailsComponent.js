import React, { Component, Fragment } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Dropdown, Grid, Input, Form, GridRow, Label, TextArea, Divider, Confirm, Icon } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './HoursComponent.css';
import Media from 'react-media';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { timeToNumber } from '../../utils/Utils';


class HoursDetailsComponent extends Component {

    state = {
        open: false
    }

    onSubmit(values) {

        // Typy godzin
        // 1 - Regularne godziny pracy
        // 2 - Nadgodziny
        // 3 - Nieobecność

        const mode = this.props.mode;
        const oldType = this.props.recordDetails.type.id; //typ rekordu który zmieniamy
        const newType = values.type;
        const oldOvertacceptance = this.props.recordDetails.overtacceptance;
        let newOvertacceptance = null;
        let acceptorid = null;
        let msg = null;

        if (mode === 'EDIT') {

            msg = 'Rekord został zmodyfikowany';
            if (newType == 2) { newOvertacceptance = 0; }
            if ((oldType == 2) && (oldType !== newType)) {   //jeśli użytkownik zmienia z nadgodzin na inny typ

                newOvertacceptance = null;
                acceptorid = null;
            }
        }

        if (mode === 'ACCEPTANCE') {

            newOvertacceptance = 1;
            acceptorid = this.props.acceptorid;
            msg = 'Nadgodziny zostały zaakceptowane';
        }

        values = {
            ...values,
            overtacceptance: newOvertacceptance,
            acceptorid: acceptorid,
            quantity: timeToNumber(values.time.format('HH:mm')),
            time: values.time.format('HH:mm')
        };

        const recordId = this.props.recordDetails.id;

        //wyświetl modal potwierdzenia jeśli anulowanie akceptacji nadgodzin
        if ((mode === 'ACCEPTANCE') && (oldOvertacceptance === 1)) {
            this.setState({ open: true });
        }
        else
            this.props.onEditFormSubmit(recordId, values, msg);
    }

    handleCancel = () => {

        this.setState({ open: false });
    }

    //potwierdzenie anulowania akceptacji nadgodzin
    handleConfirm = () => {

        const values = { overtacceptance: 0, acceptorid: null };
        const msg = 'Akceptacja została anulowana';

        this.setState({ open: false });
        this.props.onEditFormSubmit(this.props.recordDetails.id, values, msg);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        if (data.name === 'project') {

            this.props.onProjectDropdownChange(data.value);
        }

        setFieldValue(data.name, data.value);
    }

    handleTimeInputChange(data, setFieldValue) {

        setFieldValue('time', data);
    };

    render() {
        console.log(this.state);
        const clockIcon = <Icon name='clock' className='clock-icon' disabled={this.props.disabled}></Icon>

        const type = this.props.recordDetails.type.id;
        const comment = this.props.recordDetails.comment;
        const date = this.props.recordDetails.date.substr(0, 10);  //extract only date from datetime
        const project = this.props.recordDetails.project.id;
        const task = this.props.recordDetails.task.id;
        const timestamp = this.props.recordDetails.timestamp;
        const timestampDate = timestamp.substr(0, 10);
        const timestampTime = timestamp.substr(11, 8);
        const overtAcceptance = this.props.recordDetails.overtacceptance;
        const employeeName = this.props.recordDetails.userid.firstname + ' ' + this.props.recordDetails.userid.lastname;

        let status = null;
        let acceptor = null;
        let buttonClass = 'saveButton'
        let buttonDisabled = this.props.disabled;
        let text = 'Zapisz';

        //Nadgodziny 
        if (type == 2) {

            let labelClass = overtAcceptance === 1 ? 'positive' : 'waiting';
            let msg = overtAcceptance === 1 ? 'Zaakceptowane' : 'Czeka na akceptację';
            let mode = this.props.mode;

            //ustawiamy to co widzi kierownik akceptujący nadgodziny
            if (mode === 'ACCEPTANCE') {

                text = (overtAcceptance === 0) ? 'Zaakceptuj' : 'Anuluj akceptację';
                buttonClass = (overtAcceptance === 0) ? 'saveButton' : 'cancelButton';
                buttonDisabled = false;
            }

            //Status nadgodzin
            let label = <Label className={labelClass} id="waiting-left">{msg}</Label>
            status = <Grid.Row>
                <Grid.Column width={2}>
                    Status</Grid.Column >
                <Grid.Column width={2}>
                    {label}
                </Grid.Column>
            </Grid.Row>

            //Zaakceptowane 
            if (overtAcceptance === 1) {

                const acceptorName = this.props.acceptor ? this.props.acceptor.firstname + ' ' + this.props.acceptor.lastname : null;
                const acceptorRegnum = this.props.acceptor ? this.props.acceptor.regnum : null;

                acceptor = <Grid.Row>
                    <Grid.Column width={2}>
                        Akceptujący</Grid.Column >
                    <Grid.Column width={2}>
                        <p className='data-field'> {acceptorName} &nbsp;&nbsp; [ {acceptorRegnum} ] </p>
                    </Grid.Column>
                </Grid.Row>
            }
        }

        let button = <Button disabled={buttonDisabled}
            type='submit'
            className={buttonClass}>
            {text}
        </Button>


        return (
            <Segment color="teal" >
                <Header size='medium'>Edycja godzin</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ date: date, type: type, comment: comment, project: project, task: task, time: moment(this.props.recordDetails.time, 'HH:mm') }}

                    validationSchema={this.props.validationSchema}

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
                                            {/*laptop*/}
                                            {matches.large &&
                                                <Grid columns={2} textAlign="right" verticalAlign="middle" >
                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            Użytkownik</Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <p className='data-field'> {employeeName} </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            Rodzaj
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection disabled={this.props.disabled}
                                                                name='type'
                                                                className='dropdown-hour-types'
                                                                value={values.type}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.types} />
                                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                                        </Grid.Column>

                                                        <Grid.Column width={2}>
                                                            Projekt
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection disabled={this.props.disabled}
                                                                name='project'
                                                                className='dropdown-hour-project'
                                                                value={values.project}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.projects} />
                                                            {errors.project && touched.project ? <div><CustomLabel text={errors.project}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            Data
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Input disabled={this.props.disabled}
                                                                type='date'
                                                                name='date'
                                                                className='input-date'
                                                                value={values.date}
                                                                onChange={handleChange} />
                                                            {errors.date && touched.date ? <div><CustomLabel text={errors.date}></CustomLabel></div> : null}
                                                        </Grid.Column>

                                                        <Grid.Column width={2}>
                                                            Zadanie
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection disabled={this.props.disabled}
                                                                name='task'
                                                                className='dropdown-hour-task'
                                                                value={values.task}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.tasks} />
                                                            {errors.task && touched.task ? <div><CustomLabel text={errors.task}></CustomLabel></div> : null}
                                                        </Grid.Column>

                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            Ilość godzin
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <TimePicker disabled={this.props.disabled}
                                                                className='hours-quantity'
                                                                name='time'
                                                                value={values.time}
                                                                onChange={(data) => this.handleTimeInputChange(data, setFieldValue)}
                                                                showSecond={false}
                                                                minuteStep={15}
                                                                inputIcon={clockIcon}
                                                            />
                                                            {errors.time && touched.time ? <div><CustomLabel text={errors.time}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            Komentarz
                                                        </Grid.Column >
                                                        <Grid.Column width={3}>
                                                            <TextArea disabled={this.props.disabled}
                                                                name='comment'
                                                                className='hours-comment'
                                                                value={values.comment}
                                                                onChange={handleChange} />
                                                            {errors.comment && touched.comment ? <div><CustomLabel text={errors.comment}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    {status}
                                                    {acceptor}

                                                    <Grid.Row>
                                                        <Grid.Column width={2}>
                                                            <p className='data-field-header'>Ostatnia modyfikacja</p>
                                                        </Grid.Column >
                                                        <Grid.Column width={4}>
                                                            <p className='data-field'>{timestampDate} &nbsp;&nbsp; [ {timestampTime} ]</p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            }

                                            {/*urządzenia mobline lub tablet*/}
                                            {(matches.small || matches.medium) &&
                                                <Grid textAlign="left" verticalAlign="middle" >
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            Użytkownik
                                                        </Grid.Column>

                                                        <Grid.Column>
                                                            <p className='data-field'> {employeeName} </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            Rodzaj
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Dropdown fluid selection disabled={this.props.disabled}
                                                                name='type'
                                                                className='dropdown-hour-types'
                                                                value={values.type}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.types} />
                                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            Data
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Input disabled={this.props.disabled}
                                                                type='date'
                                                                name='date'
                                                                className='input-date'
                                                                value={values.date}
                                                                onChange={handleChange} />
                                                            {errors.date && touched.date ? <div><CustomLabel text={errors.date}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column >
                                                            Projekt
                                                        </Grid.Column >
                                                        <Grid.Column >
                                                            <Dropdown fluid selection disabled={this.props.disabled}
                                                                name='project'
                                                                className='dropdown-hour-project'
                                                                value={values.project}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.projects} />
                                                            {errors.project && touched.project ? <div><CustomLabel text={errors.project}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            Zadanie
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Dropdown fluid selection disabled={this.props.disabled}
                                                                name='task'
                                                                className='dropdown-hour-task'
                                                                value={values.task}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.tasks} />
                                                            {errors.task && touched.task ? <div><CustomLabel text={errors.task}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            Ilość godzin
                                                        </Grid.Column >
                                                        <Grid.Column>
                                                            <TimePicker disabled={this.props.disabled}
                                                                className='hours-quantity'
                                                                name='time'
                                                                value={values.time}
                                                                onChange={(data) => this.handleTimeInputChange(data, setFieldValue)}
                                                                showSecond={false}
                                                                minuteStep={15}
                                                                inputIcon={clockIcon}
                                                            />
                                                            {errors.time && touched.time ? <div><CustomLabel text={errors.time}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            Komentarz
                                                        </Grid.Column >
                                                        <Grid.Column>
                                                            <TextArea disabled={this.props.disabled}
                                                                name='comment'
                                                                className='hours-comment'
                                                                value={values.comment}
                                                                onChange={handleChange} />
                                                            {errors.comment && touched.comment ? <div><CustomLabel text={errors.comment}></CustomLabel></div> : null}
                                                        </Grid.Column>
                                                    </Grid.Row>

                                                    {status}
                                                    {acceptor}

                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <p className='data-field-header'>Ostatnia modyfikacja</p>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <p className='data-field'>{timestampDate} &nbsp;&nbsp; [ {timestampTime} ]</p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            }
                                        </Fragment>
                                    )}
                                </Media>

                                <div className='button-row'>{button}</div>
                                <Confirm
                                    className="del-confirm"
                                    header="Anulowanie akceptacji"
                                    content="Czy na pewno chcesz anulować akceptację nadgodzin?"
                                    open={this.state.open}
                                    onCancel={this.handleCancel}
                                    onConfirm={this.handleConfirm}
                                    cancelButton='Nie'
                                    confirmButton='Tak'
                                />
                            </Form>
                        )}
                </Formik>
            </Segment>

        )
    }
}

export default HoursDetailsComponent;
