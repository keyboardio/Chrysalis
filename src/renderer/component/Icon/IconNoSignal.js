import * as React from "react";

function IconNoSignal(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="maskIconNoSignal" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <path d="M21.5033 21.5L0.00325155 0L0 24H24V0H5.69812V3.57552L22.645 20.5233L21.5033 21.5Z" fill="white" />
      </mask>
      <g mask="url(#maskIconNoSignal)">
        <path d="M2.5 3L21 21.5" stroke="currentColor" strokeWidth={1.5} />
        <mask id="maskIconNoSignal2" mask-type="alpha" maskUnits="userSpaceOnUse" x="10" y="10" width="10" height="10">
          <path d="M10 10L20 10L20 20L10 20L10 10Z" fill="white" />
        </mask>
        <g mask="url(#maskIconNoSignal2)">
          <circle cx="20" cy="20" r="9.4" transform="rotate(-180 20 20)" stroke="currentColor" strokeWidth={1.2} />
          <circle cx="20" cy="20" r="5.4" transform="rotate(-180 20 20)" stroke="currentColor" strokeWidth={1.2} />
          <circle cx="20" cy="20" r="1.4" transform="rotate(-180 20 20)" stroke="currentColor" strokeWidth={1.2} />
        </g>
        <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="10" height="10">
          <path d="M14 14H4V4H14V14Z" fill="white" />
        </mask>
        <g mask="url(#mask2)">
          <circle cx="4" cy="4" r="9.4" stroke="currentColor" strokeWidth={1.2} />
          <circle cx="4" cy="4" r="5.4" stroke="currentColor" strokeWidth={1.2} />
          <circle cx="4" cy="4" r="1.4" stroke="currentColor" strokeWidth={1.2} />
        </g>
      </g>
    </svg>
  );
}

export default IconNoSignal;
