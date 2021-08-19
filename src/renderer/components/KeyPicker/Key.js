/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { withTheme } from "styled-components";

// variable with the Key Size Library
const ksl = {
  "1UT": {
    outb: { x: 44, y: 20, dx: 0, dy: 0 },
    out: { x: 42, y: 18, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 22, dy: 16, fs: 14, fss: 12 }
    }
  },
  "2UT": {
    outb: { x: 94, y: 22, dx: 0, dy: 0 },
    out: { x: 92, y: 20, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 16, fs: 16 },
      b: { dx: 60, dy: 16, fs: 16 },
      c: { dx: 28, dy: 16, fs: 14 },
      d: { dx: 38, dy: 16, fs: 14 },
      letter: { dx: 47, dy: 16, fs: 16, fss: 14 }
    }
  },
  specialBlockT: {
    outb: { x: 44, y: 22, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 15, y: -3, w: 30, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 17, fs: 16, fss: 14 }
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
      letter: { dx: 22, dy: 17, fs: 16, fss: 14 }
    }
  },
  "1U": {
    outb: { x: 44, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 25, dy: 19, fs: 18, fss: 14 }
    }
  },
  "1U2": {
    outb: { x: 54, y: 26, dx: 0, dy: 0 },
    out: { x: 52, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 30, dy: 19, fs: 16, fss: 14 }
    }
  },
  "1U5": {
    outb: { x: 64, y: 26, dx: 0, dy: 0 },
    out: { x: 62, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 32, dy: 19, fs: 16, fss: 14 }
    }
  },
  "1U6": {
    outb: { x: 84, y: 26, dx: 0, dy: 0 },
    out: { x: 82, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 42, dy: 19, fs: 16, fss: 14 }
    }
  },
  "1U8": {
    outb: { x: 94, y: 26, dx: 0, dy: 0 },
    out: { x: 92, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 47, dy: 19, fs: 16, fss: 14 }
    }
  },
  "2U": {
    outb: { x: 104, y: 26, dx: 0, dy: 0 },
    out: { x: 102, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 60, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 52, dy: 19, fs: 16, fss: 14 }
    }
  },
  "3U": {
    outb: { x: 168, y: 26, dx: 0, dy: 0 },
    out: { x: 166, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 52, dy: 19, fs: 20, fss: 14 }
    }
  },
  "6U2": {
    outb: { x: 284, y: 26, dx: 0, dy: 0 },
    out: { x: 282, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 142, dy: 19, fs: 20, fss: 14 }
    }
  },
  block: {
    outb: { x: 36, y: 32, dx: 0, dy: 0 },
    out: { x: 34, y: 30, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 5, dy: 24, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 17, dy: 17, fs: 16, fss: 14 }
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
      letter: { dx: 22, dy: 17, fs: 16, fss: 14 }
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
      letter: { dx: 17, dy: 38, fs: 16, fss: 14 }
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
      letter: { dx: 38, dy: 17, fs: 20, fss: 14 }
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
      letter: { dx: 22, dy: 16, fs: 18, fss: 14 }
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
      letter: { dx: 0, dy: 16, fs: 16, fss: 16 }
    }
  }
};

class Key extends React.Component {
  render() {
    const {
      x,
      y,
      selected,
      clicked,
      centered,
      iconpresent,
      icon,
      content,
      disabled
    } = this.props;
    return (
      <g className="keycap">
        {content.type === "enter" ? (
          <>
            <rect
              x={x + ksl[content.type].outb.dx + 10}
              y={y + ksl[content.type].outb.dy}
              width="34"
              height="60"
              rx="6"
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
              x={x + ksl[content.type].outb.dx}
              y={y + ksl[content.type].outb.dy}
              width="44"
              height="26"
              rx="6"
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
              x={x + ksl[content.type].out.dx + 15}
              y={y + ksl[content.type].out.dy}
              width="26"
              height="58"
              rx="6"
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
              rx="6"
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
            <rect
              x={x + ksl[content.type].outb.dx}
              y={y + ksl[content.type].outb.dy}
              width={ksl[content.type].outb.x}
              height={ksl[content.type].outb.y}
              rx="6"
              fill={
                disabled
                  ? this.props.theme.keyboardPicker.keyDisabledColor
                  : selected
                  ? this.props.theme.keyboardPicker.keyActiveColor
                  : this.props.theme.keyboardPicker.keyColor
              }
              className="outer border"
              onClick={clicked}
            />
            <rect
              x={x + ksl[content.type].out.dx}
              y={y + ksl[content.type].out.dy}
              width={ksl[content.type].out.x}
              height={ksl[content.type].out.y}
              onClick={clicked}
              rx="6"
              fill={
                disabled
                  ? this.props.theme.card.background
                  : selected
                  ? this.props.theme.keyboardPicker.keyActiveColor
                  : this.props.theme.keyboardPicker.keyColor
              }
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
              fontWeight={400}
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.letter.dx}
              y={y + ksl[content.type].text.letter.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.letter.fss}
              fontWeight={400}
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
                disabled
                  ? this.props.theme.keyboardPicker.keyTextDisabledColor
                  : this.props.theme.keyboardPicker.keyTextColor
              }
              fontWeight={300}
              textAnchor="middle"
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.letter.dx}
              y={y + ksl[content.type].text.letter.dy + 12}
              onClick={clicked}
              fontSize={ksl[content.type].text.letter.fss}
              fontWeight={200}
              fill={this.props.theme.keyboardPicker.keySubTextColor}
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
              fontWeight={300}
              fill={
                disabled
                  ? this.props.theme.keyboardPicker.keyTextDisabledColor
                  : this.props.theme.keyboardPicker.keyTextColor
              }
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.b.dx}
              y={y + ksl[content.type].text.b.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.b.fs}
              fontWeight={200}
              fill={this.props.theme.keyboardPicker.keySubTextColor}
            >
              {content.second}
            </text>
            <text
              x={x + ksl[content.type].text.c.dx}
              y={y + ksl[content.type].text.c.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.c.fs}
              fontWeight={200}
              fill={this.props.theme.keyboardPicker.keySubTextColor}
            >
              {content.third}
            </text>
            <text
              x={x + ksl[content.type].text.d.dx}
              y={y + ksl[content.type].text.d.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.d.fs}
              fontWeight={200}
              fill={this.props.theme.keyboardPicker.keySubTextColor}
            >
              {content.fourth}
            </text>
          </>
        ) : (
          ""
        )}
        {iconpresent ? (
          <foreignObject
            x={x + ksl[content.type].icon.x}
            y={y + ksl[content.type].icon.y}
            width={ksl[content.type].icon.w}
            height={ksl[content.type].icon.h}
            onClick={clicked}
          >
            {icon}
          </foreignObject>
        ) : (
          ""
        )}
      </g>
    );
  }
}

export default withTheme(Key);
