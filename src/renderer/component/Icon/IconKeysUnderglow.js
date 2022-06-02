import * as React from "react";

function IconKeysUnderglow(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 20v-3m-6-2l-2 2m14-2l2 2" stroke="currentColor" strokeWidth={1.2} />
      <rect
        x={0.6}
        y={-0.6}
        width={12.8}
        height={4.8}
        rx={2.4}
        transform="matrix(1 0 0 -1 5 10.8)"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default IconKeysUnderglow;
