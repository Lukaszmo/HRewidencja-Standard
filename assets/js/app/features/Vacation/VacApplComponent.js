import React, { Component, Fragment } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea, Label, Divider } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './Vacation.css';
import Media from 'react-media';

class VacApplComponent extends Component {

    constructor(props) {
        super(props);

        this.defaultDate = new Date().toISOString().slice(0, 10);
        this.input = React.createRef();

        this.state = {
            datefrom: this.defaultDate,
            dateto: this.defaultDate,
            quantity: 1,
        }
    }

    onSubmit(values) {

        let quantity = this.input.current.props.value
        values = { ...values, quantity: quantity };

        console.log(values);
        this.props.onSubmit(values);
    }

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    dateHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);

        let datefrom = '';
        let dateto = '';

        if (data.name === 'datefrom') {
            this.setState({ datefrom: data.value });
            datefrom = data.value;
            dateto = this.state.dateto;
        }

        if (data.name === 'dateto') {
            this.setState({ dateto: data.value });
            datefrom = this.state.datefrom;
            dateto = data.value;
        }

        this.setState({ quantity: this.calculateWorkingDays(datefrom, dateto) });
    }

    calculateWorkingDays(datefrom, dateto) {

        //TODO exclude holidays

        if ((datefrom === '') || (dateto === '')) return 0;

        let curDate = new Date(datefrom);
        let endDate = new Date(dateto);
        let count = 0;

        while (curDate <= endDate) {
            let dayOfWeek = curDate.getDay();
            if (!((dayOfWeek === 6) || (dayOfWeek === 0)))
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }

        return count;
    }

    render() {

        return (
            <div>
                <Segment color="teal" className='vacation-new-request'>
                    <Header size='medium'>Nowy wniosek</Header>
                    <Divider></Divider>
                    <Formik
                        initialValues={{ type: 1, datefrom: this.defaultDate, dateto: this.defaultDate, quantity: '', comment: '' }}

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

                                                {(matches.large) &&
                                                    <Grid columns={10} textAlign="right" verticalAlign="middle" >
                                                        <Grid.Row>
                                                            <Grid.Column width={3}>
                                                                <p className='data-field-header'>Imię i nazwisko</p>
                                                            </Grid.Column >
                                                            <Grid.Column width={7}>
                                                                <p className='data-field'>{this.props.user.firstname} {this.props.user.lastname}</p>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={3}>
                                                                <p className='data-field-header'>Stanowisko/Dział</p>
                                                            </Grid.Column >
                                                            <Grid.Column width={7}>
                                                                <p className='data-field'>{this.props.user.position}</p>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={3}>
                                                                <p className='data-field-header'>Rodzaj wniosku</p>
                                                            </Grid.Column >
                                                            <Grid.Column width={7}>
                                                                <Dropdown fluid selection
                                                                    name='type'
                                                                    className='dropdown-vacation-types'
                                                                    placeholder="Wybierz.."
                                                                    value={values.type}
                                                                    onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                                                    options={this.props.types} />
                                                                {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={3}>
                                                                <p className='data-field-header'>Zakres urlopu:</p>
                                                            </Grid.Column >
                                                            <Grid.Column width={4}>
                                                                <Input
                                                                    type='date'
                                                                    name='datefrom'
                                                                    value={values.datefrom}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)} />
                                                                {errors.datefrom && touched.datefrom ? <div><CustomLabel text={errors.datefrom}></CustomLabel></div> : null}
                                                            </Grid.Column>

                                                            <Grid.Column width={3}>
                                                                <Input
                                                                    type='date'
                                                                    name='dateto'
                                                                    value={values.dateto}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)} />
                                                                {errors.dateto && touched.dateto ? <div><CustomLabel text={errors.dadateto}></CustomLabel></div> : null}
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={3}>
                                                                <p className='data-field-header'>Liczba dni urlopu</p>
                                                            </Grid.Column >
                                                            <Grid.Column width={2}>
                                                                <Input disabled
                                                                    type='number'
                                                                    name='quantity'
                                                                    value={this.state.quantity}
                                                                    ref={this.input} />
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={3}>
                                                                <p className='data-field-header'>Komentarz</p>
                                                            </Grid.Column >
                                                            <Grid.Column width={4}>
                                                                <TextArea
                                                                    name='comment'
                                                                    value={values.comment}
                                                                    onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                    </Grid>}

                                                {(matches.small || matches.medium) &&
                                                    <Grid verticalAlign="middle" >
                                                        <Grid.Row>
                                                            <Grid.Column width={5}>
                                                                <p className='data-field-header'>Imię i nazwisko</p>
                                                            </Grid.Column>
                                                            <Grid.Column width={5}>
                                                                <p className='data-field'>{this.props.user.firstname} {this.props.user.lastname}</p>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={5}>
                                                                <p className='data-field-header'>Stanowisko/Dział</p>
                                                            </Grid.Column>
                                                            <Grid.Column width={5}>
                                                                <p className='data-field'>{this.props.user.position}</p>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column >
                                                                <p className='data-field-header'>Rodzaj wniosku</p>
                                                            </Grid.Column >
                                                            <Grid.Column >
                                                                <Dropdown fluid selection
                                                                    name='type'
                                                                    className='dropdown-vacation-types'
                                                                    placeholder="Wybierz.."
                                                                    value={values.type}
                                                                    onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                                                    options={this.props.types} />
                                                                {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column >
                                                                <p className='data-field-header'>Zakres urlopu:</p>
                                                            </Grid.Column >

                                                            <Grid.Column >
                                                                <Input
                                                                    type='date'
                                                                    name='datefrom'
                                                                    className='input-date'
                                                                    value={values.datefrom}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)} />
                                                                {errors.datefrom && touched.datefrom ? <div><CustomLabel text={errors.datefrom}></CustomLabel></div> : null}
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row>
                                                            <Grid.Column >
                                                                <Input
                                                                    type='date'
                                                                    name='dateto'
                                                                    className='input-date'
                                                                    value={values.dateto}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)} />
                                                                {errors.dateto && touched.dateto ? <div><CustomLabel text={errors.dadateto}></CustomLabel></div> : null}
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column width={5}>
                                                                <p className='data-field-header'>Liczba dni urlopu</p>
                                                            </Grid.Column>
                                                            <Grid.Column width={3}>
                                                                <Input disabled
                                                                    type='number'
                                                                    name='quantity'
                                                                    className='vacation-quantity'
                                                                    value={this.state.quantity}
                                                                    ref={this.input} />
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row>
                                                            <Grid.Column >
                                                                <p className='data-field-header'>Komentarz</p>
                                                            </Grid.Column >
                                                            <Grid.Column >
                                                                <TextArea
                                                                    name='comment'
                                                                    className='vacation-comment'
                                                                    value={values.comment}
                                                                    onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                    </Grid>}

                                                <div className='button-row'>
                                                    <Button
                                                        type='submit'
                                                        className='saveButton'
                                                        color='teal'>
                                                        {/*onClick={this.props.onButtonClick}>*/}
                                                        Utwórz wniosek
                                                    </Button>
                                                </div>
                                            </Fragment>
                                        )}
                                    </Media>
                                </Form>
                            )}
                    </Formik>
                </Segment >
                <Media query="(min-width: 1200px)" render={() =>
                    (
                        <div>
                            <Segment color='teal' className='vacation-days-left'>
                                <p>Dni urlopu do wykorzystania:</p>
                                <Divider></Divider>
                                <p className='days-left'></p>
                            </Segment>
                            <Segment className='vacation-days-left'>
                                <p>Nieobecni w dniu dzisiejszym:</p>
                                <Divider></Divider>
                            </Segment>
                        </div>
                    )} />

            </div >

        )
    }
}

export default VacApplComponent;