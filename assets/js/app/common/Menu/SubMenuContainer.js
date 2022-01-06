import React, { Component } from "react";
import { connect } from 'react-redux';

import SubMenuComponent from "./SubMenuComponent";
import { setSubMenu, setActiveSubMenuItemId } from "../Menu/Menu";
import { setMenuOpenFlag } from "../Menu/Menu";


class SubMenuContainer extends Component {

    componentDidMount() {

        /*  const menu = setSubMenu(this.props.data.menuId);
          const subMenuItemId = menu.subMenu[0].id;
          this.props.setActiveSubMenuItemId(subMenuItemId); */

    }


    handleSubMenuItemClick = (subMenuItemId) => {

        this.props.setActiveSubMenuItemId(subMenuItemId);
        this.props.setMenuOpenFlag(false);
    }

    menu = setSubMenu(this.props.data.menuId);

    render() {

        return (
            <SubMenuComponent
                submenu={this.menu}
                handleSubMenuItemClick={this.handleSubMenuItemClick}
                activeSubMenuItem={this.props.submenuId}

            >
            </SubMenuComponent>
        )
    }
}

const mapStateToProps = state => ({
    menu: state.menu
})

const mapDispatchToProps = dispatch => ({
    setActiveSubMenuItemId: (id) => dispatch(setActiveSubMenuItemId(id)),
    setMenuOpenFlag: (isOpen) => dispatch(setMenuOpenFlag(isOpen))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubMenuContainer); 