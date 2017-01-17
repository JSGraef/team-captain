import React, { Component } from 'react';

class MRSwimmer extends Component {

    render() {
        return (
            <div>
                {this.props.routeParams.swimmerid}
            </div>
        );
    }
}

export default MRSwimmer;