import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import PasswordChangeComponent from './PasswordChangeComponent';
import { changePassword, validationSchema } from './Password';
import { checkItemAccess } from '../../utils/AuthService';


class PasswordChangeContainer extends Component {

    onSubmit = (values) => {

        changePassword(values, this.props.user.id);

    }

    render() {

        return (
            <Container className="">
                <PasswordChangeComponent
                    onSubmit={this.onSubmit}
                    validationSchema={validationSchema}
                />

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.loggedUser,
    types: state.vacation.types,
})

export default connect(
    mapStateToProps
)(PasswordChangeContainer);



