import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import ProjectUserDetailsComponent from './ProjectUserDetailsComponent';
import { getAllProjects, generateProjectListForDropdown } from '../Projects/Project';
import { getAllUsers, generateUserListForDropdown } from '../Users/User';
import { updateRecord } from '../ProjectUsers/ProjectUsers';


class ProjectUserDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }

    componentDidMount() {

        let projectFilters = { active: true };

        this.props.getAllProjects(projectFilters);
        this.props.getAllUsers();
    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        return (
            <Container className='projects'>
                <ProjectUserDetailsComponent
                    record={this.state.recordDetails}
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    //userList={this.state.userList}
                    userList={generateUserListForDropdown(this.props.users)}
                    onSubmit={this.onSubmit}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.project.records,
    users: state.user.records
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: (filters) => dispatch(getAllProjects(filters)),
    updateRecord: (object) => dispatch(updateRecord(object)),
    getAllUsers: (filters) => dispatch(getAllUsers(filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUserDetailsContainer);



