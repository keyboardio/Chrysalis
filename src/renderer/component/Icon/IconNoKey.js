import * as React from "react";

function IconNoKey(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__IconNoKey"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <path d="M21.503 21.5L.003 0 0 24h24V0H5.698v3.576l16.947 16.947-1.142.977z" fill="#fff" />
      </mask>
      <g mask="url(#prefix__IconNoKey)" stroke="currentColor">
        <path d="M2.5 3L21 21.5" strokeWidth={1.5} />
        <path d="M20.182 12a8.182 8.182 0 11-16.364 0 8.182 8.182 0 0116.364 0z" strokeWidth={1.2} />
      </g>
    </svg>
  );
}

export default IconNoKey;
