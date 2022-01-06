import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import { getAllTasks, removeRecord } from '../Tasks/Tasks';
import TaskListComponent from './TaskListComponent';
import { checkItemAccess } from '../../../utils/AuthService';


class TaskListContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllTasks());
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {
            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/panel-admina/zadania-edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }
    }

    render() {

        if (this.props.data) {
            return (
                <Container className='tasks'>
                    <TaskListComponent
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
    data: state.task.records
})

const mapDispatchToProps = dispatch => ({
    getAllTasks: () => dispatch(getAllTasks()),
    removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListContainer);



