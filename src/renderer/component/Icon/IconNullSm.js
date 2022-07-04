import * as React from "react";

function IconNullSm(props) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix_NullSm_a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}
      >
        <path d="M17.92 17.917L.002 0 0 20h20V0H4.748v2.98l14.123 14.123-.952.814z" fill="#fff" />
      </mask>
      <g mask="url(#prefix_NullSm_a)" stroke="currentColor">
        <path d="M2.083 2.5L17.5 17.917" strokeWidth={1.25} />
        <path d="M16.818 10a6.818 6.818 0 11-13.636 0 6.818 6.818 0 0113.636 0z" />
      </g>
    </svg>
  );
}

export default IconNullSm;
