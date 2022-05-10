import * as React from "react";

function IconArrowsMouseWheel(props) {
  return (
    <svg width={30} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path className="ArrowWheelPath" d="M18.666 2l6 6-6 6" stroke="currentColor" strokeWidth={1.2} />
      <circle className="ArrowWheelCircle01" opacity={0.15} cx={2} cy={8} r={2} transform="rotate(90 2 8)" fill="currentColor" />
      <circle className="ArrowWheelCircle02" opacity={0.25} cx={8} cy={8} r={2} transform="rotate(90 8 8)" fill="currentColor" />
      <circle className="ArrowWheelCircle03" opacity={0.5} cx={14} cy={8} r={2} transform="rotate(90 14 8)" fill="currentColor" />
    </svg>
  );
}

export default IconArrowsMouseWheel;
