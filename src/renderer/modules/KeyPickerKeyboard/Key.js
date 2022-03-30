/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Styled, { withTheme } from "styled-components";

const Style = Styled.g`
.keycap {
  .baseKey {
    fill: rgba(87, 97, 126, 0.25);
    transition-property: fill, fill-opacity;
    transition: 300ms ease-in-out;
  }
  &:hover {
    cursor: pointer;
    .baseKey {
      fill: rgba(87, 97, 126, 0.65);
    }
  }
  &.active {
    .baseKey {
      fill: #6C5CE7;
      fill-opacity: 1;
    }
  }
  &.disabled {
    opacity: 0.2;
    .baseKey {
      fill: rgba(87, 97, 126, 0.25);
    }
    &:hover {
      cursor: initial;
    }
  }
}

`;

// variable with the Key Size Library
const keyCapRegularSize = { width: 44, height: 30 };
const ksl = {
  "1UT": {
    outb: { x: keyCapRegularSize.width, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 18, dx: 1, dy: 1 },
    icon: { x: 14, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 22, dy: 16, ddx: 22, ddy: 16, fs: 14, fss: 12 }
    }
  },
  "2UT": {
    outb: { x: 94, y: 22, dx: 0, dy: 0 },
    out: { x: 92, y: 20, dx: 1, dy: 1 },
    icon: { x: 20, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 16, fs: 16 },
      b: { dx: 60, dy: 16, fs: 16 },
      c: { dx: 28, dy: 16, fs: 14 },
      d: { dx: 38, dy: 16, fs: 14 },
      letter: { dx: 47, dy: 16, ddx: 47, ddy: 16, fs: 16, fss: 14 }
    }
  },
  specialBlockT: {
    outb: { x: 44, y: 22, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 12, y: -3, w: 30, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 17, ddx: 22, ddy: 17, fs: 16, fss: 14 }
    }
  },
  specialBlockT2: {
    outb: { x: 44, y: 22, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 3, y: -3, w: 42, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 17, ddx: 22, ddy: 17, fs: 16, fss: 14 }
    }
  },
  "1U": {
    outb: { x: keyCapRegularSize.width, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 12, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 22, dy: 19, ddx: 34, ddy: 7, fs: 18, fss: 14 }
    }
  },
  "1U2": {
    outb: { x: 57, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 52, y: 24, dx: 1, dy: 1 },
    icon: { x: 16, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 27, dy: 19, ddx: 27, ddy: 19, fs: 16, fss: 14 }
    }
  },
  "1U5": {
    outb: { x: 64, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 62, y: 24, dx: 1, dy: 1 },
    icon: { x: 22, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 32, dy: 19, ddx: 32, ddy: 19, fs: 16, fss: 14 }
    }
  },
  "1U6": {
    outb: { x: 82, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 82, y: 24, dx: 1, dy: 1 },
    icon: { x: 29, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 42, dy: 19, ddx: 42, ddy: 19, fs: 16, fss: 14 }
    }
  },
  "1U8": {
    outb: { x: 94, y: 26, dx: 0, dy: 0 },
    out: { x: 92, y: 24, dx: 1, dy: 1 },
    icon: { x: 32, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 47, dy: 19, ddx: 47, ddy: 19, fs: 16, fss: 14 }
    }
  },
  "2U": {
    outb: { x: 104, y: 26, dx: 0, dy: 0 },
    out: { x: 102, y: 24, dx: 1, dy: 1 },
    icon: { x: 40, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 60, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 52, dy: 19, ddx: 52, ddy: 19, fs: 16, fss: 14 }
    }
  },
  "3U": {
    outb: { x: 168, y: 26, dx: 0, dy: 0 },
    out: { x: 166, y: 24, dx: 1, dy: 1 },
    icon: { x: 58, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 84, dy: 19, ddx: 84, ddy: 19, fs: 20, fss: 14 }
    }
  },
  "6U2": {
    outb: { x: 284, y: 26, dx: 0, dy: 0 },
    out: { x: 282, y: 24, dx: 1, dy: 1 },
    icon: { x: 130, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 142, dy: 19, ddx: 142, ddy: 19, fs: 20, fss: 14 }
    }
  },
  block: {
    outb: { x: 44, y: 26, dx: 0, dy: 0 },
    out: { x: 34, y: 30, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 5, dy: 24, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 18, dy: 17, ddx: 18, ddy: 17, fs: 16, fss: 14 }
    }
  },
  specialBlock: {
    outb: { x: 44, y: 32, dx: 0, dy: 0 },
    out: { x: 42, y: 30, dx: 1, dy: 1 },
    icon: { x: 10, y: 2, w: 30, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 17, ddx: 22, ddy: 17, fs: 16, fss: 14 }
    }
  },
  longBlock: {
    outb: { x: 36, y: 70, dx: 0, dy: 0 },
    out: { x: 34, y: 68, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 2, dy: 15, fs: 16 },
      b: { dx: 2, dy: 28, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 18, dy: 38, ddx: 18, ddy: 38, fs: 16, fss: 14 }
    }
  },
  wideBlock: {
    outb: { x: 78, y: 32, dx: 0, dy: 0 },
    out: { x: 76, y: 30, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 2, dy: 15, fs: 20 },
      b: { dx: 2, dy: 28, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 39, dy: 17, ddx: 39, ddy: 17, fs: 20, fss: 14 }
    }
  },
  enter: {
    outb: { x: 44, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 16, ddx: 22, ddy: 16, fs: 18, fss: 14 }
    }
  },
  title: {
    outb: { x: 44, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 0, dy: 16, ddx: 0, ddy: 16, fs: 16, fss: 16 }
    }
  }
};

