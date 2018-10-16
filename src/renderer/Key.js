import React from "react";

class Key extends React.Component {
  render() {
    let shape,
      stroke = "#b3b3b3";

    if (this.props.active) {
      stroke = "#f3b3b3";
    }

    if (this.props.palmKey) {
      shape = (
        <ellipse
          fill="#ffffff"
          stroke={stroke}
          strokeWidth="2.73"
          cx="610.765"
          cy="953.469"
          rx="75.6"
          ry="56.001"
          transform={this.props.shape}
        />
      );
    } else {
      shape = (
        <path
          fill="#ffffff"
          stroke={stroke}
          strokeWidth="1.55"
          d={this.props.shape}
        />
      );
    }

    let keyIndex = parseInt(this.props.row) * 16 + parseInt(this.props.col);

    let extraLabel;
    if (this.props.extraLabelTransform && this.props.label.extraLabel) {
      extraLabel = (
        <g transform={this.props.extraLabelTransform}>
          <text x={this.props.x} y={this.props.y - 3} className="extraKey">
            {this.props.label.extraLabel}
          </text>
        </g>
      );
    }

    return (
      <g
        onClick={this.props.onClick}
        className="key"
        data-key-index={keyIndex}
        data-layer={this.props.layer}
      >
        {shape}
        <g transform={this.props.primaryLabelTransform}>
          <text x={this.props.x} y={this.props.y}>
            {this.props.label.label}
          </text>
        </g>
        {extraLabel}
      </g>
    );
  }
}

export default Key;
