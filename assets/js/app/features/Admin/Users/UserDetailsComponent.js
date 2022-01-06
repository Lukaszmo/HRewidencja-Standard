import React, { Component, Fragment } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Dropdown, Grid, Input, Form, Checkbox, Label, TextArea, Divider, Confirm, Icon } from 'semantic-ui-react';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';
import './User.css';


class UserDetailsComponent extends Component {

    state = {

    }

    onSubmit(values) {

        let roles = [];
        roles.push(values.roles);

        values = {
            ...values,
            id: this.props.record.id,
            regnum: parseInt(values.regnum),
            managerid: values.manager,
            roles: roles
        }

        this.props.onSubmit(values);

    }

    handleChange(e, data, setFieldValue) {

        if (data.name === 'active') {
            setFieldValue(data.name, data.checked);
        }
        else {
            setFieldValue(data.name, data.value);
        }
    }


    render() {

        console.log(this.props);



        return (
            <Segment color="teal" >
                <Header size='medium'>Edycja użytkownika</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{
                        id: this.props.record.id,
                        username: this.props.record.username,
                        firstname: this.props.record.firstname,
                        lastname: this.props.record.lastname,
                        regnum: this.props.record.regnum,
                        email: this.props.record.email,
                        position: this.props.record.position,
                        manager: this.props.record.managerid,
                        roles: this.props.record.roles[0],
                        active: this.props.record.active === 1 ? true : false
                    }}

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

                            <Grid columns={2} textAlign="right" verticalAlign="middle" >

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Id użytkownika</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input disabled
                                            type="text"
                                            name='id'
                                            value={values.id} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Nazwa Użytkownika</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="text"
                                            name='username'
                                            value={values.username}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.username && touched.username ? <div><CustomLabel text={errors.username}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Imię</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="text"
                                            name='firstname'
                                            value={values.firstname}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.firstname && touched.firstname ? <div><CustomLabel text={errors.firstname}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Nazwisko</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="text"
                                            name='lastname'
                                            value={values.lastname}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.lastname && touched.lastname ? <div><CustomLabel text={errors.lastname}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Numer ewidencyjny</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="number"
                                            name='regnum'
                                            value={values.regnum}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                        />
                                        {errors.regnum && touched.regnum ? <div><CustomLabel text={errors.regnum}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Email</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="email"
                                            name='email'
                                            value={values.email}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.email && touched.email ? <div><CustomLabel text={errors.email}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Stanowisko</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="text"
                                            name='position'
                                            value={values.position}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.position && touched.position ? <div><CustomLabel text={errors.position}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Przełożony</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Dropdown fluid selection
                                            name='manager'
                                            className=''
                                            placeholder="Wybierz.."
                                            value={values.manager}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            options={this.props.users} />
                                        {errors.manager && touched.manager ? <div><CustomLabel text={errors.manager}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Rola użytkownika</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Dropdown fluid selection
                                            name='roles'
                                            className=''
                                            placeholder="Wybierz.."
                                            value={values.roles}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            options={this.props.roles} />
                                        {errors.roles && touched.roles ? <div><CustomLabel text={errors.roles}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Aktywny</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Checkbox
                                            name='active'
                                            className='checkbox-active'
                                            checked={values.active}
                                            onClick={(e, data) => this.handleChange(e, data, setFieldValue)}
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                            <div className='button-row'>
                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    Zapisz
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Segment>

        )
    }
}

export default UserDetailsComponent;
