import * as React from "react";

const IconKeyboardSelector = props => {
  return (
    <svg width={42} height={42} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_1896_177006)">
        <mask
          id="prefix__a"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={4}
          y={9}
          width={34}
          height={24}
        >
          <path
            d="M14 26.25h14M8.75 15.75h3.5M8.75 21h3.5M14 15.75h3.5M14 21h3.5m1.75 0h3.5m-3.5-5.25h3.5m1.75 0H28M24.5 21H28m1.75-5.25h3.5M29.75 21h3.5m-27-10.5h29.5a1 1 0 011 1v19a1 1 0 01-1 1H6.25a1 1 0 01-1-1v-19a1 1 0 011-1z"
            stroke="#000"
            strokeWidth={2}
          />
        </mask>
        <g mask="url(#prefix__a)">
          <path d="M4 35h36L12 7H4v28z" fill="#E2E4EA" />
        </g>
        <path d="M32.85 8.615L37.235 13l-4.385 4.385v-8.77z" stroke="#E2E4EA" strokeWidth={1.2} />
        <path d="M12 7l28 28" stroke="#E2E4EA" strokeWidth={1.5} />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1896_177006">
          <path fill="#fff" d="M0 0h42v42H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconKeyboardSelector;
