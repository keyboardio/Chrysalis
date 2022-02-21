import * as React from "react";

function IconFloppyDisk(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 19V5C4 4.44772 4.44772 4 5 4H16.5L20 7.5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19Z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      <path
        d="M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      <path d="M8 9V8H14V9H8Z" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export default IconFloppyDisk;
