// -*- mode: js-jsx -*-

import React from "react";

import Layer from "./Layer";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class KeyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLayer: 0,
      currentKeyIndex: -1
    };

    this.onChange = this.onChange.bind(this);
    this.getCurrentKey = this.getCurrentKey.bind(this);
    this.onKeySelect = this.onKeySelect.bind(this);
    this.selectLayer = this.selectLayer.bind(this);
  }

  getCurrentKey() {
    if (this.state.currentLayer < 0 || this.state.currentKeyIndex < 0)
      return "";

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex);

    return this.props.keymap[layer][keyIndex].keyCode;
  }

  onChange(event) {
    event.preventDefault();
    this.props.onKeyChange(
      this.state.currentLayer,
      this.state.currentKeyIndex,
      event.target.value
    );
  }

  onKeySelect(event) {
    event.preventDefault();
    let layer = event.currentTarget.getAttribute("data-layer"),
      keyIndex = event.currentTarget.getAttribute("data-key-index");
    this.setState({
      currentLayer: layer,
      currentKeyIndex: keyIndex
    });
  }

  selectLayer(option) {
    this.setState({
      currentLayer: option.value,
      currentKeyIndex: -1
    });
  }

  render() {
    if (this.props.keymap.length == 0) return null;

    let layerIndex = this.state.currentLayer,
      layerData = this.props.keymap[layerIndex],
      layer = (
        <Layer
          index={layerIndex}
          keymap={layerData}
          onKeyChange={this.props.onKeyChange}
          onKeySelect={this.onKeySelect}
          selectedKey={this.state.currentKeyIndex}
        />
      );

    let options = this.props.keymap.map((layer, index) => {
      return { value: index, label: "Layer #" + index.toString() };
    });

    return (
      <div>
        <h1>Layer #{this.state.currentLayer}</h1>
        {layer}
        <hr />
        New keycode:{" "}
        <input
          type="text"
          value={this.getCurrentKey()}
          onChange={this.onChange}
        />
        <br />
        <button onClick={this.props.onApply}>Apply</button>
        <br />
        <Dropdown
          options={options}
          onChange={this.selectLayer}
          value={options[this.state.currentLayer]}
        />
      </div>
    );
  }
}

export default KeyLayout;
