import React from "react";
import Dropdown from "react-dropdown";

export class LayerControls extends React.Component {
  render() {
    const options = ["1 | Default", "2 | Macros", "3 | Media", "4"];
    const defaultOption = options[0];
    return (
      <div className="layer-controls">
        <div className="layer-select dp-menu">
          <p>Editing Layer</p>
          <Dropdown
            options={options}
            onChange={this._onSelect}
            value={defaultOption}
            placeholder="Select an option"
          />
        </div>
        <div className="layer-name dp-menu">
          <p>Layer Name</p>
          <input type="text" defaultValue="Default" />
        </div>
      </div>
    );
  }
}

export default LayerControls;
