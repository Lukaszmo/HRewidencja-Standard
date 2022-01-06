import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserDetailsComponent from '../Users/UserDetailsComponent';
import { updateRecord, getAllUsers, generateUserListForDropdown, UserValidationSchema } from '../Users/User';
import { getAllRoles } from '../Roles/Role';


class UserDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }


    componentDidMount() {

        let filters = { active: true };

        this.props.getAllUsers(filters);
        getAllRoles().then(resp => this.setState({ roleList: resp }));

    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        console.log(this.props);
        delete UserValidationSchema.fields.password;

        return (
            <Container className='users'>
                <UserDetailsComponent
                    record={this.state.recordDetails}
                    roles={this.state.roleList}
                    users={generateUserListForDropdown(this.props.users)}
                    onSubmit={this.onSubmit}
                    validationSchema={UserValidationSchema}
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
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailsContainer);



