import * as React from "react";

function IconPen(props) {
  return (
    <svg width={24} height={24} fill="none" viewBox={`0 0 24 24`} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.1,5l1.4-1.3c0.4-0.4,1-0.4,1.4,0L20.3,6c0.4,0.4,0.4,1,0,1.4l-1.4,1.3L15.1,5z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
      />
      <path d="M17.3,10.4L6.7,21H3v-3.8L13.6,6.6" fill="none" stroke="currentColor" strokeMiterlimit={10} />
      <path d="M23.2,15.4" fill="none" stroke="currentColor" strokeMiterlimit={10} />
      <path d="M8.4,1" fill="none" stroke="currentColor" strokeMiterlimit={10} />
    </svg>
  );
}

export default IconPen;
