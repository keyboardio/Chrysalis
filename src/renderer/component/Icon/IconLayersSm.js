import * as React from "react";

function IconLayersSm(props) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix_LayersSm_a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={9}
        width={20}
        height={11}
      >
        <path d="M10 16.25L0 9.583v9.584h20V9.583L10 16.25z" fill="#fff" />
      </mask>
      <g mask="url(#prefix_LayersSm_a)">
        <path d="M2.5 12.5l7.5-5 7.5 5-7.5 5-7.5-5z" stroke="currentColor" />
      </g>
      <path d="M2.5 8.333l7.5-5 7.5 5-7.5 5-7.5-5z" stroke="currentColor" />
    </svg>
  );
}

export default IconLayersSm;
