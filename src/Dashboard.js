import React, { Component } from 'react';
  
class Dashboard extends Component {
  
    render() {
        if(this.props.authed === false)
            return <p>Not logged in</p>;
            
      return (
        <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--12-col mdl-typography--text-center">
                <span className="herotext">Dashboard! </span>
            </div>
        </div>
      );
    };

}

export default Dashboard;
