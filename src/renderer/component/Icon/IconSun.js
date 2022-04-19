import * as React from "react";

function IconSun(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="pathSunMask" fill="white">
        <path d="M12 1L8.77816 4.22184H4.22183V8.77817L1 12L4.22183 15.2218V19.7782H8.77819L12 23L15.2218 19.7782H19.7782V15.2218L23 12L19.7782 8.77818V4.22184H15.2218L12 1Z" />
      </mask>
      <path
        d="M12 1L8.77816 4.22184H4.22183V8.77817L1 12L4.22183 15.2218V19.7782H8.77819L12 23L15.2218 19.7782H19.7782V15.2218L23 12L19.7782 8.77818V4.22184H15.2218L12 1Z"
        stroke="currentColor"
        strokeWidth={2.4}
        mask="url(#pathSunMask)"
      />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

export default IconSun;
