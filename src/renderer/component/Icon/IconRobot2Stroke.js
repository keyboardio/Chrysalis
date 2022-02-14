import * as React from "react";

function IconRobot2Stroke(props) {
  return (
    <svg width={42} height={42} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#E2E4EA" d="M0 15.75h1.75V28H0z" />
      <mask id="prefix__a1234" fill="#fff">
        <rect x={5.25} y={7} width={31.5} height={28} rx={1} />
      </mask>
      <rect x={5.25} y={7} width={31.5} height={28} rx={1} stroke="#E2E4EA" strokeWidth={4} mask="url(#prefix__a1234)" />
      <path fill="#E2E4EA" d="M40.25 15.75H42V28h-1.75zM14 24.5h5.25v1.75H14zM22.75 24.5H28v1.75h-5.25z" />
      <circle cx={16.625} cy={16.625} r={2.625} fill="#E2E4EA" />
      <circle cx={25.375} cy={16.625} r={2.625} fill="#E2E4EA" />
    </svg>
  );
}

export default IconRobot2Stroke;
