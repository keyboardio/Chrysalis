import * as React from "react";

function IconMouseSm(props) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="prefix_MouseSm_a" fill="#fff">
        <path d="M5 7.5a5 5 0 0110 0v5a5 5 0 01-10 0v-5z" />
      </mask>
      <path
        d="M10.5 6.25a.5.5 0 00-1 0h1zm-1 2.5a.5.5 0 001 0h-1zm0-2.5v2.5h1v-2.5h-1zM14 7.5v5h2v-5h-2zm-8 5v-5H4v5h2zm4 4a4 4 0 01-4-4H4a6 6 0 006 6v-2zm0 2a6 6 0 006-6h-2a4 4 0 01-4 4v2zm0-15a4 4 0 014 4h2a6 6 0 00-6-6v2zm0-2a6 6 0 00-6 6h2a4 4 0 014-4v-2z"
        fill="currentColor"
        mask="url(#prefix_MouseSm_a)"
      />
    </svg>
  );
}

export default IconMouseSm;
