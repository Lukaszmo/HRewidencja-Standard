import React, { Component, Fragment } from "react";

import { Formik } from 'formik';
import { Header, Grid, Container, Segment, Input, Dropdown, Button, GridRow, Form, Divider } from 'semantic-ui-react';
import TableComponent from '../../common/Table/TableComponent.js';
import Media from 'react-media';

class VacationListComponent extends Component {

    onSubmit(values) {

        const filters = {
            dateFrom: values.datefrom,
            dateTo: values.dateto
        }

        this.props.onFilterSubmit(values.user, filters);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    dateHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    headers = [
        {
            id: "1",
            columnName: "Nr wniosku",
            className: "width5",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "Status",
            className: "width10",
            dataField: 'state',
            subField: 'description',
            type: "data"
        },

        {
            id: "3",
            columnName: "Imię i nazwisko",
            className: "width10",
            dataField: 'employeeFullname',
            type: "data"
        },

        {
            id: "4",
            columnName: "Typ wniosku",
            className: "width10",
            dataField: 'type',
            subField: 'description',
            type: "data",
        },
        {
            id: "5",
            columnName: "Data od",
            className: "width5",
            dataField: 'datefrom',
            type: "data",
            subType: "date",
        },
        {
            id: "6",
            columnName: "Data do",
            className: "width5",
            dataField: 'dateto',
            type: "data",
            subType: "date",
        },
        {
            id: "7",
            columnName: "Ilość dni",
            className: "width5",
            dataField: 'quantity',
            type: "data",
        },
        {
            id: "8",
            columnName: "",
            className: "width5",
            dataField: 'quantity',
            type: "button",
            action: "edit",
            iconName: "search"
        }

    ]


    render() {

        return (
            <div>
                <Segment color="teal" className="vacation-list-segment">
                    <Header size='medium'>Lista wniosków</Header>
                    <Divider></Divider>
                    <Header className='filter-header'>Filtry</Header>
                    <Formik
                        initialValues={{ user: this.props.loggedUser.id, datefrom: this.props.dateFrom, dateto: this.props.dateTo }}

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
                                    <Media queries={{
                                        small: "(max-width: 599px)",                            //mobile 
                                        medium: "(min-width: 600px) and (max-width: 1199px)",   //tablet
                                        large: "(min-width: 1200px)"                            //laptop
                                    }}>
                                        {matches => (

                                            <Fragment>
                                                {(matches.large) &&
                                                    <Grid columns={2} textAlign="right" verticalAlign="middle" >
                                                        <GridRow>
                                                            <Grid.Column width={3}>
                                                                <Input
                                                                    type='date'
                                                                    name='datefrom'
                                                                    value={values.datefrom}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)}
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width={3}>
                                                                <Input
                                                                    type='date'
                                                                    name='dateto'
                                                                    value={values.dateto}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)}
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width={3}>
                                                                <Dropdown fluid selection disabled={this.props.disabled}
                                                                    name='user'
                                                                    className='dropdown-userlist'
                                                                    value={values.user}
                                                                    options={this.props.userList}
                                                                    onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                ></Dropdown>
                                                            </Grid.Column>
                                                            <Grid.Column width={2}>
                                                                <Button
                                                                    type='submit'
                                                                    className='filterButton'>Filtruj
                                                                </Button>
                                                            </Grid.Column>
                                                        </GridRow>
                                                    </Grid >}

                                                {(matches.small || matches.medium) &&
                                                    <Grid textAlign="center" verticalAlign="middle" >
                                                        <GridRow>
                                                            <Grid.Column>
                                                                <Input
                                                                    type='date'
                                                                    className='filter-date'
                                                                    name='datefrom'
                                                                    value={values.datefrom}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)}
                                                                />
                                                            </Grid.Column>
                                                        </GridRow>
                                                        <GridRow>
                                                            <Grid.Column>
                                                                <Input
                                                                    type='date'
                                                                    className='filter-date'
                                                                    name='dateto'
                                                                    value={values.dateto}
                                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)}
                                                                />
                                                            </Grid.Column>
                                                        </GridRow>
                                                        <GridRow>
                                                            <Grid.Column >
                                                                <Dropdown fluid selection disabled={this.props.disabled}
                                                                    name='user'
                                                                    className='dropdown-userlist'
                                                                    value={values.user}
                                                                    options={this.props.userList}
                                                                    onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                ></Dropdown>
                                                            </Grid.Column>
                                                        </GridRow>

                                                        <Button
                                                            type='submit'
                                                            className='filterButton'>Filtruj
                                                        </Button>
                                                    </Grid >}


                                            </Fragment>
                                        )}
                                    </Media>
                                </Form>
                            )}
                    </Formik>
                </Segment >

                <Segment>
                    <TableComponent
                        headers={this.headers}
                        data={this.props.data}
                        onTableChange={this.props.onTableChange}
                        rowsPerPage={10}
                        pagination={true} />
                </Segment>
            </div>

        )
    }
}

export default VacationListComponent;