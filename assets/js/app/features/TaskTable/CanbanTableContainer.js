import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../history';


import { Container } from 'semantic-ui-react';
import { checkItemAccess } from '../../utils/AuthService';
import CanbanTableComponent from './CanbanTableComponent';
import { getAllAssignedTasks } from './TaskTable';

class TaskTableContainer extends Component {


    componentDidMount() {

        checkItemAccess("TASK_TABLE")
            .then(() => this.props.getAllAssignedTasks())
    }

    onCardClick = (recordId) => {

        let record = this.props.data.filter(item => item.id === recordId);
        history.push({ pathname: '/tablica-zadan/kanban/edycja', state: { recordDetails: record } })
    }


    render() {

        console.log(this.props);

        if (this.props.data) {

            return (
                <Container className="">
                    <CanbanTableComponent
                        data={this.props.data}
                        onCardClick={this.onCardClick}

                    ></CanbanTableComponent>
                </Container>
            )
        }
        else return null;
    }
}

//pobiera stan ze store i przekazuje do propsów komponentu
const mapStateToProps = state => ({
    data: state.assignedTasks.records,
})

const mapDispatchToProps = dispatch => ({
    getAllAssignedTasks: () => dispatch(getAllAssignedTasks()),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskTableContainer);
