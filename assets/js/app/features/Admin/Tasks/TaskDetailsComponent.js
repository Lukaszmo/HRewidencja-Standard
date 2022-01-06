import React, { Component } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Grid, Input, Form, Divider, Dropdown, Checkbox } from 'semantic-ui-react';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';


class TaskDetailsComponent extends Component {

    onSubmit(values) {

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
                <Header size='medium'>Edycja zadania</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{
                        id: this.props.record.id,
                        code: this.props.record.code,
                        description: this.props.record.description,
                        type: this.props.record.type.id,
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

                            <Grid columns={5} textAlign="right" verticalAlign="middle" >

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Id zadania</p>
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

export default TaskDetailsComponent;
