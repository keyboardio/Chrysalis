import * as React from "react";

function IconEditModeStandardViewSm(props) {
  return (
    <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clipStandardViewMode)">
        <mask
          id="prefix_StandardViewModeSm_a"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={4}
          width={10}
          height={10}
        >
          <path
            d="M.875 11.861h1.264v1.264H.875v-1.264zM3.403 11.861h1.264v1.264H3.403v-1.264zM5.93 11.861h1.264v1.264H5.931v-1.264zM8.458 11.861h1.264v1.264H8.458v-1.264zM.875 9.333h1.264v1.264H.875V9.333zM.875 6.806h1.264v1.263H.875V6.806zM.875 4.278h1.264v1.264H.875V4.278z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#prefix_StandardViewModeSm_a)">
          <mask
            id="prefix_StandardViewModeSm_b"
            style={{
              maskType: "alpha"
            }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={4}
            width={10}
            height={10}
          >
            <path d="M.875 13.125V4.278h1.27v7.577h7.577v1.27H.875z" fill="#fff" />
          </mask>
          <g mask="url(#prefix_StandardViewModeSm_b)">
            <rect x={1.4} y={4.803} width={7.797} height={7.797} rx={1.225} stroke="currentColor" strokeWidth={1.05} />
          </g>
        </g>
        <rect x={4.025} y={2.275} width={7.7} height={7.7} rx={1.225} stroke="currentColor" strokeWidth={1.05} />
      </g>
      <defs>
        <clipPath id="prefix__clipStandardViewMode">
          <path fill="currentColor" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconEditModeStandardViewSm;
