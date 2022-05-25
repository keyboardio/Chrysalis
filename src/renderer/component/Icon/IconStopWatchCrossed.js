import * as React from "react";

function IconStopWatchCrossed(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefixIconStopWatchCrossed"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <path d="M22.003 22L.503.5.5 24.5h24V.5H6.198v3.576l16.947 16.947-1.142.977z" fill="#fff" />
      </mask>
      <g mask="url(#prefixIconStopWatchCrossed)" stroke="currentColor">
        <path d="M4 4.5L20.5 21" strokeWidth={1.5} />
        <path
          d="M12.5 3.5a9 9 0 106.844 3.156M12.5 3.5a8.98 8.98 0 016.844 3.156M12.5 3.5v-1m0 4.5v6.5m9-9l-2.156 2.156M12.5 2.5h-2m2 0h2"
          strokeWidth={1.2}
        />
      </g>
    </svg>
  );
}

export default IconStopWatchCrossed;
