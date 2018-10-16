import React from "react";
import { ChromePicker, GithubPicker } from "react-color";
import dygma from "../img/dygma-raise.svg";

export class LedEditor extends React.Component {
  render() {
    const col = [
      "#FF6900",
      "#FCB900",
      "#7BDCB4",
      "#00D084",
      "#8ED1FC",
      "#0693E3",
      "#ABB8C3",
      "#EB144C",
      "#F78DA7",
      "#9900EF",
      "#7BDCB5",
      "#FCB901"
    ];

    return (
      <div className="keymap-editor">
        <div className="controls">
          <h2>Color Picker</h2>
          <div className="colour-picker">
            <ChromePicker disableAlpha={true} />
          </div>
          <div className="colour-history">
            <GithubPicker triangle="hide" width="162px" colors={col} />
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

export default LedEditor;
