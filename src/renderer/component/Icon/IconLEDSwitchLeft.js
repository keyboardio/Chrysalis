import * as React from "react";

function IconLEDSwitchLeft(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <path d="M1 8.101A6.979 6.979 0 016 6a6 6 0 110 12 6.98 6.98 0 01-5-2.101l-1 1V24h24V0H0v7.101l1 1z" fill="#fff" />
      </mask>
      <g mask="url(#prefix__a)">
        <rect
          x={-0.6}
          y={0.6}
          width={20.8}
          height={4.8}
          rx={2.4}
          transform="matrix(-1 0 0 1 21.8 9)"
          stroke="currentColor"
          strokeWidth={1.2}
        />
      </g>
      <circle r={4.4} transform="matrix(-1 0 0 1 6 12)" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export default IconLEDSwitchLeft;
