/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled, { withTheme } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { RiStopFill } from "react-icons/ri";
import { IoIosPause, IoIosPlay, IoIosShuffle } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { CgToggleOff } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";
import { ImTab } from "react-icons/im";
import { BsFillBrightnessAltLowFill, BsShift, BsBackspace } from "react-icons/bs";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp, FaLinux } from "react-icons/fa";
import {
  BiArrowFromBottom,
  BiArrowFromLeft,
  BiArrowFromRight,
  BiArrowFromTop,
  BiDownArrowCircle,
  BiLeftArrowCircle,
  BiMouseAlt,
  BiRightArrowCircle,
  BiUpArrowCircle
} from "react-icons/bi";
import {
  AiFillForward,
  AiFillWindows,
  AiFillApple,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineBackward,
  AiOutlineForward
} from "react-icons/ai";
import { MdKeyboardReturn, MdSpaceBar, MdKeyboardCapslock, MdInfoOutline, MdEject } from "react-icons/md";

import Key from "./Key";
import ES from "./ES.json";
import ENi from "./ENi.json";
import ENa from "./ENa.json";
import GR from "./GR.json";
import FR from "./FR.json";
import SW from "./SW.json";
import DN from "./DN.json";
import NW from "./NW.json";
import IC from "./IC.json";

const Style = Styled.div`
.keyboard {
  margin: 0;
  padding: 16px;
  .keys {
    margin: 0;
    padding: 0;
    justify-content:center;
  }
  .bigger {
    font-size: 1.3rem;
  }
  .biggerWin {
    font-size: 1.2rem;
  }
  .biggerApple {
    font-size: 1.3rem;
  }
  .biggerLinux {
    font-size: 1.3rem;
  }
}
.svgStyle {
    overflow: visible;
    max-width:1170px; 
    min-width: 860px;
}
`;
const IconColor = Styled.span`
    color: ${props => props.color};
`;
const TooltipStyle = Styled.div`
text-align: left;
.ttip-p {
  margin: 0;
}
.ttip-h {
  margin: 0;
  font-size: 1.3em;
}
`;

class KeyPicker extends Component {
  constructor(props) {
    super(props);

    // this.state = { selected: 0 };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = keycode => {
    const { onKeySelect } = this.props;
    console.log("onKeyPress: ", keycode);
    onKeySelect(keycode);
  };

