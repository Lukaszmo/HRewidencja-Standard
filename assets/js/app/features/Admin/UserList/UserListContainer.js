import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserListComponent from './UserListComponent';
import history from '../../../../history';

import { getAllUsers } from '../Users/User';
import { checkItemAccess } from '../../../utils/AuthService';


class UserListContainer extends Component {


    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllUsers());
    }

    onTableChange = (rowAction, rowId) => {

        let record = this.props.users.filter(item => item.id === rowId);
        history.push({ pathname: '/panel-admina/uzytkownicy-edycja', state: { recordDetails: record } });
    }

    render() {


        if (this.props.users) {
            return (
                <Container className='users'>
                    <UserListComponent
                        data={this.props.users}
                        onTableChange={this.onTableChange}
                    />
                </Container>
            )
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    users: state.user.records
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: (filters) => dispatch(getAllUsers(filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListContainer);



