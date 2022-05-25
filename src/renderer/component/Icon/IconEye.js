import * as React from "react";

function IconEye(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={3.4} stroke="currentColor" strokeWidth={1.2} />
      <path
        d="M12 18.4c-4.762 0-8.782-2.685-10.352-6.4C3.218 8.286 7.238 5.6 12 5.6c4.762 0 8.782 2.686 10.352 6.4-1.57 3.714-5.59 6.4-10.352 6.4z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default IconEye;
