import * as React from "react";

function IconScreen(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 20H12M17 20H12M12 20V17M12 17H4C3.44772 17 3 16.5523 3 16V6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V16C21 16.5523 20.5523 17 20 17H12Z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default IconScreen;
