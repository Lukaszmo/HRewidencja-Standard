import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Form, Grid, Input, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';




class ClientCreateComponent extends Component {

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
                <Header size='medium'>Nowy klient</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ code: '', description: '' }}

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
                                        <p className='data-field-header'>Kod klienta</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="text"
                                            name='code'
                                            value={values.code}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.code && touched.code ? <div><CustomLabel text={errors.code}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Nazwa klienta</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Input
                                            type="text"
                                            name='description'
                                            value={values.description}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                        {errors.description && touched.description ? <div><CustomLabel text={errors.description}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>



                            </Grid>
                            <div className='button-row'>
                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    {/*onClick={this.props.onButtonClick}>*/}
                                    Dodaj Klienta
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

export default ClientCreateComponent;