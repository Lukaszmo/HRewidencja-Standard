import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { getAllClients, generateClientListForDropdown } from '../Clients/Client';
import ProjectDetailsComponent from './ProjectDetailsComponent';
import { updateRecord, ProjectValidationSchema } from './Project';


class ProjectDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }

    componentDidMount() {

        this.props.getAllClients();
    }

    onSubmit = (values) => {

        this.props.updateRecord(values);
    }

    render() {

        return (
            <Container className='projects'>
                <ProjectDetailsComponent
                    record={this.state.recordDetails}
                    clients={generateClientListForDropdown(this.props.clients)}
                    validationSchema={ProjectValidationSchema}
                    onSubmit={this.onSubmit}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.client.records
})

const mapDispatchToProps = dispatch => ({
    getAllClients: () => dispatch(getAllClients()),
    updateRecord: (object) => dispatch(updateRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetailsContainer);



