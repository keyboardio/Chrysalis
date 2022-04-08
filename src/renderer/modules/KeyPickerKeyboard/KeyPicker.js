/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled, { withTheme } from "styled-components";

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

import { ButtonConfig } from "../../component/Button";
import { SelectMacro } from "../../component/Select";
import { SelectLayersLock } from "../../component/Select";

import {
  IconNote,
  IconLEDSwitchLeft,
  IconLEDNextEffect,
  IconLEDPreviousEffect,
  IconMediaForward,
  IconMediaPlayPause,
  IconMediaRewind,
  IconMediaShuffle,
  IconMediaSoundLess,
  IconMediaSoundMore,
  IconMediaSoundMute,
  IconMediaStop,
  IconToolsCalculator,
  IconToolsCamera,
  IconToolsEject,
  IconToolsBrightnessLess,
  IconToolsBrightnessMore,
  IconWrench,
  IconMouse,
  IconRobot,
  IconLayers
} from "../../component/Icon";

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
width: 100%;
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
    max-width: 1170px; 
    margin: 6px auto;
}
.keysOrdinaryKeyboard {
  position: relative;
  z-index: 4;
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
    const {
      action,
      code,
      disableMods,
      disableMove,
      disableAll,
      selectedlanguage,
      kbtype,
      macros,
      keyCode,
      onKeySelect,
      activeTab
    } = this.props;
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
        <div className="KeysWrapper">
          <div className="keysContainer">
            <div className="keysRow keysOrdinaryKeyboard">
              <svg className="svgStyle" viewBox="0 0 1070 208" preserveAspectRatio="xMidYMin slice">
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
            </div>
          </div>
        </div>
        <div className="KeysWrapper KeysWrapperSpecialKeys">
          <div className="keysContainer keysContainerDropdowns">
            <div className="keysRow keysMacros">
              <div className="keyIcon">
                <IconRobot />
              </div>
              <div className="keysButtonsList">
                <SelectMacro macros={macros} keyCode={code} onKeySelect={onKeySelect} />
              </div>
            </div>
            <div className="keysRow keysLayerLock">
              <div className="keyIcon">
                <IconLayers />
              </div>
              <div className="keysButtonsList">
                <SelectLayersLock action={action} activeTab={activeTab} keyCode={code} onKeySelect={onKeySelect} />
              </div>
            </div>
            <div className="keysRow keysLED">
              <div className="keyIcon">
                <h4>LED</h4>
              </div>
              <div className="keysButtonsList">
                <ButtonConfig
                  buttonText="On/Off"
                  icoPosition="left"
                  tooltip="Toggle effects"
                  tooltipDelay={300}
                  onClick={() => {
                    onKeySelect(17154);
                  }}
                  icoSVG={<IconLEDSwitchLeft />}
                />
                <ButtonConfig tooltip="Previous light effect" tooltipDelay={300} icoSVG={<IconLEDPreviousEffect />} />
                <ButtonConfig tooltip="Next light effect" tooltipDelay={300} icoSVG={<IconLEDNextEffect />} />
              </div>
            </div>
          </div>
          <div className="keysContainer keysMediaTools">
            <div className="keysRow keysMedia">
              <div className="keyIcon">
                <IconNote />
              </div>
              <div className="keysButtonsList">
                <ButtonConfig
                  tooltip="Play/Pause"
                  tooltipDelay={100}
                  icoSVG={<IconMediaPlayPause />}
                  onclick={e => this.onKeyPress()}
                />
                <ButtonConfig tooltip="Stop" tooltipDelay={100} icoSVG={<IconMediaStop />} />
                <ButtonConfig tooltip="Rewind" tooltipDelay={100} icoSVG={<IconMediaRewind />} />
                <ButtonConfig tooltip="Forward" tooltipDelay={100} icoSVG={<IconMediaForward />} />
                <ButtonConfig tooltip="Shuffle" tooltipDelay={100} icoSVG={<IconMediaShuffle />} />
                <ButtonConfig tooltip="Sound More" tooltipDelay={100} icoSVG={<IconMediaSoundMore />} />
                <ButtonConfig tooltip="Sound Less" tooltipDelay={100} icoSVG={<IconMediaSoundLess />} />
                <ButtonConfig tooltip="Mute" tooltipDelay={100} icoSVG={<IconMediaSoundMute />} />
              </div>
            </div>
            <div className="keysRow keysTools">
              <div className="keyIcon">
                <IconWrench />
              </div>
              <div className="keysButtonsList">
                <ButtonConfig tooltip="Eject" tooltipDelay={100} icoSVG={<IconToolsEject />} />
                <ButtonConfig tooltip="Calculator" tooltipDelay={100} icoSVG={<IconToolsCalculator />} />
                <ButtonConfig tooltip="Camera" tooltipDelay={100} icoSVG={<IconToolsCamera />} />
                <ButtonConfig tooltip="Brightness More" tooltipDelay={100} icoSVG={<IconToolsBrightnessMore />} />
                <ButtonConfig tooltip="Brightness Less" tooltipDelay={100} icoSVG={<IconToolsBrightnessLess />} />
              </div>
            </div>
          </div>
          <svg className="svgStyle" viewBox="0 0 1070 48" preserveAspectRatio="xMidYMin slice">
            <foreignObject width={1070} height={48} x={0} y={0} style={{ overflow: "visible" }}>
              <div xmlns="http://www.w3.org/1999/xhtml">
                <div className="keysContainer">
                  <div className="keysRow keysMouseEvents">
                    <div className="keyIcon">
                      <IconMouse />
                    </div>
                    <div className="keyTitle">
                      Mouse <span>Click</span>
                    </div>
                    <div className="keysButtonsList">
                      <ButtonConfig buttonText="Left" />
                      <ButtonConfig buttonText="Middle" />
                      <ButtonConfig buttonText="Right" />
                      <ButtonConfig buttonText="Back" />
                      <ButtonConfig buttonText="Fwd." />
                    </div>
                    <div className="keyTitle keyTitleClick">
                      Mouse <span>Movement</span>
                    </div>
                    <div className="keysButtonsList">
                      <ButtonConfig buttonText="Left" />
                      <ButtonConfig buttonText="Right" />
                      <ButtonConfig buttonText="Up" />
                      <ButtonConfig buttonText="Down" />
                    </div>
                    <div className="keyTitle keyTitleClick">
                      Mouse <span>Wheel</span>
                    </div>
                    <div className="keysButtonsList">
                      <ButtonConfig buttonText="Left" />
                      <ButtonConfig buttonText="Right" />
                      <ButtonConfig buttonText="Up" />
                      <ButtonConfig buttonText="Down" />
                    </div>
                  </div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </Style>
    );
  }
}

export default withTheme(KeyPicker);
