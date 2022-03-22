import * as React from "react";

function IconEditModeStandardView(props) {
  return (
    <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={4}
        width={11}
        height={11}
      >
        <path
          d="M1 13.556h1.444V15H1v-1.444zM3.889 13.556h1.444V15H3.89v-1.444zM6.778 13.556h1.444V15H6.778v-1.444zM9.667 13.556h1.444V15H9.667v-1.444zM1 10.667h1.444v1.444H1v-1.444zM1 7.778h1.444v1.444H1V7.778zM1 4.889h1.444v1.444H1V4.89z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <mask
          id="prefix__b"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={1}
          y={4}
          width={11}
          height={11}
        >
          <path d="M1 15V4.889h1.452v8.66h8.66v1.45H1z" fill="#fff" />
        </mask>
        <g mask="url(#prefix__b)">
          <rect x={1.6} y={5.489} width={8.911} height={8.911} rx={1.4} stroke="currentColor" strokeWidth={1.2} />
        </g>
      </g>
      <rect x={4.6} y={2.6} width={8.8} height={8.8} rx={1.4} stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export default IconEditModeStandardView;
