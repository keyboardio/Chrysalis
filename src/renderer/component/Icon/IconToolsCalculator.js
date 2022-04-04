import * as React from "react";

function IconToolsCalculator(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 14l-3 3m0 0l-3 3m3-3l-3-3m3 3l3 3M3 17h8" stroke="currentColor" strokeWidth={1.5} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14a1 1 0 11-2 0 1 1 0 012 0zm0 6a1 1 0 11-2 0 1 1 0 012 0z"
        fill="currentColor"
      />
      <path d="M13 7h8M7 3v8M3 7h8" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

export default IconToolsCalculator;
