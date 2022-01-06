import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ProjectTaskAddComponent from './ProjectTaskAddComponent';
import { getAllTasks, generateTasksForDropdown } from '../Tasks/Tasks';
import { addTaskToProject, ProjectTasksValidationSchema } from '../ProjectTasks/ProjectTasks';
import { getAllProjects, generateProjectListForDropdown } from '../Projects/Project';
import { checkItemAccess } from '../../../utils/AuthService';


class ProjectTaskAddContainer extends Component {

    componentDidMount() {

        let projectFilters = { active: true };

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllProjects(projectFilters))
            .then(() => this.props.getAllTasks());
    }

    onSubmit = (values) => {

        //this.props.addTaskToProject(values);
        addTaskToProject(values);
    }

    render() {

        return (
            <Container className='projects'>
                <ProjectTaskAddComponent
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    taskList={generateTasksForDropdown(this.props.tasks)}
                    onSubmit={this.onSubmit}
                    validationSchema={ProjectTasksValidationSchema}
                />
            </Container>
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
    // addTaskToProject: (object) => dispatch(addTaskToProject(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTaskAddContainer);



