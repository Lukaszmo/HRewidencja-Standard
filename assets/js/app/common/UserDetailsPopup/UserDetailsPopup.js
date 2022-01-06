import React, { Component } from "react";
import { Icon, Popup, Button, Divider } from 'semantic-ui-react';
import './UserDetailsPopup.css';

import history from '../../../history';


class UserDetailsPopup extends Component {

    redirectToSettings = () => {

        history.push({ pathname: '/ustawienia/zmiana-hasla' });

    }

    render() {

        return (
            <Popup
                on="click"
                className="user-details-popup"
                position='top center'

                trigger={
                    <div className="caret">
                        <Icon name='caret down'></Icon>
                    </div>}>
                <p>{this.props.user.firstname} {this.props.user.lastname}</p>
                <Divider></Divider>
                <p>Numer ewidencyjny: {this.props.user.regnum} </p>
                <p>Stanowisko: {this.props.user.position} </p>
                <Button
                    className='settings-button'
                    size='tiny'
                    onClick={this.redirectToSettings}>
                    Ustawienia</Button>

            </Popup>
        )
    }
}

export default UserDetailsPopup;





