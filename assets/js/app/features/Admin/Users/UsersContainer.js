import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserCreateComponent from './UserCreateComponent';

import { addUser, getAllUsers, generateUserListForDropdown, UserValidationSchema } from '../Users/User';
import { getAllRoles } from '../Roles/Role';
import { checkItemAccess } from '../../../utils/AuthService';


class UsersContainer extends Component {

    state = {
        roleList: null
    }

    componentDidMount() {

        let filters = { active: true };

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllUsers(filters))
            .then(() => getAllRoles().then(resp => this.setState({ roleList: resp })));
    }

    addUser = (values) => {

        this.props.addUser(values);
    }


    render() {

        return (
            <Container className='users'>
                <UserCreateComponent
                    roles={this.state.roleList}
                    users={generateUserListForDropdown(this.props.users)}
                    validationSchema={UserValidationSchema}
                    onSubmit={this.addUser}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.records
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: (filters) => dispatch(getAllUsers(filters)),
    addUser: (object) => dispatch(addUser(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersContainer);



