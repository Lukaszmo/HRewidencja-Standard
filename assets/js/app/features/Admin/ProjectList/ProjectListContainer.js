import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import { getAllProjects, removeRecord } from '../Projects/Project';
import ProjectListComponent from './ProjectListComponent';
import { checkItemAccess } from '../../../utils/AuthService';


class ProjectListContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllProjects());
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {
            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/panel-admina/projekty-edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }
    }

    render() {

        if (this.props.data) {
            return (
                <Container className='projects'>
                    <ProjectListComponent
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
    data: state.project.records
})

const mapDispatchToProps = dispatch => ({
    getAllProjects: () => dispatch(getAllProjects()),
    removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectListContainer);



