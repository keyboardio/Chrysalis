import * as React from "react";

function iconWrench(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_1682_188425)">
        <path
          d="M2.475 5.803a5.502 5.502 0 007.248 7.248l8.662 8.662a1 1 0 001.414 0l1.414-1.414a1 1 0 000-1.414l-8.662-8.662a5.502 5.502 0 00-7.248-7.248L8.84 6.51 6.01 9.34 2.475 5.803z"
          stroke="currentColor"
          strokeWidth={1.2}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1682_188425">
          <path fill="#fff" transform="translate(0 .5)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default iconWrench;
