import React from "react";
import Dropdown from "react-dropdown";
import deleteWhite from "../img/delete_white_24px.svg";

export class PluginPicker extends React.Component {
  render() {
    const macroOptions = ["My Macro", "↳ New"];
    const macroDefault = macroOptions[0];
    const options = ["Macros", "Tap Dance"];
    const defaultOption = options[0];
    return (
      <div className="layer-controls">
        <img className="del-macro" src={deleteWhite} alt="" />
        <div className="layer-select dp-menu macro-select">
          <p>Macro</p>
          <Dropdown
            options={macroOptions}
            onChange={this._onSelect}
            value={macroDefault}
            placeholder="Select an option"
          />
        </div>
        <div className="layer-name dp-menu macro-name">
          <p>Macro Name</p>
          <input type="text" defaultValue="My Macro" />
        </div>

        <div className="plugin-controls">
          <div className="plugin-select dp-menu">
            <p>Plugin</p>
            <Dropdown
              options={options}
              onChange={this._onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PluginPicker;
