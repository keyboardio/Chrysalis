import * as React from "react";

function IconKeys2TapHold(props) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M0 20h20v1H0z" />
      <path stroke="currentColor" d="M3.5 18.5h13v2h-13z" />
      <path d="M6.667 12.949L10 15.897l3.333-2.948" stroke="currentColor" strokeWidth={1.2} />
      <path d="M10 16v-6" stroke="currentColor" />
      <path d="M6.667 4.949L10 7.897l3.333-2.948M6.667.949L10 3.897 13.333.95" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export default IconKeys2TapHold;
