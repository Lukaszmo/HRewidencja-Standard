import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Menu, Dropdown } from 'semantic-ui-react';
import './Menu.css'


export default class SubMenuComponent extends Component {

    handleItemClick = (e, { name }) => {

        this.props.handleSubMenuItemClick(name);
    }

    render() {

        const menu = this.props.submenu;

        return (

            < Menu fixed="left" className="submenu" vertical>
                <div className="submenu-list">
                    {menu.subMenu.map((element, index) => {

                        let active = false;
                        if (element.id === this.props.activeSubMenuItem) { active = true; }

                        if (element.type === 'DROPDOWN') {

                            return (
                                <Dropdown
                                    as={Menu.Item}
                                    text={element.name}
                                    name={element.id}
                                    key={element.id}
                                    pointing="left"
                                    className="submenu-item"
                                    active={active}
                                    onClick={this.handleItemClick}>
                                    <Dropdown.Menu >
                                        {element.dropdownItems.map((element, index) => {
                                            return <Dropdown.Item
                                                as={Link}
                                                to={element.redirect}
                                                name={element.id}
                                                key={index}>
                                                {element.name}
                                            </Dropdown.Item>
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                        }

                        if (element.type === 'MENU_ITEM') {

                            return (
                                <Menu.Item
                                    as={Link}
                                    to={element.redirect}
                                    name={element.id}
                                    key={index}
                                    className="submenu-item"
                                    active={active}
                                    onClick={this.handleItemClick}>
                                    {element.name}
                                </Menu.Item>
                            )
                        }
                    })}
                </div>

            </Menu >
        )
    }
}