import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Icon, Menu } from 'semantic-ui-react';
import { checkMenuAccess } from "../../utils/AuthService";
import './Menu.css';


export default class MenuComponent extends Component {


    handleItemClick = (e, { name }) => {

        this.props.handleMenuItemClick(name);
    }

    render() {

        const menu = this.props.menu;

        return (

            < Menu fixed="left" className="main-menu" >
                <div className="menu-list">

                    {menu.map((element, index) => {

                        let active = false;
                        if (element.id === this.props.activeMenuItem) { active = true; }

                        if (checkMenuAccess(element.id) === true) {

                            return (
                                <Menu.Item
                                    as={Link}
                                    to={element.redirect}
                                    name={element.id}
                                    key={index}
                                    className={element.className}
                                    active={active}
                                    onClick={this.handleItemClick}
                                    id={element.id}>
                                    <Icon name={element.icon}></Icon>
                                    &nbsp;&nbsp; {element.name}
                                </Menu.Item>

                            )
                        }
                        else return null;
                    })}

                </div>
            </Menu >

        )

    }
}


//export default MenuComponent;