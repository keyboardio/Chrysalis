import * as React from "react";

function IconUndoRestart(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefixIconUndoRestart"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={2}
        width={22}
        height={21}
      >
        <path
          d="M6 10H2V3h20v19h-9.01v-3.057h-1.992V22H6.939l2.237-3.59-1.696-1.062L4.571 22H2v-4.01l4.21-2.049-.874-1.8L2 15.755V12h4v-2z"
          fill="currentColor"
          stroke="currentColor"
        />
      </mask>
      <g mask="url(#prefixIconUndoRestart)">
        <path d="M4 12a8 8 0 102-5.292" stroke="currentColor" strokeWidth={1.2} />
      </g>
      <path d="M3.6 4.449V9.4h4.951L3.6 4.449z" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export default IconUndoRestart;
