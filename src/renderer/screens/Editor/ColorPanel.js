import React, { Component, Fragment } from "react";
import { SketchPicker } from "react-color";
import Styled from "styled-components";
// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// Icons
import { CgSmartHomeLight, CgColorPicker } from "react-icons/cg";

const toolsWidth = 45;

const Styles = Styled.div`
  .color-editor {
    width: ${toolsWidth * 4}px;
    float: left;
    margin-left: 0.5em;
    margin-top: 525px;
    position: absolute;
    padding: 0;
    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
    svg {
      vertical-align: initial;
    }
    .colors {
      margin: 0;
      padding-top: 20px;
      justify-content: center;
      .color-button {
        width: 22.5%;
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
          box-shadow: 0px 0px 3px 5px ${({ theme }) =>
            theme.colors.button.active};
        }
        .color:hover {
          box-shadow: 0px 0px 4px 3px ${({ theme }) =>
            theme.colors.button.hover};
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
        width: 30%;
        border: 0px;
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
`;

export default class ColorPanel extends Component {
  constructor(props) {
    super(props);
    console.log(props);

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

  CButton(text, func, icon, disable) {
    const id = `tooltip-${text}`;

    return (
      <OverlayTrigger
        overlay={<Tooltip id={id}>{text}</Tooltip>}
        placement="bottom"
      >
        <Button disabled={disable} onClick={func}>
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
  }

  showColorPicker(event) {
    this.setState(state => {
      return { displayColorPicker: !state.displayColorPicker };
    });
  }

  render() {
    const {
      colors,
      selected,
      toChangeAllKeysColor,
      onBacklightColorSelect
    } = this.props;
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
            <div
              key={colors[idx]}
              className={`color ${selected === idx ? "actv" : ""}`}
              style={buttonStyle}
            />
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
          false
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
          false
        )}
      </>
    );

    const edit = (
      <>
        {this.CButton(
          "Edit current color",
          this.showColorPicker,
          <CgColorPicker />,
          false
        )}
      </>
    );

    const popover = {
      position: "fixed",
      zIndex: "20",
      left: "280px"
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
              <div
                style={cover}
                onClick={this.showColorPicker}
                aria-hidden="true"
              />
              <SketchPicker
                color={colors[selected]}
                onChange={this.handleChange}
              />
            </div>
          ) : null}
          <Row className="colors">{layerButtons}</Row>
          <Row className="color-options">
            {edit}
            {under}
            {backl}
          </Row>
        </Container>
      </Styles>
    );
  }
}
