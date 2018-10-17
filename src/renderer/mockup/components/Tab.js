import React from "react";

export class Tab extends React.Component {
  render() {
    return (
      <div className="tab">
        <div className="top-bar">
          <div className="title">
            <h1>{this.props.tabTitle}</h1>
            <p>{this.props.tabDesc}</p>
          </div>
          <div className="top-controls">{this.props.topControls}</div>
        </div>

        <div className="tab-contents">{this.props.tabContents}</div>
      </div>
    );
  }
}

export default Tab;
