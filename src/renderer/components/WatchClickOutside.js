import React, { Component } from "react";

export default class WatchClickOutside extends Component {
  constructor(props) {
    super(props);
    this.Ref = null;

    this.setRef = element => {
      this.Ref = element;
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    // remember to remove all events to avoid memory leaks
    document.body.removeEventListener("click", this.handleClick);
  }

  handleClick(event) {
    const { onClickOutside } = this.props; // get click outside callback
    const { target } = event; // get direct click event target

    // if there is no proper callback - no point of checking
    if (typeof onClickOutside !== "function") {
      return;
    }

    // if target is container - container was not clicked outside
    // if container contains clicked target - click was not outside of it
    if (target !== this.Ref && !this.Ref.contains(target)) {
      onClickOutside(event); // clicked outside - fire callback
    }
  }

  render() {
    return <div ref={this.setRef}>{this.props.children}</div>;
  }
}
