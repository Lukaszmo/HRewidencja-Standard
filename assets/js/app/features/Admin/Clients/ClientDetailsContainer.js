import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import ClientDetailsComponent from './ClientDetailsComponent';
import { updateRecord, ClientValidationSchema } from './Client';


class ClientDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        return (
            <Container className='clients'>
                <ClientDetailsComponent
                    record={this.state.recordDetails}
                    validationSchema={ClientValidationSchema}
                    onSubmit={this.onSubmit}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    data: state.client.records
})

const mapDispatchToProps = dispatch => ({
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientDetailsContainer);



