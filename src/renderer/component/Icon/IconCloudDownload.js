import * as React from "react";

function IconCloudDownload(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_3623_221104)">
        <mask
          id="prefix__aIconCloudDownload"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <path d="M8 16v8H0V0h24v24h-8v-8H8z" fill="#fff" />
        </mask>
        <g mask="url(#prefix__aIconCloudDownload)">
          <path
            d="M8.5 18.4a6.9 6.9 0 116.263-9.8c.158.34.555.495.9.356l-.224-.557.225.557A4.9 4.9 0 1117.5 18.4h-9z"
            stroke="currentColor"
            strokeWidth={1.2}
          />
        </g>
        <path d="M12 20v-8" stroke="currentColor" strokeWidth={1.2} />
        <path d="M10.57 20.65h2.86L12 22.08l-1.43-1.43z" stroke="currentColor" strokeWidth={1.3} />
      </g>
      <defs>
        <clipPath id="prefix__clip0_3623_221104">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconCloudDownload;
