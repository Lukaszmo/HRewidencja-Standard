import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import { getAllUsersAssignedToProjects, removeRecord } from '../ProjectUsers/ProjectUsers';
import ProjectUsersListComponent from './ProjectUsersListComponent';
import { checkItemAccess } from '../../../utils/AuthService';


class ProjectUsersListContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllUsersAssignedToProjects());
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {
            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/panel-admina/lista-pracownikow-w-projektach-edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }
    }

    render() {

        if (this.props.data) {
            return (
                <Container className='projects'>
                    <ProjectUsersListComponent
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
    data: state.projectUsers.records
})

const mapDispatchToProps = dispatch => ({
    getAllUsersAssignedToProjects: () => dispatch(getAllUsersAssignedToProjects()),
    removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUsersListContainer);



