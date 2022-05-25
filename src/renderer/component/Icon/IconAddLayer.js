import * as React from "react";

function IconAddLayer(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.4 6.733V9.4h-2.667v1.2H13.4v2.667h1.2V10.6h2.667V9.4H14.6V6.733h-1.2zM9 3.6h10A1.4 1.4 0 0120.4 5v10a1.4 1.4 0 01-1.4 1.4H9A1.4 1.4 0 017.6 15V5A1.4 1.4 0 019 3.6z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      <path
        d="M5 7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2h-1.2a.8.8 0 01-.8.8H5a.8.8 0 01-.8-.8V9a.8.8 0 01.8-.8V7z"
        fill="currentColor"
      />
    </svg>
  );
}

export default IconAddLayer;