  renderTooltip(tooltips) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <TooltipStyle>
          {tooltips.map((tip, i) => {
            return (
              <React.Fragment key={`Tip-${i}`}>
                {i % 2 == 1 || !isNaN(tip[0]) || tip[0] == "-" ? (
                  <p className="ttip-p">{tip}</p>
                ) : (
                  <React.Fragment>
                    {i == 0 ? "" : <br></br>}
                    <h5 className="ttip-h">{tip}</h5>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </TooltipStyle>
      </Tooltip>
    );
  }

  render() {
    const { code, disableMods, disableMove, disableAll, selectedlanguage, kbtype } = this.props;
    const liso = {
      english: ENi,
      spanish: ES,
      german: GR,
      french: FR,
      swedish: SW,
      danish: DN,
      norwegian: NW,
      icelandic: IC
    };
    const lansi = { english: ENa };
    let Lang = ENa;
    //TODO: quitar este comentario para que vuelva a funcionar el idioma seleccionado
    // if (selectedlanguage == "english") {
    //   if (kbtype == "ansi") {
    //     if (lansi[selectedlanguage] != undefined) {
    //       Lang = lansi[selectedlanguage];
    //     }
    //   } else {
    //     Lang = liso[selectedlanguage];
    //   }
    // } else {
    //   if (selectedlanguage != "") {
    //     if (liso[selectedlanguage] != undefined) Lang = liso[selectedlanguage];
    //   }
    // }
    const os = process.platform;
    const iconlist = {
      Backspace: <BsBackspace />,
      Enter: <MdKeyboardReturn />,
      Space: <MdSpaceBar />,
      CapsLock: <MdKeyboardCapslock />,
      Tab: <ImTab />,
      Shift: <BsShift />,
      App: <FiMenu />,
      Win:
        os === "win32" ? (
          <AiFillWindows className="biggerWin" />
        ) : os === "darwin" ? (
          <AiFillApple className="biggerApple" />
        ) : (
          <FaLinux className="biggerLinux" />
        ),
      ArrUp: <AiOutlineArrowUp className="bigger" />,
      ArrDwn: <AiOutlineArrowDown className="bigger" />,
      ArrLeft: <AiOutlineArrowLeft className="bigger" />,
      ArrRight: <AiOutlineArrowRight className="bigger" />,
      LDToggl: (
        <React.Fragment>
          <BsFillBrightnessAltLowFill className="bigger" />
          <CgToggleOff className="" />
        </React.Fragment>
      ),
      LDForward: (
        <React.Fragment>
          <BsFillBrightnessAltLowFill className="bigger" />
          <AiOutlineForward className="" />
        </React.Fragment>
      ),
      VolAdd: <FaVolumeUp className="bigger" />,
      VolSub: <FaVolumeDown className="bigger" />,
      VolMute: <FaVolumeMute className="bigger" />,
      Pause: <IoIosPause className="bigger" />,
      Play: <IoIosPlay className="bigger" />,
      Stop: <RiStopFill className="bigger" />,
      Eject: <MdEject className="bigger" />,
      Shuffle: <IoIosShuffle className="bigger" />,
      Forward: <AiFillForward className="bigger" />,
      Backward: <AiOutlineBackward className="bigger" />,
      Cancel: <TiCancel className="bigger" />,
      ScrlUp: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiArrowFromBottom className="" />
        </React.Fragment>
      ),
      ScrlDwn: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiArrowFromTop className="" />
        </React.Fragment>
      ),
      ScrlLeft: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiArrowFromRight className="" />
        </React.Fragment>
      ),
      ScrlRight: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiArrowFromLeft className="" />
        </React.Fragment>
      ),
      MvUp: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiUpArrowCircle className="" />
        </React.Fragment>
      ),
      MvDwn: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiDownArrowCircle className="" />
        </React.Fragment>
      ),
      MvLeft: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiLeftArrowCircle className="" />
        </React.Fragment>
      ),
      MvRight: (
        <React.Fragment>
          <BiMouseAlt className="bigger" />
          <BiRightArrowCircle className="" />
        </React.Fragment>
      )
    };
    const keyboard = Lang.map((key, id) => {
      if (key.tooltip) {
        return (
          <foreignObject key={`id-${key.content.first}-${id}`} x={key.x} y={key.y} width={25} height={25}>
            <OverlayTrigger rootClose placement="top" delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip(key.tooltip)}>
              <MdInfoOutline className={"info"} />
            </OverlayTrigger>
          </foreignObject>
        );
      }
      return (
        <Key
          key={`id-${key.content.first}-${id}`}
          id={id}
          x={key.x}
          y={key.y}
          selected={
            code === null
              ? false
              : Array.isArray(key.idArray)
              ? key.idArray.some(key => key === code.base + code.modified || (key === code.base && key >= 104 && key <= 115))
              : code.base === key.id &&
                (code.base + code.modified < 53267 || code.base + code.modified > 60000) &&
                (code.base + code.modified < 17450 || code.base + code.modified > 17501) &&
                (code.base + code.modified < 49153 || code.base + code.modified > 49168)
              ? true
              : code.modified > 0 && code.base + code.modified === key.id
              ? true
              : false
          }
          clicked={() => {
            key.mod == disableMods || key.move == disableMove ? {} : this.onKeyPress(key.id);
          }}
          onKeyPress={this.onKeyPress}
          centered={key.centered}
          content={key.content}
          iconpresent={key.icon}
          icon={
            <IconColor
              color={
                key.mod == disableMods || key.move == disableMove
                  ? this.props.theme.keyboardPicker.keyTextDisabledColor
                  : this.props.theme.keyboardPicker.keyIconColor
              }
            >
              {iconlist[key.iconname]}
            </IconColor>
          }
          iconx={key.iconx}
          icony={key.icony}
          iconsize={key.iconsize}
          disabled={key.mod == disableMods || key.move == disableMove || disableAll}
          idArray={key.idArray}
          keyCode={code}
        />
      );
    });
    return (
      <Style>
        <Container fluid className="keyboard">
          <Row className="keys">
            <svg className="svgStyle" viewBox="0 0 1070 260" preserveAspectRatio="xMidYMin slice">
              {keyboard}
              <defs>
                <linearGradient id={`paint_gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="5%" stopColor="#fff" />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
                <filter id={`filter0_d_2211_181319`} x="0" y="0" width="200%" height="200%">
                  <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2" />
                  <feColorMatrix
                    result="matrixOut"
                    in="offOut"
                    type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
                  />
                  <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                  <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
              </defs>
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}

export default withTheme(KeyPicker);
