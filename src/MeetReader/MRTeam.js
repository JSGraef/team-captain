import React, { Component } from 'react';

class MRTeam extends Component {

    render() {
        return (
            <div>
                {this.props.routeParams.teamid}
            </div>
        );
    }
}

export default MRTeam;