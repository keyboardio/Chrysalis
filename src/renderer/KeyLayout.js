// -*- mode: js-jsx -*-

import React from "react";

import Layer from "./Layer";

import { keyCodeTable } from "./keymap-transformer";

import Select from "react-select";
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
    this.filterKeyOption = this.filterKeyOption.bind(this);

    this.keyCodeOptions = keyCodeTable.map(group => {
      return {
        label: group.groupName,
        options: group.keys.map(key => {
          if (key)
            return {
              value: key.code,
              group: group.groupName,
              key: key
            };
        })
      };
    });
  }

  getCurrentKeyCodeOption() {
    if (this.state.currentLayer < 0 || this.state.currentKeyIndex < 0)
      return null;

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex),
      keyCode = this.props.keymap[layer][keyIndex].keyCode;

    for (let group of this.keyCodeOptions) {
      for (let option of group.options) {
        if (option.value == keyCode) return option;
      }
    }
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

  formatKeyLabel(option) {
    let mainLabel, key;

    if (option.data) {
      key = option.data.key;
    } else {
      key = option.key;
    }

    if (key.labels.top) {
      mainLabel = `${key.labels.top}
${key.labels.primary}`;
    } else {
      mainLabel = key.labels.primary;
    }
    return (
      <div>
        <span className="dim">{option.group}</span>
        &nbsp;
        {mainLabel}
      </div>
    );
  }

  fuzzyMatch(s1, s2) {
    var hay = s1.toLowerCase(),
      i = 0,
      n = -1,
      l;
    s2 = s2.toLowerCase();
    for (; (l = s2[i++]); ) {
      if (!~(n = hay.indexOf(l, n + 1))) {
        return false;
      }
    }
    return true;
  }

  filterKeyOption(option, filterString) {
    let label;
    if (option.data.key.labels.top) {
      label = `${option.data.key.labels.top}
 ${option.data.key.labels.primary}`;
    } else {
      label = `${option.data.key.labels.primary}`;
    }

    return this.fuzzyMatch(label, filterString);
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
          New keycode:
          <Select
            className="select-keycode"
            maxMenuHeight={500}
            isDisabled={isReadOnly}
            options={this.keyCodeOptions}
            onChange={this.onChange}
            formatOptionLabel={this.formatKeyLabel}
            filterOption={this.filterKeyOption}
            value={this.getCurrentKeyCodeOption()}
          />
          <button onClick={this.props.onApply}>Save Changes</button>
        </div>
      </div>
    );
  }
}

export default KeyLayout;
