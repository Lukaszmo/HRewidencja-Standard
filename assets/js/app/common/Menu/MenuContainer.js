import React, { Component } from "react";
import { connect } from 'react-redux';

import MenuComponent from "./MenuComponent";
import { setMenu } from "../Menu/Menu";
import * as AuthService from '../../utils/AuthService';
import { Redirect } from "react-router-dom";
import { setMenuOpenFlag } from "../Menu/Menu";

class MenuContainer extends Component {

    menu = setMenu();

    handleMenuItemClick = (menuItemId) => {

        if (menuItemId === 'HOME') {
            this.props.setMenuOpenFlag(false);
        }
    }

    render() {
        if (!AuthService.isAuthenticated()) {
            return <Redirect push to="/login" />
        }

        return (
            <MenuComponent
                menu={this.menu}
                activeMenuItem={this.props.menuId}
                handleMenuItemClick={this.handleMenuItemClick}
                accessList={this.props.user.accessItems}
            />

        )
    }

}


const mapStateToProps = state => ({
    menu: state.menu,
    user: state.loggedUser,
})

const mapDispatchToProps = dispatch => ({
    setMenuOpenFlag: (isOpen) => dispatch(setMenuOpenFlag(isOpen))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContainer);
