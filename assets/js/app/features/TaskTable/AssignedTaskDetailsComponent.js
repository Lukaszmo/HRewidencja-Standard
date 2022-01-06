import React, { Component } from "react";

import { Form, Header, Button, Segment, Grid, Input, Divider, TextArea, Dropdown } from 'semantic-ui-react';
import { Formik } from 'formik';


class AssignedTaskdetailsComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    onSubmit(values) {

        this.props.onSubmit(values);
    }


    render() {

        // TODO utworzyć słownik w bazie
        let stageList = [
            {
                key: 1,
                text: 'TODO',
                value: 1,
            },
            {
                key: 2,
                text: 'IN PROGRESS',
                value: 2
            },
            {
                key: 3,
                text: 'DONE',
                value: 3
            }

        ]

        return (
            <div>
                <Segment color="teal" className='report-segment' >
                    <Header size='medium'>Edycja zadania</Header>
                    <Divider></Divider>

                    <Formik
                        initialValues={{
                            id: this.props.recordDetails.id,
                            title: this.props.recordDetails.title,
                            description: this.props.recordDetails.description,
                            stage: this.props.recordDetails.stage,
                            project: this.props.recordDetails.project.id,
                            user: this.props.recordDetails.user ? this.props.recordDetails.user.id : null,
                        }}

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
                                        <Grid.Column width={2}>
                                            <Input disabled
                                                type="text"
                                                name='id'
                                                value={values.id} />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Tytuł</p>
                                        </Grid.Column >
                                        <Grid.Column width={5}>
                                            <Input
                                                type="text"
                                                name='title'
                                                className='canban-card-title'
                                                value={values.title}
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                            {errors.title && touched.title ? <div><CustomLabel text={errors.title}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Opis</p>
                                        </Grid.Column >
                                        <Grid.Column width={5}>
                                            <TextArea
                                                name='description'
                                                className='canban-card-description'  // zmienić
                                                value={values.description}
                                                onChange={handleChange} />
                                            {errors.description && touched.description ? <div><CustomLabel text={errors.description}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Status</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Dropdown fluid selection
                                                name='stage'
                                                className=''
                                                placeholder="Wybierz.."
                                                value={values.stage}
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)}
                                                options={stageList} />
                                            {errors.stage && touched.stage ? <div><CustomLabel text={errors.stage}></CustomLabel></div> : null}
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
                                        Zapisz zmiany
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Segment>


            </div >
        )
    }
}

export default AssignedTaskdetailsComponent;