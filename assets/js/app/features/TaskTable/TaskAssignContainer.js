import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Container } from 'semantic-ui-react';
import TaskAssignComponent from './TaskAssignComponent';
import { addRecord } from './TaskTable';
import { checkItemAccess } from '../../utils/AuthService';
import { getAllProjects, generateProjectListForDropdown } from '../Admin/Projects/Project';
import { getAllUsers, generateUserListForDropdown } from '../Admin/Users/User';

class TaskAssignContainer extends Component {


    componentDidMount() {

        let projectFilters = { active: true };

        checkItemAccess("TASK_TABLE")
            .then(() => this.props.getAllProjects(projectFilters))
            .then(() => this.props.getAllUsers());
    }

    addTask = (values) => {

        addRecord(values);
    }

    render() {

        return (
            <Container className="">
                <TaskAssignComponent
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    userList={generateUserListForDropdown(this.props.users)}
                    onSubmit={this.addTask}
                ></TaskAssignComponent>
            </Container>
        );
    }
}

//pobiera stan ze store i przekazuje do propsów komponentu
const mapStateToProps = state => ({
    projects: state.project.records,
    users: state.user.records
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: (filters) => dispatch(getAllProjects(filters)),
    getAllUsers: (filters) => dispatch(getAllUsers(filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskAssignContainer);
