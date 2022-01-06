import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Form, Grid, Input, Button, Dropdown } from 'semantic-ui-react';
import { Formik } from 'formik';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';



class UserCreateComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

        let regnum = parseInt(values.regnum);
        let managerid = values.manager;
        let roles = [];
        roles.push(values.roles);
        values = { ...values, regnum: regnum, roles: roles, managerid: managerid, active: true };

        this.props.onSubmit(values);
    }

    render() {
        console.log(this.props);


        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Nowy użytkownik</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ username: '', password: '', firstname: '', lastname: '', regnum: '', email: '', roles: '' }}

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

                                <Grid columns={5} textAlign="right" verticalAlign="middle" >

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
                                            <p className='data-field-header'>Hasło</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type="password"
                                                name='password'
                                                value={values.password}
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            />
                                            {errors.password && touched.password ? <div><CustomLabel text={errors.password}></CustomLabel></div> : null}
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

                                </Grid>
                                <div className='button-row'>
                                    <Button
                                        type='submit'
                                        className='saveButton'
                                        color='teal'>
                                        {/*onClick={this.props.onButtonClick}>*/}
                                    Dodaj Użytkownika
                                </Button>
                                </div>
                            </Form >
                        )
                    }
                </Formik>

            </Segment >


        )
    }
}

export default UserCreateComponent;