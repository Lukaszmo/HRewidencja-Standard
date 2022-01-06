import React, { Component } from "react";
import { Icon } from 'semantic-ui-react';
import './Burger.css';

class Burger extends Component {



    render() {

        const icon = (this.props.open === false) ? 'bars' : 'angle up';

        return (

            <div className="burger" onClick={this.props.setOpen} >
                <Icon name={icon} size='big' className='menu-button'></Icon>
            </ div>
        )
    }
}

export default Burger;