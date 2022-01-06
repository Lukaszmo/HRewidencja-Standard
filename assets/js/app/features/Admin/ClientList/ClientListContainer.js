import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import { getAllClients, removeRecord } from '../Clients/Client';
import ClientListComponent from './ClientListComponent';
import { checkItemAccess } from '../../../utils/AuthService';


class ClientListContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getAllClients());
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {
            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/panel-admina/klienci-edycja', state: { recordDetails: record } });
        }

        if (rowAction === 'DELETE') {

            this.props.removeRecord(rowId);
        }
    }

    render() {

        if (this.props.data) {
            return (
                <Container className='clients'>
                    <ClientListComponent
                        data={this.props.data}
                        onTableChange={this.onTableChange}
                    />
                </Container>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    data: state.client.records
})

const mapDispatchToProps = dispatch => ({
    getAllClients: () => dispatch(getAllClients()),
    removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientListContainer);



