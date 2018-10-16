import React from "react";
import { CustomPicker } from "react-color";

class MyColorPicker extends React.Component {
  render() {
    const { Saturation } = require("react-color/lib/components/common");
    return <Saturation {...this.props} onChange={this.handleChange} />;
  }
}

export default CustomPicker(MyColorPicker);
