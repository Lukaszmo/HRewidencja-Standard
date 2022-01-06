import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginComponent from "./LoginComponent";
import { userLoginOperation } from './Login';
import * as AuthService from '../../utils/AuthService';
import { Redirect } from "react-router-dom";


class LoginContainer extends Component {

    loginOperation = (login, password) => {

        const user = {
            login: login,
            password: password
        }
        this.props.userLoginOperation(user);
    }

    render() {
        //jeśli użytkownik jest zalogowany przekieruj do strony głównej
        if (AuthService.isAuthenticated()) {
            return <Redirect push to="/home" />
        }
        return (
            <LoginComponent login={this.loginOperation} />
        );
    }
}


//pobiera stan ze store i przekazuje do komponentu
const mapStateToProps = state => ({
    loginFailureCounter: state.login.loginFailureCounter
})

//mapuje akcje na propsy, podajemy nazwy funkcji, które komponent bedzie mógł wywoływać, aby zlecić zmianę danych w store
const mapDispatchToProps = dispatch => ({
    userLoginOperation: (user) => dispatch(userLoginOperation(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);