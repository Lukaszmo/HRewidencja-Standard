import React, { Component } from "react";
import { Message, Icon } from 'semantic-ui-react';
import './CustomMessage.css';

class CustomMessage extends Component {

    render() {

        let type = this.props.type;
        let text = this.props.text;
        let isIcon = this.props.icon;
        let message, infoFlag, positiveFlag, negativeFlag, icon, iconName = null;

        if (type === 'info') { infoFlag = true; iconName = 'info' }
        if (type === 'positive') { positiveFlag = true; iconName = 'checkmark' }
        if (type === 'negative') { negativeFlag = true; iconName = 'exclamation' }

        if (isIcon) { icon = <Icon name={iconName} className='message-icon'></Icon> }

        message = <Message
            positive={positiveFlag}
            negative={negativeFlag}
            info={infoFlag}>
            {icon}
            {text}
        </Message >

        return (
            message
        )
    }
}

export default CustomMessage;