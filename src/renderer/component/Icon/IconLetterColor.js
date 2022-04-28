import * as React from "react";

function IconLetterColor(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 19h14" stroke="currentColor" strokeWidth={1.2} />
      <mask
        id="prefix_maskLetter_a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={16}
      >
        <path fill="#fff" d="M0 0h24v16H0z" />
      </mask>
      <g mask="url(#prefix_maskLetter_a)">
        <path d="M17 17l-1.875-5M7 17l1.875-5m0 0L11.5 5h1l2.625 7m-6.25 0h6.25" stroke="currentColor" strokeWidth={1.2} />
      </g>
    </svg>
  );
}

export default IconLetterColor;
