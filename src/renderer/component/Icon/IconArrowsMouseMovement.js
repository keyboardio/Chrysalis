import * as React from "react";

function IconArrowsMouseMovement(props) {
  return (
    <svg width={26} height={19} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        className="ArrowMovement01"
        d="M16.845 17.655L25 9.5l-8.155-8.155"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="ArrowMovement02"
        opacity={0.1}
        d="M8.046 15.938L14.484 9.5 8.046 3.062"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="ArrowMovement03"
        opacity={0.05}
        d="M.75 14.221L5.042 9.93.75 5.637"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconArrowsMouseMovement;
