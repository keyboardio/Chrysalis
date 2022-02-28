import * as React from "react";

function IconDelete(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="path-delete-inside-1" fill="white">
        <path d="M7 22C5.89543 22 5 21.1046 5 20V8H19V20C19 21.1046 18.1046 22 17 22H7Z" />
        <path d="M5 4C4.44772 4 4 4.44772 4 5L4 7H20V5C20 4.44772 19.5523 4 19 4H16L15.5528 3.10557C15.214 2.428 14.5215 2 13.7639 2H10.2361C9.47852 2 8.786 2.428 8.44721 3.10557L8 4H5Z" />
      </mask>
      <path
        d="M7 22C5.89543 22 5 21.1046 5 20V8H19V20C19 21.1046 18.1046 22 17 22H7Z"
        stroke="currentColor"
        strokeWidth={2.4}
        mask="url(#path-delete-inside-1)"
      />
      <path
        d="M5 4C4.44772 4 4 4.44772 4 5L4 7H20V5C20 4.44772 19.5523 4 19 4H16L15.5528 3.10557C15.214 2.428 14.5215 2 13.7639 2H10.2361C9.47852 2 8.786 2.428 8.44721 3.10557L8 4H5Z"
        stroke="currentColor"
        strokeWidth={2.4}
        mask="url(#path-delete-inside-1)"
      />
    </svg>
  );
}

export default IconDelete;
