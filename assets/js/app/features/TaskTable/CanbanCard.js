import React, { Component } from "react";
import { Card, Divider, Label } from 'semantic-ui-react';
import './CanbanCard.css';

class CanbanCard extends Component {


    render() {

        let label = null;

        const cls = (this.props.stage === 1) ? 'todo' : (this.props.stage === 2) ? 'in-progress' : (this.props.stage === 3) ? 'done' : null;

        if (this.props.user) {

            let first = this.props.user.firstname.substring(0, 1);
            let second = this.props.user.lastname.substring(0, 1);
            label = <Label circular className='initials' color='grey' attached='top right'> {first}{second} </Label>
        }

        return (

            <Card className={cls} onClick={this.props.onclick}>
                <Card.Content>
                    <Card.Header className='canban'>Task {this.props.id}</Card.Header>
                    {label}
                    <Divider></Divider>

                    <Card.Meta>{this.props.title}</Card.Meta>

                </Card.Content>
            </Card>
        )
    }
}

export default CanbanCard;