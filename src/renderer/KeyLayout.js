import React from "react";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import Layer from "./Layer";

class KeyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLayer: -1,
      currentKeyIndex: -1
    };

    this.onChange = this.onChange.bind(this);
    this.getCurrentKey = this.getCurrentKey.bind(this);
    this.onKeySelect = this.onKeySelect.bind(this);
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

  render() {
    let layers = this.props.keymap.map((layer, index) => {
      let layerKey = "layer-" + index.toString(),
        layerName = "Layer #" + index.toString();
      return (
        <TabPane tab={layerName} key={layerKey}>
          <Layer
            index={index}
            keymap={layer}
            onKeyChange={this.props.onKeyChange}
            onKeySelect={this.onKeySelect}
            selectedKey={this.state.currentKeyIndex}
          />
        </TabPane>
      );
    });

    if (layers.length > 0) {
      return (
        <div>
          <Tabs
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            {layers}
          </Tabs>
          <hr />
          New keycode:{" "}
          <input
            type="text"
            value={this.getCurrentKey()}
            onChange={this.onChange}
          />
          <br />
          <button onClick={this.props.onApply}>Apply</button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default KeyLayout;
