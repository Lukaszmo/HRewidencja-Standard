import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import { checkItemAccess } from '../../utils/AuthService';
import AssignedTaskdetailsComponent from './AssignedTaskDetailsComponent';
import { getAllProjects, generateProjectListForDropdown } from '../Admin/Projects/Project';
import { getAllUsers, generateUserListForDropdown } from '../Admin/Users/User';
import { updateRecord } from './TaskTable';



class AssignedTaskDetailsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recordDetails: this.props.location.state.recordDetails[0],
        }
    }

    componentDidMount() {

        let projectFilters = { active: true };

        checkItemAccess("TASK_TABLE")
            .then(() => this.props.getAllProjects(projectFilters))
            .then(() => this.props.getAllUsers());
    }

    updateTask = (values) => {

        this.props.updateRecord(values);
    }


    render() {

        return (
            <Container className="">
                <AssignedTaskdetailsComponent
                    recordDetails={this.state.recordDetails}
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    userList={generateUserListForDropdown(this.props.users)}
                    onSubmit={this.updateTask}
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
    getAllUsers: (filters) => dispatch(getAllUsers(filters)),
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignedTaskDetailsContainer);



