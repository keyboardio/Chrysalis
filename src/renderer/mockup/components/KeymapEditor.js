import React from "react";
import Dropdown from "react-dropdown";
import dygma from "../img/dygma-raise.svg";

const typeOptions = [
  "Alphanumeric",
  "Modifier",
  "Navigation",
  "Media",
  "Layer",
  "Macro"
];
const typeDefault = typeOptions[0];

const keyOptions = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
const keyDefault = "";

export class KeymapEditor extends React.Component {
  render() {
    return (
      <div className="keymap-editor">
        <div className="controls">
          <h2>Key Menu</h2>
          <div className="category-picker dp-menu">
            <p>Key Type</p>
            <Dropdown
              options={typeOptions}
              onChange={this._onSelect}
              value={typeDefault}
              placeholder="Select an option"
            />
          </div>
          <div className="key-picker dp-menu">
            <p>Key</p>
            <Dropdown
              options={keyOptions}
              onChange={this._onSelect}
              value={keyDefault}
              placeholder="Select a key"
            />
          </div>
        </div>
        <div className="keymap">
          <h2>Keymap</h2>
          <img src={dygma} alt="" />
        </div>
      </div>
    );
  }
}

export default KeymapEditor;
