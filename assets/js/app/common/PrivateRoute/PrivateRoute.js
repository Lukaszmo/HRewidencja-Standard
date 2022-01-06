import React from "react";
import { Redirect, Route } from "react-router";
import * as AuthService from '../../utils/AuthService'
export default ({ component: Component, ...rest }) => {
    return (

        < Route {...rest} render={props => {
            if (AuthService.isAuthenticated()) {
                return <Component {...props} />;
            } else {
                window.alert("Musisz być zalogowany!");
                return <Redirect push to="/login" />
            }
        }
        } />);
};