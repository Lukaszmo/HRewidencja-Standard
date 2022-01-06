import React, { Component } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Form, Grid, Input, Button, Dropdown } from 'semantic-ui-react';
import { Formik } from 'formik';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';
//import './Project.css';


class TaskCreateComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

        values = { ...values, active: true };

        this.props.onSubmit(values);
    }

    type = [
        {
            'key': 1,
            'text': 'DEV',
            'value': 1
        },
        {
            'key': 2,
            'text': 'TESTY',
            'value': 2
        },
        {
            'key': 3,
            'text': 'ANALIZA',
            'value': 3
        },
    ]

    render() {

        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Nowe zadanie</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ code: '', description: '', type: '' }}

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
                                        <p className='data-field-header'>Kod zadania</p>
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
                                        <p className='data-field-header'>Nazwa zadania</p>
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

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Typ zadania</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Dropdown fluid selection
                                            name='type'
                                            className=''
                                            placeholder="Wybierz.."
                                            value={values.type}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            options={this.props.taskTypes} />
                                        {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>



                            </Grid>
                            <div className='button-row'>
                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    {/*onClick={this.props.onButtonClick}>*/}
                                    Dodaj Zadanie
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

export default TaskCreateComponent;