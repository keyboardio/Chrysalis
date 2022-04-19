import * as React from "react";

function IconBrightnessMore(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.727 14.345a4.364 4.364 0 014.364-4.364v0a4.364 4.364 0 014.364 4.364v.565c0 .17-.138.308-.308.308H9.034a.308.308 0 01-.308-.308v-.565z"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <path d="M13.09 6.927V2.999M18.327 9.267l2.777-2.777" stroke="currentColor" strokeWidth={1.5} />
      <path d="M20.073 14.345H24" stroke="currentColor" strokeWidth={1.2} />
      <path d="M7.418 9.267L4.641 6.49" stroke="currentColor" strokeWidth={1.5} />
      <path fill="currentColor" d="M4.8 13.036v7.855H3.055v-7.855z" />
      <path fill="currentColor" d="M0 16.09h7.855v1.745H0z" />
    </svg>
  );
}

export default IconBrightnessMore;
