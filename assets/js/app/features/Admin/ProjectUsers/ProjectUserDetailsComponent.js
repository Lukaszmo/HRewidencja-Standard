import React, { Component } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Grid, Input, Form, Divider, Dropdown, Checkbox } from 'semantic-ui-react';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';


class ProjectUserDetailsComponent extends Component {

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
                <Header size='medium'>Edycja pracownika w projekcie</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{
                        id: this.props.record.id,
                        project: this.props.record.project.id,
                        user: this.props.record.user.id,
                        active: this.props.record.active === 1 ? true : false
                    }}

                    //   validationSchema={ }

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
                                        <p className='data-field-header'>Id</p>
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
                                        <p className='data-field-header'>Projekt</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Dropdown fluid selection
                                            name='project'
                                            className=''
                                            placeholder="Wybierz.."
                                            value={values.project}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            options={this.props.projectList} />
                                        {errors.project && touched.project ? <div><CustomLabel text={errors.project}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <p className='data-field-header'>Pracownik</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Dropdown fluid selection
                                            name='user'
                                            className=''
                                            placeholder="Wybierz.."
                                            value={values.user}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            options={this.props.userList} />
                                        {errors.user && touched.user ? <div><CustomLabel text={errors.user}></CustomLabel></div> : null}
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

export default ProjectUserDetailsComponent;
