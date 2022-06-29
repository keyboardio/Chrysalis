/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled, { withTheme } from "styled-components";
import i18n from "../../i18n";

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
import {
  SelectMacroCustomDropdown,
  SelectSuperKeyCustomDropdown,
  SelectLayersCustomDropdown,
  SelectMouseCustomDropdown,
  SelectShotModifierCustomDropdown,
  SelectLayersLock,
  SelectLayersSwitch,
  SelectOneShotModifiers,
  SelectOneShotLayers
} from "../../component/Select";

import {
  IconLayers,
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
  IconNoKey,
  IconNote,
  IconMouse,
  IconOneShot,
  IconThunder,
  IconToolsCalculator,
  IconToolsCamera,
  IconToolsEject,
  IconToolsBrightnessLess,
  IconToolsBrightnessMore,
  IconRobot,
  IconWrench
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
//import SelectSuperKeys from "../../component/Select/SelectSuperKey";

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


.KeysWrapper {
  max-width: 1160px;
  margin: auto;
}
.keysContainer + .keysContainer {
  margin-top: 4px;
}
.KeysWrapperSpecialKeys {
  margin-top: 4px;
}
.keysRow {
  display: flex;
  flex-wrap: nowrap;
  background: ${({ theme }) => theme.styles.keyboardPicker.keysRowBackground};
  box-shadow: ${({ theme }) => theme.styles.keyboardPicker.keysRowBoxShadow};
  border-radius: 6px;
  padding: 5px;
  padding-left: 3px;
  &.keysOrdinaryKeyboard {
    padding: 12px 24px;
  }
  .keyIcon {
    flex: 0 0 32px;
    text-align: center;
    align-self: center;
    color: ${({ theme }) => theme.styles.keyPicker.iconColor};
    h4 {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      margin: 0;
    }
  }
  .keyTitle {
    font-size: 11px;
    color: ${({ theme }) => theme.styles.keyPicker.titleColor};
    display: flex;
    // flex-grow: 1;
    align-self: center;
    line-height: 1.15em;
    flex-wrap: wrap;
    // max-width: 66px;
    span {
      color: ${({ theme }) => theme.styles.keyPicker.titleSpan};
      display: block;
      flex: 0 0 100%;
    }
    &.keyTitleClick {
      padding-left: 16px;
      padding-right: 10px;
    }
  }
}
.keysMediaTools {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
}
.keysContainerDropdowns {
  display: grid;
  grid-template-columns: minmax(25%, auto) minmax(25%, auto) minmax(25%, auto);
  grid-gap: 16px;
}

.dropdownItem {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dropdown-toggle.btn.btn-primary {
  padding-right: 24px;
  padding-left: 12px;
} 
.dropdown-toggle::after {
  right: 12px;
}
.keysButtonsList {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex: calc(100% - 32px);
  grid-gap: 3px;
}
.keysButtonsList .button-config {
  height: 34px;
  display: flex;
  flex-grow: 1;
  text-align: center;
  padding: 5px 3px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
} 
.keysMouseEvents .button-config {
  width: 58px;
}

.keysContainerGrid {
  display: grid; 
  grid-template-columns: 20% minmax(0, 20%) minmax(0, 20%) minmax(0, 20%) 20%; 
  gap: 2px 4px; 
}
.keysContainerGrid2 {
  display: grid; 
  grid-template-columns: 20% auto auto 20%; 
  gap: 2px 4px; 
}


.editor { 
  .keysLED .button-config {
    svg {
      margin-right: 0;
    }
    .buttonLabel {
      display: none;
    }
  }
  .dropdownLayerShift .dropdown-toggle.btn.btn-primary,
  .dropdownOneShotModifiers .dropdown-toggle.btn.btn-primary{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .dropdownLayerLock .dropdown-toggle.btn.btn-primary,
  .dropdownOneShotLayers .dropdown-toggle.btn.btn-primary{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.super {
  .keysContainerGrid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr); 
  }
  .keysContainerGrid2 {
    grid-template-columns: auto auto auto; 
  }
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
      actions,
      code,
      disableMods,
      disableMove,
      disableAll,
      selectedlanguage,
      superkeys,
      selKeys,
      kbtype,
      macros,
      keyCode,
      onKeySelect,
      activeTab
    } = this.props;

    //let boxShadowMatrix = useTheme().styles.keyPicker.keyMatrixShadow;

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

    if (selectedlanguage == "english") {
      if (kbtype == "ansi") {
        if (lansi[selectedlanguage] != undefined) {
          Lang = lansi[selectedlanguage];
        }
      } else {
        Lang = liso[selectedlanguage];
      }
    } else {
      if (selectedlanguage != "") {
        if (liso[selectedlanguage] != undefined) Lang = liso[selectedlanguage];
      }
    }
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
                  <filter id={`filter0_d_2211_181319`} x="0%" y="0%" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="-2" />
                    <feColorMatrix
                      result="matrixOut"
                      in="offOut"
                      type="matrix"
                      values={`0 0 0 0 0.552941 0 0 0 0 0.517647 0 0 0 0 0.737255 0 0 0 0.1 0`}
                    />
                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="0" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className={`KeysWrapper KeysWrapperSpecialKeys ${activeTab}`}>
          <div className="keysContainer keysContainerGrid">
            {activeTab == "super" ? (
              <></>
            ) : (
              <div className="keysRow keysSuperkeys keyRowsDropdowns">
                <div className="keyIcon">
                  <IconThunder />
                </div>
                <div className="keysButtonsList">
                  <SelectSuperKeyCustomDropdown
                    action={action}
                    actions={actions}
                    selKeys={selKeys}
                    onKeySelect={onKeySelect}
                    superkeys={superkeys}
                    keyCode={code}
                  />
                </div>
              </div>
            )}

            <div className="keysRow keysMacros keyRowsDropdowns">
              <div className="keyIcon">
                <IconRobot />
              </div>
              <div className="keysButtonsList">
                <SelectMacroCustomDropdown macros={macros} keyCode={code} onKeySelect={onKeySelect} />
              </div>
            </div>

            <div className="keysRow keysLayerLock keyRowsDropdowns">
              <div className="keyIcon">
                <IconLayers />
              </div>
              <div className="keysButtonsList">
                <SelectLayersCustomDropdown action={action} activeTab={activeTab} keyCode={code} onKeySelect={onKeySelect} />
              </div>
            </div>

            {activeTab == "super" ? (
              <></>
            ) : (
              <div className="keysRow keysOSM keyRowsDropdowns">
                <div className="keyIcon">
                  <IconOneShot />
                </div>
                <div className="keysButtonsList">
                  <SelectShotModifierCustomDropdown
                    action={action}
                    activeTab={activeTab}
                    keyCode={code}
                    onKeySelect={onKeySelect}
                  />
                </div>
              </div>
            )}
            <div className="keysRow keysMouseEvents">
              <div className="keyIcon">
                <IconMouse />
              </div>
              <div className="keysButtonsList">
                <SelectMouseCustomDropdown keyCode={code} onKeySelect={onKeySelect} />
              </div>
            </div>
          </div>
          <div className="keysContainer keysContainerGrid2">
            {activeTab == "super" ? (
              <></>
            ) : (
              <div className="keysRow keysNoKey keyRowsDropdowns">
                <div className="keyIcon">
                  <IconNoKey />
                </div>
                <div className="keysButtonsList">
                  <ButtonConfig
                    buttonText={i18n.editor.superkeys.specialKeys.noKey}
                    onClick={() => {
                      onKeySelect(0);
                    }}
                    selected={keyCode.base + keyCode.modified == 0 ? true : false}
                  />
                  <ButtonConfig
                    buttonText={i18n.editor.standardView.trans}
                    onClick={() => {
                      onKeySelect(65535);
                    }}
                    selected={keyCode.base + keyCode.modified == 65535 ? true : false}
                  />
                </div>
              </div>
            )}

            <div className="keysRow keysMedia">
              <div className="keyIcon">
                <IconNote />
              </div>
              <div className="keysButtonsList">
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.playPause}
                  tooltipDelay={100}
                  icoSVG={<IconMediaPlayPause />}
                  onclick={e => this.onKeyPress()}
                  selected={keyCode.base + keyCode.modified == 22733 ? true : false}
                  onClick={() => {
                    onKeySelect(22733);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.stop}
                  tooltipDelay={100}
                  icoSVG={<IconMediaStop />}
                  selected={keyCode.base + keyCode.modified == 22711 ? true : false}
                  onClick={() => {
                    onKeySelect(22711);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.rewind}
                  tooltipDelay={100}
                  icoSVG={<IconMediaRewind />}
                  selected={keyCode.base + keyCode.modified == 22710 ? true : false}
                  onClick={() => {
                    onKeySelect(22710);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.forward}
                  tooltipDelay={100}
                  icoSVG={<IconMediaForward />}
                  selected={keyCode.base + keyCode.modified == 22709 ? true : false}
                  onClick={() => {
                    onKeySelect(22709);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.shuffle}
                  tooltipDelay={100}
                  icoSVG={<IconMediaShuffle />}
                  selected={keyCode.base + keyCode.modified == 22713 ? true : false}
                  onClick={() => {
                    onKeySelect(22713);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.mute}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundMute />}
                  selected={keyCode.base + keyCode.modified == 19682 ? true : false}
                  onClick={() => {
                    onKeySelect(19682);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.soundLess}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundLess />}
                  selected={keyCode.base + keyCode.modified == 23786 ? true : false}
                  onClick={() => {
                    onKeySelect(23786);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.soundMore}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundMore />}
                  selected={keyCode.base + keyCode.modified == 23785 ? true : false}
                  onClick={() => {
                    onKeySelect(23785);
                  }}
                />
              </div>
            </div>

            <div className="keysRow keysTools">
              <div className="keyIcon">
                <IconWrench />
              </div>
              <div className="keysButtonsList">
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.eject}
                  tooltipDelay={100}
                  icoSVG={<IconToolsEject />}
                  selected={keyCode.base + keyCode.modified == 22712 ? true : false}
                  onClick={() => {
                    onKeySelect(22712);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.calculator}
                  tooltipDelay={100}
                  icoSVG={<IconToolsCalculator />}
                  selected={keyCode.base + keyCode.modified == 18834 ? true : false}
                  onClick={() => {
                    onKeySelect(18834);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.camera}
                  tooltipDelay={100}
                  icoSVG={<IconToolsCamera />}
                  selected={keyCode.base + keyCode.modified == 18552 ? true : false}
                  onClick={() => {
                    onKeySelect(18552);
                  }}
                />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.brightnessLess}
                  tooltipDelay={100}
                  icoSVG={<IconToolsBrightnessLess />}
                  selected={keyCode.base + keyCode.modified == 23664 ? true : false}
                  onClick={() => {
                    onKeySelect(23664);
                  }}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.brightnessMore}
                  tooltipDelay={100}
                  icoSVG={<IconToolsBrightnessMore />}
                  selected={keyCode.base + keyCode.modified == 23663 ? true : false}
                  onClick={() => {
                    onKeySelect(23663);
                  }}
                />
              </div>
            </div>

            <div className="keysRow keysLED">
              <div className="keyIcon">
                <h4>LED</h4>
              </div>
              <div className="keysButtonsList">
                <ButtonConfig
                  buttonText={i18n.editor.superkeys.specialKeys.ledToggleText}
                  icoPosition="left"
                  tooltip={i18n.editor.superkeys.specialKeys.ledToggleTootip}
                  tooltipDelay={300}
                  onClick={() => {
                    onKeySelect(17154);
                  }}
                  icoSVG={<IconLEDSwitchLeft />}
                  selected={keyCode.base + keyCode.modified == 17154 ? true : false}
                  className="buttonConfigLED"
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.ledPreviousEffectTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDPreviousEffect />}
                  onClick={() => {
                    onKeySelect(17153);
                  }}
                  selected={keyCode.base + keyCode.modified == 17153 ? true : false}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.ledNextEffectTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDNextEffect />}
                  onClick={() => {
                    onKeySelect(17152);
                  }}
                  selected={keyCode.base + keyCode.modified == 17152 ? true : false}
                />
              </div>
            </div>
          </div>
        </div>
      </Style>
    );
  }
}

export default withTheme(KeyPicker);
