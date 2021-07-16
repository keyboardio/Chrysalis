/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { withTheme } from "styled-components";

// variable with the Key Size Library
const ksl = {
  "1UT": {
    outb: { x: 44, y: 20, dx: 0, dy: 0 },
    out: { x: 42, y: 18, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 22, dy: 16, fs: 16, fss: 12 }
    }
  },
  "1U": {
    outb: { x: 44, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 25, dy: 19, fs: 20, fss: 14 }
    }
  },
  "1U2": {
    outb: { x: 54, y: 26, dx: 0, dy: 0 },
    out: { x: 52, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 30, dy: 19, fs: 20, fss: 14 }
    }
  },
  "1U5": {
    outb: { x: 64, y: 26, dx: 0, dy: 0 },
    out: { x: 62, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 32, dy: 19, fs: 20, fss: 14 }
    }
  },
  "2U": {
    outb: { x: 104, y: 26, dx: 0, dy: 0 },
    out: { x: 102, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 52, dy: 19, fs: 20, fss: 14 }
    }
  },
  "3U": {
    outb: { x: 168, y: 26, dx: 0, dy: 0 },
    out: { x: 166, y: 24, dx: 1, dy: 1 },
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
    text: {
      a: { dx: 5, dy: 24, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 17, dy: 17, fs: 16, fss: 14 }
    }
  },
  longBlock: {
    outb: { x: 36, y: 70, dx: 0, dy: 0 },
    out: { x: 34, y: 68, dx: 1, dy: 1 },
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
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 16, fs: 18, fss: 14 }
    }
  }
};

class Key extends React.Component {
  render() {
    const { x, y, selected, clicked, centered, content } = this.props;
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
                selected ? this.props.theme.colors.button.active : "#f3f3f3"
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
                selected ? this.props.theme.colors.button.active : "#f3f3f3"
              }
              onClick={clicked}
            />

            <rect
              x={x + ksl[content.type].out.dx + 15}
              y={y + ksl[content.type].out.dy}
              width="26"
              height="58"
              rx="6"
              fill="#f3f3f3"
              onClick={clicked}
            />

            <rect
              x={x + ksl[content.type].out.dx}
              y={y + ksl[content.type].out.dy}
              width="42"
              height="24"
              rx="6"
              fill="#f3f3f3"
              onClick={clicked}
            />
          </>
        ) : (
          <>
            <rect
              x={x + ksl[content.type].outb.dx}
              y={y + ksl[content.type].outb.dy}
              width={ksl[content.type].outb.x}
              height={ksl[content.type].outb.y}
              rx="6"
              fill={
                selected ? this.props.theme.colors.button.active : "#f3f3f3"
              }
              className="outer border"
            />
            <rect
              x={x + ksl[content.type].out.dx}
              y={y + ksl[content.type].out.dy}
              width={ksl[content.type].out.x}
              height={ksl[content.type].out.y}
              onClick={clicked}
              rx="6"
              fill="#f3f3f3"
            />
          </>
        )}
        {centered ? (
          <>
            <text
              x={x + ksl[content.type].text.letter.dx}
              y={y + ksl[content.type].text.letter.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.letter.fs}
              fill="black"
              fontWeight={300}
              textAnchor="middle"
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.letter.dx}
              y={y + ksl[content.type].text.letter.dy + 14}
              onClick={clicked}
              fontSize={ksl[content.type].text.letter.fss}
              fontWeight={200}
              fill="grey"
              textAnchor="middle"
            >
              {content.second}
            </text>
          </>
        ) : (
          <>
            <text
              x={x + ksl[content.type].text.a.dx}
              y={y + ksl[content.type].text.a.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.a.fs}
              fontWeight={300}
              fill="black"
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.b.dx}
              y={y + ksl[content.type].text.b.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.b.fs}
              fontWeight={200}
              fill="grey"
            >
              {content.second}
            </text>
            <text
              x={x + ksl[content.type].text.c.dx}
              y={y + ksl[content.type].text.c.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.c.fs}
              fontWeight={200}
              fill="grey"
            >
              {content.third}
            </text>
            <text
              x={x + ksl[content.type].text.d.dx}
              y={y + ksl[content.type].text.d.dy}
              onClick={clicked}
              fontSize={ksl[content.type].text.d.fs}
              fontWeight={200}
              fill="grey"
            >
              {content.fourth}
            </text>
          </>
        )}
      </g>
    );
  }
}

export default withTheme(Key);
