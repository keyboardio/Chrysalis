import * as React from "react";

function IconColorPicker(props) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.412 6.824l-9.266 9.265a.5.5 0 00-.146.353V19a1 1 0 001 1h2.558a.5.5 0 00.353-.146l9.266-9.266m-3.765-3.764L12 5.412l1.882 1.882m-.47-.47l.47.47m3.295 3.294L18.588 12l-1.882-1.882m.47.47l-.47-.47m-2.824-2.824l2.587-2.587a1 1 0 011.415 0l1.409 1.41a1 1 0 010 1.414l-2.587 2.587m-2.824-2.824l2.824 2.824"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default IconColorPicker;
