import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import ProjectTaskDetailsComponent from './ProjectTaskDetailsComponent';
import { getAllProjects, generateProjectListForDropdown } from '../Projects/Project';
import { getAllTasks } from '../Tasks/Tasks';
import { updateRecord } from '../ProjectTasks/ProjectTasks';


class ProjectTaskDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }

    componentDidMount() {

        let projectFilters = { active: true };

        this.props.getAllProjects(projectFilters);
        this.props.getAllTasks();
    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        return (
            <Container className='projects'>
                <ProjectTaskDetailsComponent
                    record={this.state.recordDetails}
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    taskList={generateProjectListForDropdown(this.props.tasks)}
                    onSubmit={this.onSubmit}
                />
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    projects: state.project.records,
    tasks: state.task.records
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: (filters) => dispatch(getAllProjects(filters)),
    getAllTasks: () => dispatch(getAllTasks()),
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTaskDetailsContainer);



