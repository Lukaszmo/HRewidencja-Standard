import React, { Component } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Grid, Input, Form, Divider, Dropdown, Checkbox } from 'semantic-ui-react';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';
import './ProjectTasks.css';


class ProjectTaskAddComponent extends Component {

    onSubmit(values) {

        //values = { ...values, active: true };

        let arr = new Array;

        var i;
        for (i = 0; i < values.task.length; i++) {
            arr.push({ project: values.project, task: values.task[i] });
            console.log(arr);
        }

        this.props.onSubmit(arr);
    }

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    renderLabel = (label) => ({
        color: 'olive',
        content: label.text,
        icon: 'check',
    })


    render() {

        console.log(this.props);

        return (
            <Segment color="teal" >
                <Header size='medium'>Nowe zadania w projekcie</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ project: '', task: '' }}

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
                                        <p className='data-field-header'>Zadanie</p>
                                    </Grid.Column >
                                    <Grid.Column width={3}>
                                        <Dropdown multiple fluid selection
                                            name='task'
                                            className='dropdown-multiple-task'
                                            placeholder="Wybierz.."
                                            value={values.task}
                                            renderLabel={this.renderLabel}
                                            onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                            options={this.props.taskList} />
                                        {errors.task && touched.task ? <div><CustomLabel text={errors.task}></CustomLabel></div> : null}
                                    </Grid.Column>
                                </Grid.Row>


                            </Grid>
                            <div className='button-row'>
                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    Dodaj
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Segment>

        )
    }
}

export default ProjectTaskAddComponent;
