import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ClientCreateComponent from './ClientCreateComponent';
import { addRecord, ClientValidationSchema } from '../Clients/Client';
import { checkItemAccess } from '../../../utils/AuthService';

class ClientsContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN");
    }

    addClient = (values) => {

        this.props.addRecord(values);
    }

    render() {

        return (
            <Container className='clients'>
                <ClientCreateComponent
                    validationSchema={ClientValidationSchema}
                    onSubmit={this.addClient}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    data: state.client.records
})

const mapDispatchToProps = dispatch => ({
    addRecord: (object) => dispatch(addRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientsContainer);



