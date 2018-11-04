// -*- mode: js-jsx -*-

import React from "react";
import Select from "react-select";

import Layer from "./Layer";
import KeySelector from "./KeySelector";

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

  onChange(option) {
    this.props.onKeyChange(
      this.state.currentLayer,
      this.state.currentKeyIndex,
      option.value
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
      isReadOnly = layerIndex < this.props.roLayers,
      layerData = this.props.keymap[layerIndex],
      layer = (
        <Layer
          readOnly={isReadOnly}
          index={layerIndex}
          keymap={layerData}
          onKeyChange={this.props.onKeyChange}
          onKeySelect={this.onKeySelect}
          selectedKey={this.state.currentKeyIndex}
        />
      );

    let roLayerOptions = {
        label: "Read-only",
        options: []
      },
      rwLayerOptions = {
        label: "Read-write",
        options: []
      };

    let defaultLayerOptions = this.props.keymap.map((layer, index) => {
      if (index < this.props.roLayers) {
        roLayerOptions.options.push({
          value: index,
          label: "Layer #" + index.toString()
        });
      } else {
        rwLayerOptions.options.push({
          value: index,
          label: "Layer #" + index.toString()
        });
      }
      return { value: index, label: "Layer #" + index.toString() };
    });
    let editLayerOptions = [roLayerOptions, rwLayerOptions];
    let defaultEditLayer;

    if (this.props.roLayers > 0) {
      defaultEditLayer = roLayerOptions.options[0];
    } else {
      defaultEditLayer = rwLayerOptions.options[0];
    }

    return (
      <div id="keymap-editor">
        {layer}
        <div id="editor-controls">
          <div className="layer-selection">
            <label>Layer</label>
            <Select
              options={editLayerOptions}
              defaultValue={defaultEditLayer}
              onChange={this.selectLayer}
            />

            <label>Default layer</label>
            <Select
              options={defaultLayerOptions}
              defaultValue={defaultLayerOptions[this.props.defaultLayer]}
              onChange={this.props.onSelectDefaultLayer}
            />
          </div>
          <button onClick={this.props.onApply}>Save Changes</button>
          <hr />
          <KeySelector
            className="select-keycode"
            isDisabled={isReadOnly}
            onChange={this.onChange}
            currentKeyCode={this.getCurrentKey()}
          />
        </div>
      </div>
    );
  }
}

export default KeyLayout;
