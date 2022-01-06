import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import TaskDetailsComponent from './TaskDetailsComponent';

import { updateRecord, TaskValidationSchema } from './Tasks';
import { getTaskTypes, generateTaskTypeListForDropdown } from '../TaskTypes/TaskType';


class TaskDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }

    componentDidMount() {

        this.props.getTaskTypes();
    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        return (
            <Container className='tasks'>
                <TaskDetailsComponent
                    record={this.state.recordDetails}
                    onSubmit={this.onSubmit}
                    taskTypes={generateTaskTypeListForDropdown(this.props.taskTypes)}
                    validationSchema={TaskValidationSchema}
                />


            </Container>
        );
    }
}

const mapStateToProps = state => ({
    taskTypes: state.taskTypes.records
})

const mapDispatchToProps = dispatch => ({
    getTaskTypes: () => dispatch(getTaskTypes()),
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailsContainer);



