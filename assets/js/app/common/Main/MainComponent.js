import React, { Component, Fragment } from "react";

import MenuContainer from "../Menu/MenuContainer";
import SubMenuContainer from "../Menu/SubMenuContainer";
import './Main.css'
import Header from "./Header";
import Media from 'react-media';
//import Footer from "./Footer";
//import Content from "./Content/Content";

class MainComponent extends Component {


    render() {

        const menuId = this.props.menuId;

        let subMenu = <SubMenuContainer data={this.props} submenuId={this.props.submenuId}></SubMenuContainer>

        if (menuId === 'HOME') { subMenu = null; }

        return (
            <div className="main-container">
                <Header menuId={menuId}
                    open={this.props.open}
                    setOpen={this.props.setOpen}
                />

                <Media queries={{
                    small: "(max-width: 599px)",                            //mobile
                    medium: "(min-width: 600px) and (max-width: 1199px)",   //tablet
                    large: "(min-width: 1200px)"                            //laptop
                }}>
                    {matches => (
                        <Fragment>
                            {(matches.large || matches.medium) &&
                                <div>
                                    <MenuContainer menuId={this.props.menuId} />
                                    {subMenu}
                                </div>}
                            {(matches.small) && (this.props.open === true) &&
                                //na urządzeniach mobilnych menu wyświetlamy tylko gdy użytkownik kliknął hamburgera
                                <div>
                                    <MenuContainer menuId={this.props.menuId} />
                                    {subMenu}
                                </div>}
                        </Fragment>
                    )}
                </Media>

                {/* <Content content={this.props.content} /> content przekazywany w App.js*/}

                {this.props.content}

                {/*<Footer /> */}
            </div>
        )
    }
}

export default MainComponent;