import React, { Component, Fragment } from "react";

import { Form, Header, Container, Button, Segment, Card, Image, Divider } from 'semantic-ui-react';
import { Formik } from 'formik';
import CanbanCard from "./CanbanCard";
import './CanbanTable.css';



class CanbanTableComponent extends Component {


    onCardClick = (id) => {
        this.props.onCardClick(id);
    }

    render() {

        let inProgressCards = [];
        let doneCards = [];
        let todoCards = [];

        console.log(this.props.data);

        let x = this.props.data;

        for (var i = 0; i < x.length; i++) {

            if (x[i].stage === 1) { todoCards.push(x[i]); }

            if (x[i].stage === 2) { inProgressCards.push(x[i]); }

            if (x[i].stage === 3) { doneCards.push(x[i]); }
        }


        return (
            <div>
                <Segment color="teal" className='report-segment' >
                    <Header size='medium'>Tablica Kanban</Header>
                    <Divider></Divider>
                    <Header className='filter-header'>Filtry</Header>

                    <Formik
                        initialValues={{}}

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

                            </Form>
                        )}
                    </Formik>
                </Segment>



                <div>
                    <Segment color="teal" className="hour-list-segment">
                        <Header size='medium' textAlign='center'></Header>
                        <Divider></Divider>

                        <Segment>

                            <Segment.Group horizontal>
                                <Segment className='canban-table-segment'>
                                    <Header size='small' textAlign='center' >TO DO</Header>
                                    <Divider></Divider>

                                    {todoCards.map((el, index) => {
                                        return (
                                            <CanbanCard
                                                id={el.id}
                                                stage={el.stage}
                                                title={el.title}
                                                onclick={() => this.onCardClick(el.id)}
                                                description={el.description}
                                                user={el.user ? el.user : null}></CanbanCard>
                                        )
                                    })}

                                </Segment>
                                <Segment className='canban-table-segment'>
                                    <Header size='small' textAlign='center' >IN PROGRESS</Header>
                                    <Divider></Divider>

                                    {inProgressCards.map((el, index) => {
                                        return (
                                            <CanbanCard
                                                id={el.id}
                                                stage={el.stage}
                                                title={el.title}
                                                onclick={() => this.onCardClick(el.id)}
                                                description={el.description}
                                                user={el.user ? el.user : null}></CanbanCard>
                                        )
                                    })}

                                </Segment>
                                <Segment className='canban-table-segment'>
                                    <Header size='small' textAlign='center' >DONE</Header>
                                    <Divider></Divider>

                                    {doneCards.map((el, index) => {
                                        return (
                                            <CanbanCard
                                                id={el.id}
                                                stage={el.stage}
                                                title={el.title}
                                                onclick={() => this.onCardClick(el.id)}
                                                description={el.description}
                                                user={el.user ? el.user : null}></CanbanCard>
                                        )
                                    })}


                                </Segment>
                            </Segment.Group>
                        </Segment>

                    </Segment>
                </div>
            </div>
        )
    }
}

export default CanbanTableComponent;