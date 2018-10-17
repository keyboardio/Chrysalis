import React, { Component } from "react";
import TabButton from "./TabButton";
// import App from "./App";
import dygmaLogo from "../img/dygma-logo.svg";
import keyboardWhite from "../img/ic_keyboard_white_24px.svg";
import colorLens from "../img/ic_color_lens_white_24px.svg";
import settingsInput from "../img/ic_settings_input_composite_white_24px.svg";
import updateWhite from "../img/ic_update_white_24px.svg";
import importExportWhite from "../img/ic_import_export_white_24px.svg";

export class TabBar extends Component {
  render() {
    const activeTab = this.props.activeTab;
    function isActive(tab) {
      return activeTab === tab;
    }

    return (
      <div className="tabBar">
        <div className="logo">
          <img src={dygmaLogo} alt="" />
        </div>
        <TabButton
          image={keyboardWhite}
          active={isActive("keymap")}
          activateTab={this.props.activateTab}
          name="keymap"
        />
        <TabButton
          image={colorLens}
          active={isActive("led")}
          activateTab={this.props.activateTab}
          name="led"
        />
        <TabButton
          image={settingsInput}
          active={isActive("plugins")}
          activateTab={this.props.activateTab}
          name="plugins"
        />
        <TabButton
          image={updateWhite}
          active={isActive("update")}
          activateTab={this.props.activateTab}
          name="update"
        />
        <TabButton
          image={importExportWhite}
          active={isActive("import-export")}
          activateTab={this.props.activateTab}
          name="import-export"
        />
      </div>
    );
  }
}

export default TabBar;
