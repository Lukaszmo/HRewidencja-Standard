import React, { Component } from "react";
import { Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { userLogoutOperation } from '../../features/Login/Login';
import Burger from '../Burger/Burger';
import UserDetailsPopup from '../UserDetailsPopup/UserDetailsPopup';

import './Header.css';

class Header extends Component {

    logoutOperation = () => {

        this.props.userLogoutOperation(); // teraz to jest w Login.js być może trzeba przenieść do Logout?
    }


    render() {

        let logoRight = <div className="logo-right"></div>;

        if (this.props.menuId === 'HOME') {
            logoRight = null;
        }

        return (
            <div className="header-container">

                <Burger open={this.props.open} setOpen={this.props.setOpen}></Burger>

                <div className="logo-left">Logo</div>

                {logoRight}

                <div className="header-center"></div>

                <div className="logged-in-username">
                    <div className="username">
                        <Icon name='user'></Icon>
                        {this.props.user.username}
                    </div>

                    <UserDetailsPopup user={this.props.user}></UserDetailsPopup>

                </div >

                <div className="logout" onClick={this.logoutOperation}>
                    <Icon name='power off'></Icon>
                    <p>Wyloguj</p>
                </div>

            </div >
        )
    }
}


const mapStateToProps = state => ({
    user: state.loggedUser
    // userLogoutOperation: state.login.userLogoutOperation
})

//mapuje akcje na propsy, podajemy nazwy funkcji, które komponent bedzie mógł wywoływać, aby zlecić zmianę danych w store
const mapDispatchToProps = dispatch => ({
    userLogoutOperation: () => dispatch(userLogoutOperation())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);


