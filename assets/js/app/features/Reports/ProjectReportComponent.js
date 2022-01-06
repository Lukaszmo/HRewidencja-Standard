import React, { Component, Fragment } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Form, Grid, GridRow, Dropdown, Button, Input } from 'semantic-ui-react';
import CustomMessage from '../../common/CustomMessage/CustomMessage';
import TableComponent from '../../common/Table/TableComponent';
import { numberToTime } from '../../utils/Utils';

import './Reports.css';
import Media from 'react-media';
import { RadialChart } from 'react-vis';



class ProjectReportComponent extends Component {


    onSubmit(values) {

        this.props.onSubmit(values);
        this.setState({ projectId: values.project });
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    headers = [
        {
            id: "1",
            columnName: "Typ zadania",
            className: "width5",
            dataField: 'taskType',
            type: "data"
        },
        {
            id: "2",
            columnName: "Udział procentowy",
            className: "width5",
            dataField: 'percent',
            type: "data"
        },
        {
            id: "3",
            columnName: "Ilość godzin",
            className: "width5",
            dataField: 'summary',
            type: "data"
        },

    ]

    render() {
        console.log(this.props);

        const showReport = this.props.showReport;
        let radialChart = null;

        if ((showReport) & (this.props.reportData !== undefined)) {

            /*  const data = [
                  { label: 'DEVELOPMENT', color: '#F0E68C', angle: 0.4 },
                  { label: 'ANALIZA', color: '#FFDAB9', angle: 0.3 },
                  { label: 'TESTY', color: '#33cccc', angle: 0.2 },
                  { label: 'INNE', color: '#BDB76B', angle: 0.1 }
              ]; */

            const project = this.props.projectList.find(el => el.key == this.state.projectId);

            const tableData = this.props.reportData.map(function (object) {
                return ({
                    'taskType': object.description,
                    'percent': object.percent + ' %',
                    'summary': numberToTime(object.summary)
                })

            })

            const data = this.props.reportData.map(function (object) {
                return ({
                    'label': object.description,
                    //  'color': color[iter],
                    'angle': parseInt(object.summary)
                })

            })

            if (this.props.reportData.length === 0) {
                radialChart =
                    <Segment className='chart-segment' >
                        <CustomMessage
                            type='info'
                            text='Brak danych'
                            icon={true}
                        />
                    </Segment>
            }
            else {

                radialChart =
                    <div>
                        <Segment className='chart-segment' >
                            <Header size='medium' textAlign='center'>{project.text}</Header>
                            <Divider></Divider>

                            <Segment className='chart-inner-segment'>
                                <Media queries={{ small: { maxWidth: 599 } }}>
                                    {matches =>
                                        matches.small ? (
                                            <RadialChart
                                                data={data}
                                                width={250}
                                                height={250}
                                                showLabels={true} />
                                        ) : (
                                            <RadialChart
                                                data={data}
                                                width={350}
                                                height={350}
                                                //   colorType="literal"
                                                showLabels={true} />
                                        )
                                    }
                                </Media>


                            </Segment>
                            <Segment className='project-report-table-segment'>
                                <TableComponent
                                    headers={this.headers}
                                    data={tableData}
                                />
                            </Segment>
                        </Segment>
                    </div >


            }
        }

        return (
            <div>
                <Segment color="teal" className='report-segment' >
                    <Header size='medium'>Raport projekt</Header>
                    <Divider></Divider>
                    <Header className='filter-header'>Filtry</Header>

                    <Formik
                        initialValues={{ datefrom: this.props.datefrom, dateto: this.props.dateto, project: '' }}

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
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <Input
                                                                type='date'
                                                                name='dateto'
                                                                value={values.dateto}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            />
                                                        </Grid.Column>

                                                        <Grid.Column width={3}>
                                                            <Dropdown fluid selection
                                                                name='project'
                                                                className='dropdown-project'
                                                                placeholder="Wybierz projekt.."
                                                                value={values.project}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                                options={this.props.projectList}
                                                            ></Dropdown>
                                                        </Grid.Column>

                                                        <Grid.Column width={2}>
                                                            <Button
                                                                type='submit'
                                                                className='filterButton'>Generuj Raport
                                                            </Button>
                                                        </Grid.Column>
                                                    </GridRow>
                                                </Grid >}

                                            {(matches.small || matches.medium) &&
                                                <Grid columns={2} textAlign="center" verticalAlign="middle" >
                                                    <GridRow>
                                                        <Grid.Column width={3}>
                                                            <Input
                                                                className='filter-date'
                                                                type='date'
                                                                name='datefrom'
                                                                value={values.datefrom}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            />
                                                        </Grid.Column>
                                                    </GridRow>
                                                    <GridRow>
                                                        <Grid.Column width={3}>
                                                            <Input
                                                                className='filter-date'
                                                                type='date'
                                                                name='dateto'
                                                                value={values.dateto}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            />
                                                        </Grid.Column>
                                                    </GridRow>
                                                    <GridRow>
                                                        <Grid.Column width={2}>
                                                            <Dropdown fluid selection
                                                                name='project'
                                                                className='dropdown-project'
                                                                placeholder="Wybierz projekt.."
                                                                value={values.project}
                                                                options={this.props.projectList}
                                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                            ></Dropdown>
                                                        </Grid.Column>
                                                    </GridRow>
                                                    <Button
                                                        type='submit'
                                                        className='filterButton'>Generuj Raport
                                                    </Button>
                                                </Grid >}
                                        </Fragment>
                                    )}
                                </Media>
                            </Form >
                        )
                        }
                    </Formik>
                </Segment >

                {radialChart}

            </div >

        )
    }
}

export default ProjectReportComponent;