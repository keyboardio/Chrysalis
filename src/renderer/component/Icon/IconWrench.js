import * as React from "react";

function IconWrenchSm(props) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__WrenchSm)">
        <path
          d="M2.062 4.42a4.585 4.585 0 006.04 6.04l7.219 7.218a.834.834 0 001.178 0l1.179-1.179a.834.834 0 000-1.178l-7.219-7.219a4.585 4.585 0 00-6.04-6.04L7.366 5.01 5.009 7.366 2.062 4.419z"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id="prefix__WrenchSm">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconWrenchSm;
