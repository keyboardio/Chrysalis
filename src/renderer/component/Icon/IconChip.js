import * as React from "react";

function IconChip(props) {
  return (
    <svg width={24} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 3.5v3m0 0H7a1 1 0 00-1 1v3m4-4h4m0-3v3m0 0h3a1 1 0 011 1v3m3 0h-3m0 0v4m3 0h-3m0 0v3a1 1 0 01-1 1h-3m0 3v-3m0 0h-4m0 3v-3m0 0H7a1 1 0 01-1-1v-3m-3 0h3m0 0v-4m-3 0h3m4 0v4h4v-4h-4z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default IconChip;