class Key extends React.Component {
  render() {
    const { id, x, y, selected, clicked, centered, iconpresent, icon, iconsize, iconx, icony, content, disabled } = this.props;
    const randomID = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
    return (
      <Style>
        <g className={`keycap ${selected ? "active" : ""} ${disabled ? "disabled" : ""} ${content.type} id-${id}`}>
          {content.type === "enter" ? (
            <>
              <rect
                x={x + ksl[content.type].outb.dx + 10}
                y={y + ksl[content.type].outb.dy}
                width="34"
                height="60"
                rx="5"
                fill={
                  disabled
                    ? this.props.theme.keyboardPicker.keyDisabledColor
                    : selected
                    ? this.props.theme.keyboardPicker.keyActiveColor
                    : this.props.theme.keyboardPicker.keyColor
                }
                onClick={clicked}
                className="baseKey"
              />

              <rect
                x={x + ksl[content.type].outb.dx}
                y={y + ksl[content.type].outb.dy}
                width="44"
                height="26"
                rx="5"
                fill={
                  disabled
                    ? this.props.theme.keyboardPicker.keyDisabledColor
                    : selected
                    ? this.props.theme.keyboardPicker.keyActiveColor
                    : this.props.theme.keyboardPicker.keyColor
                }
                onClick={clicked}
              />

              <rect
                x={x + ksl[content.type].out.dx + 10}
                y={y + ksl[content.type].out.dy + 1}
                width="32"
                height="57"
                rx="5"
                fill={
                  disabled
                    ? this.props.theme.card.background
                    : selected
                    ? this.props.theme.keyboardPicker.keyActiveColor
                    : this.props.theme.keyboardPicker.keyColor
                }
                onClick={clicked}
              />

              <rect
                x={x + ksl[content.type].out.dx}
                y={y + ksl[content.type].out.dy}
                width="42"
                height="24"
                rx="5"
                fill={
                  disabled
                    ? this.props.theme.card.background
                    : selected
                    ? this.props.theme.keyboardPicker.keyActiveColor
                    : this.props.theme.keyboardPicker.keyColor
                }
                onClick={clicked}
              />
            </>
          ) : (
            ""
          )}
          {content.type !== "enter" && content.type != "title" ? (
            <>
              <defs>
                <linearGradient id={`paint_gradient_${randomID}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="5%" stopColor="#fff" />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
                <filter id={`filter0_d_2211_181319_${randomID}`} x="0" y="0" width="200%" height="200%">
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
              <g filter={`url(#filter0_d_2211_181319_${randomID})`}>
                <rect
                  x={x + ksl[content.type].outb.dx}
                  y={y + ksl[content.type].outb.dy}
                  width={ksl[content.type].outb.x}
                  height={ksl[content.type].outb.y}
                  rx="5"
                  // fill={
                  //   disabled
                  //     ? this.props.theme.keyboardPicker.keyDisabledColor
                  //     : selected
                  //     ? this.props.theme.keyboardPicker.keyActiveColor
                  //     : this.props.theme.keyboardPicker.keyColor
                  // }

                  className="baseKey"
                  onClick={clicked}
                />
              </g>
              <rect
                x={x + ksl[content.type].outb.dx}
                y={y + ksl[content.type].outb.dy}
                width={ksl[content.type].outb.x}
                height={ksl[content.type].outb.y}
                onClick={clicked}
                rx="5"
                // fill={
                //   disabled
                //     ? this.props.theme.card.background
                //     : selected
                //     ? this.props.theme.keyboardPicker.keyActiveColor
                //     : this.props.theme.keyboardPicker.keyColor
                // }
                fill={`url(#paint_gradient_${randomID})`}
                fillOpacity={0.1}
              />
            </>
          ) : (
            ""
          )}
          {!iconpresent && content.type == "title" ? (
            <>
              <text
                x={x + ksl[content.type].text.letter.dx}
                y={y + ksl[content.type].text.letter.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.letter.fs}
                fill={this.props.theme.keyboardPicker.titleColor}
                fontWeight={600}
              >
                {content.first}
              </text>
              <text
                x={x + ksl[content.type].text.letter.dx}
                y={y + ksl[content.type].text.letter.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.letter.fss}
                fontWeight={600}
                fill={this.props.theme.keyboardPicker.subTitleColor}
              >
                {content.second}
              </text>
            </>
          ) : (
            ""
          )}
          {!iconpresent && centered && content.type != "title" ? (
            <>
              <text
                x={x + ksl[content.type].text.letter.dx}
                y={y + ksl[content.type].text.letter.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.letter.fs}
                fill={
                  disabled ? this.props.theme.keyboardPicker.keyTextDisabledColor : this.props.theme.keyboardPicker.keyTextColor
                }
                fontWeight={600}
                textAnchor="middle"
              >
                {content.first}
              </text>
              <text
                x={x + ksl[content.type].text.letter.ddx}
                y={y + ksl[content.type].text.letter.ddy + 12}
                onClick={clicked}
                fontSize={ksl[content.type].text.letter.fss}
                fontWeight={600}
                fill={
                  selected
                    ? this.props.theme.keyboardPicker.keyActiveSubTextColor
                    : this.props.theme.keyboardPicker.keySubTextColor
                }
                textAnchor="middle"
              >
                {content.second}
              </text>
            </>
          ) : (
            ""
          )}
          {!iconpresent && !centered && content.type != "title" ? (
            <>
              <text
                x={x + ksl[content.type].text.a.dx}
                y={y + ksl[content.type].text.a.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.a.fs}
                fontWeight={600}
                fill={
                  disabled ? this.props.theme.keyboardPicker.keyTextDisabledColor : this.props.theme.keyboardPicker.keyTextColor
                }
              >
                {content.first}
              </text>
              <text
                x={x + ksl[content.type].text.b.dx}
                y={y + ksl[content.type].text.b.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.b.fs}
                fontWeight={600}
                fill={
                  selected
                    ? this.props.theme.keyboardPicker.keyActiveSubTextColor
                    : this.props.theme.keyboardPicker.keySubTextColor
                }
              >
                {content.second}
              </text>
              <text
                x={x + ksl[content.type].text.c.dx}
                y={y + ksl[content.type].text.c.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.c.fs}
                fontWeight={600}
                fill={
                  selected
                    ? this.props.theme.keyboardPicker.keyActiveSubTextColor
                    : this.props.theme.keyboardPicker.keySubTextColor
                }
              >
                {content.third}
              </text>
              <text
                x={x + ksl[content.type].text.d.dx}
                y={y + ksl[content.type].text.d.dy}
                onClick={clicked}
                fontSize={ksl[content.type].text.d.fs}
                fontWeight={600}
                fill={
                  selected
                    ? this.props.theme.keyboardPicker.keyActiveSubTextColor
                    : this.props.theme.keyboardPicker.keySubTextColor
                }
              >
                {content.fourth}
              </text>
            </>
          ) : (
            ""
          )}
          {iconpresent ? (
            <foreignObject
              x={iconx ? iconx : x + ksl[content.type].icon.x}
              y={icony ? icony : y + ksl[content.type].icon.y}
              width={ksl[content.type].icon.w}
              height={ksl[content.type].icon.h}
              fontSize={iconsize ? iconsize : "inherit"}
              onClick={clicked}
            >
              {icon}
            </foreignObject>
          ) : (
            ""
          )}
        </g>
      </Style>
    );
  }
}

export default withTheme(Key);
