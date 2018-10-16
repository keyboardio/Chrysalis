import React, { Component } from "react";

export class TabButton extends Component {
  render() {
    const img = this.props.image;
    const isActive = this.props.active;
    const name = this.props.name;

    const active = isActive ? "active" : "";
    return (
      <div className="item" onClick={() => this.props.activateTab(name)}>
        <img src={img} alt="" />
        <div className={`overlay ${active}`} />
      </div>
    );
  }
}

export default TabButton;
