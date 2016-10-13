import React, { Component } from 'react';

class SetDivider extends Component {

  renderThickBar() {
    return(
      <div className="mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell--top mdl-cell--12-col topbar"></div>
      </div>
    );
  }

  renderThinBar() {
    return(
      <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell--top mdl-cell--12-col divider"></div>
        </div>
    );
  }

  render() {
    if(this.props.thick === true)
      return this.renderThickBar();
    else
      return this.renderThinBar();
  }
}

export default SetDivider;
