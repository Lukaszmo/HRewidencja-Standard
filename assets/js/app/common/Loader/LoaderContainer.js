import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

class LoaderContainer extends Component {

    render() {
        return (
            <div>
                <Dimmer active={this.props.loader.loading} inverted>
                    <Loader inline='centered' indeterminate content={this.props.loader.communique} />
                </Dimmer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loader: state.loader
})

export default connect(mapStateToProps)(LoaderContainer);