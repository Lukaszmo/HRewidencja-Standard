import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import TaskCreateComponent from './TaskCreateComponent';
import { createTask, TaskValidationSchema } from './Tasks';
import { getTaskTypes, generateTaskTypeListForDropdown } from '../TaskTypes/TaskType';
import { checkItemAccess } from '../../../utils/AuthService';

class TasksContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getTaskTypes());
    }

    addTask = (values) => {

        this.props.createTask(values);
    }

    render() {

        return (
            <Container className='tasks'>
                <TaskCreateComponent
                    validationSchema={TaskValidationSchema}
                    onSubmit={this.addTask}
                    taskTypes={generateTaskTypeListForDropdown(this.props.taskTypes)}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    taskTypes: state.taskTypes.records
})

const mapDispatchToProps = dispatch => ({
    createTask: (object) => dispatch(createTask(object)),
    getTaskTypes: () => dispatch(getTaskTypes())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksContainer);



