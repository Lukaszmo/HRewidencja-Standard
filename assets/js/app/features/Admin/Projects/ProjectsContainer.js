import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ProjectCreateComponent from './ProjectCreateComponent';
import { getAllClients, generateClientListForDropdown } from '../Clients/Client';
import { addRecord, ProjectValidationSchema } from './Project';

class ProjectsContainer extends Component {

    componentDidMount() {

        this.props.getAllClients();
    }

    addProject = (values) => {

        this.props.addRecord(values);
    }

    render() {

        return (
            <Container className='projects'>
                <ProjectCreateComponent
                    clients={generateClientListForDropdown(this.props.clients)}
                    validationSchema={ProjectValidationSchema}
                    onSubmit={this.addProject}
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
    addRecord: (object) => dispatch(addRecord(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsContainer);



