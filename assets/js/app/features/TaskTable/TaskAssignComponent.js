import React, { Component, Fragment } from "react";

import { Form, Header, Container, Button, Segment, Grid, Input, Divider, TextArea, Dropdown } from 'semantic-ui-react';
import { Formik } from 'formik';



class TaskAssignComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

        values = { ...values, stage: 1 };

        this.props.onSubmit(values);
    }


    render() {


        return (
            <div>
                <Segment color="teal" className='report-segment' >
                    <Header size='medium'>Nowe Zadanie</Header>
                    <Divider></Divider>

                    <Formik
                        initialValues={{ title: '', description: '' }}

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
                                            <p className='data-field-header'>Tytuł</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type="text"
                                                name='title'
                                                value={values.title}
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                            {errors.title && touched.title ? <div><CustomLabel text={errors.title}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Opis</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <TextArea
                                                name='description'
                                                className='hours-comment'  // zmienić
                                                value={values.description}
                                                onChange={handleChange} />
                                            {errors.description && touched.description ? <div><CustomLabel text={errors.description}></CustomLabel></div> : null}
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
                                            <p className='data-field-header'>Przypisz do</p>
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




                                </Grid>
                                <div className='button-row'>
                                    <Button
                                        type='submit'
                                        className='saveButton'
                                        color='teal'>
                                        {/*onClick={this.props.onButtonClick}>*/}
                                        Dodaj zadanie
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Segment>


            </div>
        )
    }
}

export default TaskAssignComponent;