import * as React from "react";

function IconRobotSm(props) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M0 7.5h.833v5.833H0z" />
      <mask id="prefix_RobotSm_a" fill="#fff">
        <rect x={2.5} y={3.333} width={15} height={13.333} rx={0.833} />
      </mask>
      <rect
        x={2.5}
        y={3.333}
        width={15}
        height={13.333}
        rx={0.833}
        stroke="currentColor"
        strokeWidth={2.033}
        mask="url(#prefix_RobotSm_a)"
      />
      <path fill="currentColor" d="M19.167 7.5H20v5.833h-.833zM6.667 11.667h2.5v.833h-2.5zM10.833 11.667h2.5v.833h-2.5z" />
      <circle cx={7.917} cy={7.917} r={1.25} fill="currentColor" />
      <circle cx={12.083} cy={7.917} r={1.25} fill="currentColor" />
    </svg>
  );
}

export default IconRobotSm;
