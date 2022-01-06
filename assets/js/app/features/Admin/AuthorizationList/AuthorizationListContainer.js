import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import history from '../../../../history';

import { getRoleAccessList } from '../Authorization/RoleAccess';
import AuthorizationListComponent from './AuthorizationListComponent';
import { checkItemAccess } from '../../../utils/AuthService';


class AuthorizationListContainer extends Component {

    componentDidMount() {

        checkItemAccess("ADMIN")
            .then(() => this.props.getRoleAccessList());
    }

    onTableChange = (rowAction, rowId) => {

        if (rowAction === 'EDIT') {
            let record = this.props.data.filter(item => item.id === rowId);
            history.push({ pathname: '/panel-admina/uprawnienia-edycja', state: { recordDetails: record } });
        }
    }

    render() {

        if (this.props.data) {
            return (
                <Container className=''>
                    <AuthorizationListComponent
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
    data: state.roleAccessList.records
})

const mapDispatchToProps = dispatch => ({
    getRoleAccessList: () => dispatch(getRoleAccessList()),
    //  removeRecord: (id) => dispatch(removeRecord(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationListContainer);



