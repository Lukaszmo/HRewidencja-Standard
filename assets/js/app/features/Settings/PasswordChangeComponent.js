import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Form, Grid, Input, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import CustomLabel from '../../common/CustomLabel/CustomLabel';




class PasswordChangeComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

        this.props.onSubmit(values);
    }

    render() {
        console.log(this.props);


        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Zmiana hasła</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ password: '', newpassword: '', newpassrepeat: '' }}

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
                                        <p className='data-field-header'>Stare hasło</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="password"
                                            name='password'
                                            value={values.password}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.password && touched.password ? <div><CustomLabel text={errors.password}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Podaj nowe hasło</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="password"
                                            name='newpassword'
                                            value={values.newpassword}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.newpassword && touched.newpassword ? <div><CustomLabel text={errors.newpassword}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Powtórz nowe hasło</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="password"
                                            name='newpassrepeat'
                                            value={values.newpassrepeat}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.newpassrepeat && touched.newpassrepeat ? <div><CustomLabel text={errors.newpassrepeat}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>



                            </Grid>
                            <div className='button-row'>
                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    {/*onClick={this.props.onButtonClick}>*/}
                                    Zmień hasło
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

export default PasswordChangeComponent;