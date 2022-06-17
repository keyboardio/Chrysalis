import * as React from "react";

function IconShutdown(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M16 20v1H8v-1z" />
      <path stroke="currentColor" strokeWidth={1.2} d="M3.576 22.576l20-20" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 4H4a1 1 0 00-1 1v12a1 1 0 001 1h1l1.2-1.2h-2V5.2H17.8L19 4zM9.028 16.8H19.8V6.028l1.187-1.187c.009.052.013.105.013.159v12a1 1 0 01-1 1H7.828l1.2-1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default IconShutdown;
