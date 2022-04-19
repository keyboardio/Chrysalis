import * as React from "react";

function IconRobot(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M0 9h1v7H0z" />
      <mask id="maskRobotIcon" fill="#fff">
        <rect x={3} y={4} width={18} height={16} rx={1} />
      </mask>
      <rect x={3} y={4} width={18} height={16} rx={1} stroke="currentColor" strokeWidth={2.4} mask="url(#maskRobotIcon)" />
      <path fill="currentColor" d="M23 9h1v7h-1zM8 14h3v1H8zM13 14h3v1h-3z" />
      <circle cx={9.5} cy={9.5} r={1.5} fill="currentColor" />
      <circle cx={14.5} cy={9.5} r={1.5} fill="currentColor" />
    </svg>
  );
}

export default IconRobot;
