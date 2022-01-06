import React, { Component } from "react";
import { Label } from 'semantic-ui-react';
import './CustomLabel.css';

class CustomLabel extends Component {

    render() {

        return (
            <Label className='custom-label' pointing >{this.props.text}</Label>
        )
    }
}

export default CustomLabel;