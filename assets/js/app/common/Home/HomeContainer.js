import React, { Component } from "react";
import { connect } from 'react-redux';
import HomeComponent from "./HomeComponent";

class HomeContainer extends Component {


    render() {

        return (
            <HomeComponent
                user={this.props.user}
                accessList={this.props.user.accessItems}
            />
        )
    }
}

//pobiera stan ze store i przekazuje do komponentu
const mapStateToProps = state => ({
    user: state.loggedUser,

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);

