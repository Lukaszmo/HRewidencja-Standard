import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ProjectUserAddComponent from './ProjectUserAddComponent';
import { getAllProjects, generateProjectListForDropdown } from '../Projects/Project';
import { addUserToProject, ProjectUsersValidationSchema } from '../ProjectUsers/ProjectUsers';
import { getAllUsers, generateUserListForDropdown } from '../Users/User';
import { checkItemAccess } from '../../../utils/AuthService';


class ProjectUserAddContainer extends Component {

    componentDidMount() {

        let projectFilters = { active: true };

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllProjects(projectFilters))
            .then(() => this.props.getAllUsers());
    }

    onSubmit = (values) => {

        this.props.addUserToProject(values);
    }

    render() {

        return (
            <Container className='projects'>
                <ProjectUserAddComponent
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    userList={generateUserListForDropdown(this.props.users)}
                    onSubmit={this.onSubmit}
                    validationSchema={ProjectUsersValidationSchema}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    data: state.projectUsers.records,
    projects: state.project.records,
    users: state.user.records
})

const mapDispatchToProps = dispatch => ({
    addUserToProject: (object) => dispatch(addUserToProject(object)),
    getAllProjects: (filters) => dispatch(getAllProjects(filters)),
    getAllUsers: (filters) => dispatch(getAllUsers(filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUserAddContainer);



