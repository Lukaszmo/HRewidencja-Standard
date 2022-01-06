import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
//import ClientCreateComponent from './ClientCreateComponent';
//import { addRecord, ClientValidationSchema } from '../Clients/Client';

class AuthorizationContainer extends Component {



    render() {

        return (
            <Container className=''>
                Uprawnienia in progress
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    //  data: state.client.records
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationContainer);



