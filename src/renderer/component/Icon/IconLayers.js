import * as React from "react";

function IconLayers(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="maskLayers0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="11" width="24" height="12">
        <path d="M12 19.5L0 11.5V23H24V11.5L12 19.5Z" fill="white" />
      </mask>
      <g mask="url(#maskLayers0)">
        <path d="M3 15L12 9L21 15L12 21L3 15Z" strokeWidth={1.2} stroke="currentColor" />
      </g>
      <path d="M3 10L12 4L21 10L12 16L3 10Z" strokeWidth={1.2} stroke="currentColor" />
    </svg>
  );
}

export default IconLayers;
