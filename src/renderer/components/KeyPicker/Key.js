/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { withTheme } from "styled-components";

// variable with the Key Size Library
const ksl = {
  "1U": {
    outb: { x: 52, y: 26, dx: 0, dy: 0 },
    out: { x: 50, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 18, dy: 15, fs: 10 },
      c: { dx: 28, dy: 15, fs: 10 },
      d: { dx: 38, dy: 15, fs: 10 },
      letter: { dx: 25, dy: 19, fs: 14 }
    }
  },
  "1U2": {
    outb: { x: 65, y: 26, dx: 0, dy: 0 },
    out: { x: 63, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 16, dy: 19, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 30, dy: 19, fs: 14 }
    }
  },
  "1U5": {
    outb: { x: 79, y: 26, dx: 0, dy: 0 },
    out: { x: 77, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 16, dy: 19, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 40, dy: 19, fs: 14 }
    }
  },
  "2U": {
    outb: { x: 104, y: 26, dx: 0, dy: 0 },
    out: { x: 100, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 16, dy: 19, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 52, dy: 19, fs: 14 }
    }
  },
  "3U": {
    outb: { x: 162, y: 26, dx: 0, dy: 0 },
    out: { x: 160, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 16, dy: 19, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 52, dy: 19, fs: 14 }
    }
  },
  "6U2": {
    outb: { x: 361, y: 26, dx: 0, dy: 0 },
    out: { x: 359, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 16, dy: 19, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 182, dy: 19, fs: 14 }
    }
  },
  block: {
    outb: { x: 35, y: 35, dx: 0, dy: 0 },
    out: { x: 33, y: 33, dx: 1, dy: 1 },
    text: {
      a: { dx: 5, dy: 24, fs: 18 },
      b: { dx: 10, dy: 28, fs: 10 },
      c: { dx: 128, dy: 19, fs: 10 },
      d: { dx: 138, dy: 19, fs: 10 },
      letter: { dx: 17, dy: 17, fs: 14 }
    }
  },
  longBlock: {
    outb: { x: 35, y: 76, dx: 0, dy: 0 },
    out: { x: 33, y: 74, dx: 1, dy: 1 },
    text: {
      a: { dx: 2, dy: 15, fs: 14 },
      b: { dx: 2, dy: 28, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 17, dy: 38, fs: 14 }
    }
  },
  wideBlock: {
    outb: { x: 76, y: 35, dx: 0, dy: 0 },
    out: { x: 74, y: 33, dx: 1, dy: 1 },
    text: {
      a: { dx: 2, dy: 15, fs: 14 },
      b: { dx: 2, dy: 28, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 38, dy: 17, fs: 14 }
    }
  },
  enter: {
    outb: { x: 104, y: 26, dx: 0, dy: 0 },
    out: { x: 100, y: 24, dx: 1, dy: 1 },
    text: {
      a: { dx: 6, dy: 19, fs: 14 },
      b: { dx: 16, dy: 19, fs: 10 },
      c: { dx: 28, dy: 19, fs: 10 },
      d: { dx: 38, dy: 19, fs: 10 },
      letter: { dx: 55, dy: 19, fs: 14 }
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
              x={x + ksl[content.type].outb.dx + 14}
              y={y + ksl[content.type].outb.dy}
              width="77"
              height="57"
              rx="5"
              fill={
                selected ? this.props.theme.colors.button.active : "#e9e9e9"
              }
              onClick={clicked}
            />

            <rect
              x={x + ksl[content.type].outb.dx}
              y={y + ksl[content.type].outb.dy}
              width="79"
              height="26"
              rx="5"
              fill={
                selected ? this.props.theme.colors.button.active : "#e9e9e9"
              }
              onClick={clicked}
            />

            <rect
              x={x + ksl[content.type].out.dx + 15}
              y={y + ksl[content.type].out.dy}
              width="73"
              height="53"
              rx="5"
              fill="#e9e9e9"
              onClick={clicked}
            />

            <rect
              x={x + ksl[content.type].out.dx}
              y={y + ksl[content.type].out.dy}
              width="79"
              height="22"
              rx="5"
              fill="#e9e9e9"
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
              rx="5"
              fill={
                selected ? this.props.theme.colors.button.active : "#e9e9e9"
              }
              className="outer border"
            />
            <rect
              x={x + ksl[content.type].out.dx}
              y={y + ksl[content.type].out.dy}
              width={ksl[content.type].out.x}
              height={ksl[content.type].out.y}
              onClick={clicked}
              rx="5"
              fill="#e9e9e9"
            />
          </>
        )}
        {centered ? (
          <>
            <text
              x={x + ksl[content.type].text.letter.dx}
              y={y + ksl[content.type].text.letter.dy}
              onClick={clicked}
              fontFamily="Verdana"
              fontSize={ksl[content.type].text.letter.fs}
              fill="black"
              textAnchor="middle"
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.letter.dx}
              y={y + ksl[content.type].text.letter.dy + 10}
              onClick={clicked}
              fontFamily="Verdana"
              fontSize="10"
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
              fontFamily="Verdana"
              fontSize={ksl[content.type].text.a.fs}
              fill="black"
            >
              {content.first}
            </text>
            <text
              x={x + ksl[content.type].text.b.dx}
              y={y + ksl[content.type].text.b.dy}
              onClick={clicked}
              fontFamily="Verdana"
              fontSize={ksl[content.type].text.b.fs}
              fill="grey"
            >
              {content.second}
            </text>
            <text
              x={x + ksl[content.type].text.c.dx}
              y={y + ksl[content.type].text.c.dy}
              onClick={clicked}
              fontFamily="Verdana"
              fontSize={ksl[content.type].text.c.fs}
              fill="grey"
            >
              {content.third}
            </text>
            <text
              x={x + ksl[content.type].text.d.dx}
              y={y + ksl[content.type].text.d.dy}
              onClick={clicked}
              fontFamily="Verdana"
              fontSize={ksl[content.type].text.d.fs}
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
