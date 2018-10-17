import React from "react";
import Dropdown from "react-dropdown";
import closeWhite from "../img/close_white_24px.svg";

export class Plugins extends React.Component {
  render() {
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

    return (
      <div className="macro-plugin">
        <div className="macro-controls">
          <div className="key-adder">
            <h2>Keys</h2>
            <div className="category-picker dp-menu">
              <p>Key Type</p>
              <Dropdown
                options={typeOptions}
                onChange={this._onSelect}
                value={typeDefault}
                placeholder="Select an option"
              />
            </div>
            <div className="key-selection-container">
              <div className="key-picker dp-menu">
                <p>Key</p>
                <Dropdown
                  options={keyOptions}
                  onChange={this._onSelect}
                  value={keyDefault}
                  placeholder="Select"
                />
              </div>
              <button>Insert</button>
            </div>
          </div>
          <div className="pause-adder">
            <h2>Pauses</h2>
            <div className="pause-adder-controls">
              <div className="pause-length dp-menu">
                <p>Length</p>
                <input type="text" defaultValue="50 ms" />
              </div>
              <button>Insert</button>
            </div>
          </div>
        </div>

        <div className="step-list">
          <h2>Steps</h2>
          <div className="steps">
            <p>
              W<img className="del-step" src={closeWhite} alt="" />
            </p>
            <p>
              800 ms <img className="del-step" src={closeWhite} alt="" />
            </p>
            <p>
              Space
              <img className="del-step" src={closeWhite} alt="" />
            </p>
            <p>
              50 ms
              <img className="del-step" src={closeWhite} alt="" />
            </p>
            <p>
              Space
              <img className="del-step" src={closeWhite} alt="" />
            </p>
            <p>
              50 ms
              <img className="del-step" src={closeWhite} alt="" />
            </p>
            <p>
              S<img className="del-step" src={closeWhite} alt="" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Plugins;
