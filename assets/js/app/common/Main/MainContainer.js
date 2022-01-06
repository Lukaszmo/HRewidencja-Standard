import React, { Component } from "react";
import { connect } from 'react-redux';

import MainComponent from "./MainComponent";
import { setMenuOpenFlag } from "../Menu/Menu";

import { getLoggedUser, getRoleItemList } from "../../features/User/User";

class MainContainer extends Component {

    componentDidMount() {

        this.props.getLoggedUser(this.props.login.userId)
            .then(() => this.props.getRoleItemList(this.props.user.userRoles[0].roleId));

    }

    setOpen = () => {

        let isOpen = (this.props.open === true) ? false : true;
        this.props.setMenuOpenFlag(isOpen);
    }

    render() {

        if (this.props.user.accessItems) {
            return (
                <MainComponent
                    open={this.props.open}
                    setOpen={this.setOpen}
                    {...this.props}
                />
            )
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    open: state.menu.open,
    user: state.loggedUser,
    login: state.login
})

const mapDispatchToProps = dispatch => ({
    setMenuOpenFlag: (isOpen) => dispatch(setMenuOpenFlag(isOpen)),
    getLoggedUser: (id) => dispatch(getLoggedUser(id)),
    getRoleItemList: (role) => dispatch(getRoleItemList(role))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);

