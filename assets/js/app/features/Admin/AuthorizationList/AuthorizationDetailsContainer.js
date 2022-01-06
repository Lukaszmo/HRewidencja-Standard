import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import AuthorizationDetailsComponent from './AuthorizationDetailsComponent';
import { updateRecord } from './../Authorization/RoleAccess';


class AuthorizationDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        return (
            <Container className=''>
                <AuthorizationDetailsComponent
                    record={this.state.recordDetails}
                    onSubmit={this.onSubmit}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationDetailsContainer);



