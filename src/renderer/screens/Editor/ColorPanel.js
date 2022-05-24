import React, { Component, Fragment } from "react";
import { SketchPicker } from "react-color";
import Styled from "styled-components";
// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// Icons
import { CgSmartHomeLight, CgColorPicker } from "react-icons/cg";

const toolsWidth = 45;

const Styles = Styled.div`
width: 100%;
bottom: 10px;
position: relative;
align-self: flex-end!important;
  .color-editor {
    width: 400px;
    bottom: 10px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    position: fixed;
    z-index: 2;
    padding: 0;
    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%);
    svg {
      vertical-align: initial;
    }
    .colors {
      margin: 0;
      padding: 5px;
      justify-content: center;
      .color-button {
        width: 12%;
        padding: 5px 0px;
        border-radius: 0px;
        color: ${({ theme }) => theme.colors.button.text};
        background-color: ${({ theme }) => theme.card.background};
        border: 0px;
        font-size: larger;
        text-align: -webkit-center;
        box-shadow: none;

        .color {
          height: 28px;
          width: 28px;
          border-radius: 4px;
          border: 0px solid ${({ theme }) => theme.card.background};
          box-shadow: 2px 2px 4px 1px darkgrey;
        }
        .color.actv{
          box-shadow: 0px 0px 3px 5px ${({ theme }) => theme.colors.button.active};
        }
        .color:hover {
          box-shadow: 0px 0px 4px 3px ${({ theme }) => theme.colors.button.hover};
        }
        .color:focus {
          height: 28px;
          width: 28px;
          border-radius: 4px;
          border: 3px solid black;
        }
      }
      .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: none;
      }
    }
    .color-options {
      margin: 0;
      justify-content: center;
      padding: 6px 0px;
      button {
        border: none;
        font-size: large;
        color: ${({ theme }) => theme.colors.button.text};
        background-color: transparent;
      }
      button:hover {
        background-color: ${({ theme }) => theme.colors.button.disabled};
      }
      button:focus {
        background-color: ${({ theme }) => theme.colors.button.background};
        color: ${({ theme }) => theme.colors.button.text};
        box-shadow: none;
      }
      button:active {
        background-color: grey !important;
        box-shadow: none !important;
      }
      .btn-primary:not(:disabled):not(.disabled).active {
        background-color: ${({ theme }) => theme.colors.button.background};
        color: ${({ theme }) => theme.colors.button.text};
        box-shadow: none !important;
      }
    }
  }
  .first {
    padding-top: 30px;
  }
  .last {
    padding-left: 5px;
  }
  .colorpick {
    padding: 28px 8px;
    margin-left: 4px;
    margin-top: 4px;
  }
  .otherbutts {
    padding: 6px 8px;
    margin-left: -4px;
  }
`;

export default class ColorPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false
    };

    this.showColorPicker = this.showColorPicker.bind(this);
    this.selectColor = this.selectColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.spare = this.spare.bind(this);
  }

  handleChange(color) {
    const { selected, onColorPick } = this.props;
    console.log(selected, color);
    onColorPick(selected, color.rgb.r, color.rgb.g, color.rgb.b);
  }

  CButton(text, func, icon, disable, classes) {
    const id = `tooltip-${text}`;

    return (
      <OverlayTrigger rootClose overlay={<Tooltip id={id}>{text}</Tooltip>} placement="top">
        <Button disabled={disable} onClick={func} className={classes}>
          {icon}
        </Button>
      </OverlayTrigger>
    );
  }

  spare() {
    const { colors } = this.props;
  }

  selectColor(ev, pick) {
    const { colors, selected, onColorSelect } = this.props;
    console.log(colors[pick], pick, selected);
    onColorSelect(pick);
    if (pick === selected) {
      // setIndexFocusButton(!indexFocusButton);
      this.props.onColorButtonSelect("one_button_click", pick);
      return;
    }
    this.props.onColorButtonSelect("another_button_click", pick);
    // setIndexFocusButton(index);
    // setColorFocusButton(setColorTamplate(color));
  }

  showColorPicker(event) {
    this.setState(state => {
      return { displayColorPicker: !state.displayColorPicker };
    });
  }

  render() {
    const { colors, selected, toChangeAllKeysColor, onBacklightColorSelect, onColorButtonSelect } = this.props;
    const { displayColorPicker } = this.state;

    const layerButtons = colors.map((data, idx) => {
      const menuKey = `color-${idx.toString()}-${colors[idx].rgb.toString()}`;
      const buttonStyle = {
        backgroundColor: data.rgb
      };
      return (
        <Button
          key={menuKey}
          onClick={ev => {
            this.selectColor(ev, idx);
          }}
          className="color-button"
          data-id={data.rgb}
        >
          <div className="button-content">
            <div key={colors[idx]} className={`color ${selected === idx ? "actv" : ""}`} style={buttonStyle} />
          </div>
        </Button>
      );
    });

    const iconStyles = { transform: "rotate(180deg)" };

    const under = (
      <>
        {this.CButton(
          "Apply color to Underglow",
          () => {
            toChangeAllKeysColor(selected, 69, 142);
          },
          <CgSmartHomeLight />,
          selected != undefined ? false : true,
          "last otherbutts"
        )}
      </>
    );

    const backl = (
      <>
        {this.CButton(
          "Apply color to Backlight",
          () => {
            toChangeAllKeysColor(selected, 0, 69);
          },
          <CgSmartHomeLight style={iconStyles} />,
          selected != undefined ? false : true,
          "last otherbutts"
        )}
      </>
    );

    const edit = <>{this.CButton("Edit current color", this.showColorPicker, <CgColorPicker />, false, "first colorpick")}</>;

    const popover = {
      position: "absolute",
      bottom: "120px"
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };

    return (
      <Styles>
        <Container fluid className="color-editor">
          {displayColorPicker ? (
            <div style={popover}>
              <div style={cover} onClick={this.showColorPicker} aria-hidden="true" />
              <SketchPicker color={colors[selected]} onChange={this.handleChange} />
            </div>
          ) : null}
          <Row className="m-0">
            <Col xs={1} className="color-options">
              {edit}
            </Col>
            <Col xs={10} className="colors">
              {layerButtons}
            </Col>
            <Col xs={1} className="color-options">
              {under}
              {backl}
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
