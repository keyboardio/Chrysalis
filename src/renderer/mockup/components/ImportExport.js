import React, { Component } from "react";
import Dropdown from "react-dropdown";
export class ImportExport extends Component {
  render() {
    const options = ["settings.xml"];
    const defaultOption = options[0];
    return (
      <div className="import-export">
        <div className="save-settings dp-menu">
          <p>Save Settings</p>
          <input type="text" defaultValue="settings.xml" />
          <button>Save</button>
        </div>

        <div className="load-settings dp-menu">
          <p>Load Settings</p>

          <div className="load-selector">
            <Dropdown
              options={options}
              onChange={this._onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
          <button>Load</button>
        </div>
      </div>
    );
  }
}

export default ImportExport;
