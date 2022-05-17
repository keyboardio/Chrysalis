import * as React from "react";

function DotsProgressBar({ progressWidth }) {
  return (
    <svg width={98} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="prefix__maskDotsProgress"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={98}
        height={12}
      >
        {/* <path d="M0 0h98v12H0z" /> */}
        <path
          fill="#fff"
          d="M0 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM5 1.5a1.5 1.5 0 113 0v9a1.5 1.5 0 01-3 0v-9zM10 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM15 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM20 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM25 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM30 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM35 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM40 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM45 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM50 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM55 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM60 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM65 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM70 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM75 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM80 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM85 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM90 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM95 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9z"
        />
      </mask>
      <g mask="url(#prefix__maskDotsProgress)" fill="#3F425A">
        <path
          className="progressBaseColor"
          d="M0 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM5 1.5a1.5 1.5 0 113 0v9a1.5 1.5 0 01-3 0v-9zM10 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM15 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM20 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM25 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM30 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM35 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM40 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM45 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM50 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM55 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM60 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM65 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM70 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM75 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM80 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM85 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM90 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9zM95 1.5a1.5 1.5 0 013 0v9a1.5 1.5 0 01-3 0v-9z"
        />
        <rect width={`${progressWidth}%`} height={12} className="progressFill" />
      </g>
    </svg>
  );
}

export default DotsProgressBar;
