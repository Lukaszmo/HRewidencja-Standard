import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursAddComponent from "./HoursAddComponent";
import { fetchAllTypes, addRecord, HourValidationSchema } from "./Hours";
import { fetchProjectTasks, generateTasksForDropdown } from "../Admin/ProjectTasks/ProjectTasks";
import { getUserProjects } from "./../User/User";
import { Container } from 'semantic-ui-react';
import { checkItemAccess } from '../../utils/AuthService';

class HoursContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: null
        }
    }

    componentDidMount() {

        checkItemAccess("TIMESHEET")
            .then(() => this.props.fetchAllTypes())
            .then(() => this.props.getUserProjects(this.props.user.id));

    }

    onSubmit = (object) => {

        this.props.addRecord(object, this.props.user.id);
    }

    onProjectDropdownChange = (projectId) => {

        fetchProjectTasks(projectId).then(resp => this.setState({ tasks: generateTasksForDropdown(resp.data) }));

    }


    render() {

        console.log(this.props);

        return (
            <Container className="hours">
                <HoursAddComponent
                    types={this.props.hourTypes}
                    onSubmit={this.onSubmit}
                    validationSchema={HourValidationSchema}
                    projectList={this.props.user.projectList}
                    onProjectDropdownChange={this.onProjectDropdownChange}
                    tasks={this.state.tasks} />
            </Container>
        );
    }
}

//pobiera stan ze store i przekazuje do propsów komponentu
const mapStateToProps = state => ({
    hourTypes: state.hour.types,
    user: state.loggedUser
})

const mapDispatchToProps = dispatch => ({
    fetchAllTypes: () => dispatch(fetchAllTypes()),
    addRecord: (object, id) => dispatch(addRecord(object, id)),
    getUserProjects: (id) => dispatch(getUserProjects(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursContainer);
