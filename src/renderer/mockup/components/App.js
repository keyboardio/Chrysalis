import React from "react";
import TabBar from "./TabBar";
import Tab from "./Tab";
import LedEditor from "./LedEditor";
import LayerControls from "./LayerControls";
import Plugins from "./Plugins";
import PluginPicker from "./PluginPicker";
import Update from "./Update";
import ImportExport from "./ImportExport";
import { KeymapEditor } from "./KeymapEditor";

class App extends React.Component {
  state = {
    activeTab: "keymap"
  };

  activateTab = tab => {
    let activeTab = { ...this.state.activeTab };
    activeTab = tab;
    this.setState({ activeTab: activeTab });
  };

  render() {
    let topControls, tabContents, tabTitle, tabDesc;

    if (this.state.activeTab === "led") {
      topControls = <LayerControls />;
    }

    switch (this.state.activeTab) {
      case "keymap":
        topControls = <LayerControls />;
        tabContents = <KeymapEditor />;
        tabTitle = "Keymap Editor";
        tabDesc = "Keyboard layout configuration";
        break;
      case "led":
        topControls = <LayerControls />;
        tabContents = <LedEditor />;
        tabTitle = "LED Editor";
        tabDesc = "LED layout configuration";
        break;
      case "plugins":
        topControls = <PluginPicker />;
        tabContents = <Plugins />;
        tabTitle = "Plugins";
        tabDesc = "Add advanced functionality";
        break;
      case "update":
        topControls = null;
        tabContents = <Update />;
        tabTitle = "Update";
        tabDesc = "Install the latest firmware";
        break;
      case "import-export":
        topControls = null;
        tabContents = <ImportExport />;
        tabTitle = "Import & Export";
        tabDesc = "Save and load your settings";
        break;
    }

    return (
      <div className="window">
        <TabBar
          activeTab={this.state.activeTab}
          activateTab={this.activateTab}
        />
        <Tab
          topControls={topControls}
          tabContents={tabContents}
          tabTitle={tabTitle}
          tabDesc={tabDesc}
        />
      </div>
    );
  }
}

export default App;
