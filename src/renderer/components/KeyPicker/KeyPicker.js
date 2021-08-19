/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { RiStopFill } from "react-icons/ri";
import { BsFillBrightnessAltLowFill, BsShift } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { CgToggleOff } from "react-icons/cg";
import { ImTab } from "react-icons/im";
import {
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeUp,
  FaLinux
} from "react-icons/fa";
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
  IoIosBackspace,
  IoIosPause,
  IoIosPlay,
  IoIosShuffle
} from "react-icons/io";
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
import {
  MdKeyboardReturn,
  MdSpaceBar,
  MdKeyboardCapslock,
  MdInfo,
  MdEject
} from "react-icons/md";

import Key from "./Key";
import ES from "./ES.json";
import ENi from "./ENi.json";
import ENa from "./ENa.json";
import GR from "./GR.json";
import FR from "./FR.json";
import NR from "./NR.json";

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
.svgStyle {
  max-height: 290px;
}
`;

export default class KeyPicker extends Component {
  constructor(props) {
    super(props);

    // this.state = { selected: 0 };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = keycode => {
    const { onKeySelect } = this.props;
    onKeySelect(keycode);
  };

  renderTooltip(line1, line2, line3, line4) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <span>{line1}</span>
        {line2 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line2}</span>
          </React.Fragment>
        )}
        {line3 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line3}</span>
          </React.Fragment>
        )}
        {line4 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line4}</span>
          </React.Fragment>
        )}
      </Tooltip>
    );
  }

  render() {
    const {
      code,
      disableMods,
      disableMove,
      selectedlanguage,
      kbtype
    } = this.props;
    const liso = {
      english: ENi,
      spanish: ES,
      german: GR,
      french: FR,
      nordic: NR
    };
    const lansi = { english: ENa };
    let Lang = ENa;
    if (selectedlanguage != "" && kbtype == "ansi") {
      if (lansi[selectedlanguage] != undefined) Lang = lansi[selectedlanguage];
    }
    if (selectedlanguage != "" && kbtype == "iso") {
      if (liso[selectedlanguage] != undefined) Lang = liso[selectedlanguage];
    }
    const os = process.platform;
    const iconlist = {
      Backspace: <IoIosBackspace className="bigger" />,
      Enter: <MdKeyboardReturn className="bigger" />,
      Space: <MdSpaceBar className="bigger" />,
      CapsLock: <MdKeyboardCapslock className="bigger" />,
      Tab: <ImTab className="bigger" />,
      Shift: <BsShift className="bigger" />,
      App: <FiMenu className="bigger" />,
      Win:
        os === "win32" ? (
          <AiFillWindows className="bigger" />
        ) : os === "darwin" ? (
          <AiFillApple className="bigger" />
        ) : (
          <FaLinux className="bigger" />
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
          <foreignObject
            key={`id-${key.content.first}-${id}`}
            x={key.x}
            y={key.y}
            width={25}
            height={25}
          >
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip(key.tooltip, "", "", "")}
            >
              <MdInfo className={"info"} />
            </OverlayTrigger>
          </foreignObject>
        );
      }
      return (
        <Key
          key={`id-${key.content.first}-${id}`}
          x={key.x}
          y={key.y}
          selected={
            code === null
              ? false
              : code.base === key.id && code.modified < 49000
              ? true
              : code.modified > 0 && code.modified === key.id
              ? true
              : false
          }
          clicked={() => {
            key.mod == disableMods || key.move == disableMove
              ? {}
              : this.onKeyPress(key.id);
          }}
          centered={key.centered}
          content={key.content}
          iconpresent={key.icon}
          icon={iconlist[key.iconname]}
          disabled={key.mod == disableMods || key.move == disableMove}
        />
      );
    });
    return (
      <Style>
        <Container fluid className="keyboard">
          <Row className="keys">
            <svg className="svgStyle" viewBox="0 0 1042 266">
              {keyboard}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
