import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import ProjectTasksListComponent from './ProjectTasksListComponent';
import { getAllTasksAssignedToProjects, removeRecord } from '../ProjectTasks/ProjectTasks';
import { checkItemAccess } from '../../../utils/AuthService';


class ProjectTasksListContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllTasksAssignedToProjects());
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {
            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/panel-admina/zadania-w-projektach-edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }

    }

    render() {

        if (this.props.data) {
            return (
                <Container className='projects'>
                    <ProjectTasksListComponent
                        data={this.props.data}
                        onTableChange={this.onTableChange}
                    />
                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    data: state.projectTasks.records
})

const mapDispatchToProps = dispatch => ({
    getAllTasksAssignedToProjects: () => dispatch(getAllTasksAssignedToProjects()),
    removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTasksListContainer);



