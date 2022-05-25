import React from "react";
import ReactDom from "react-dom";

export default function MacroKeyModal({ children }) {
  return ReactDom.createPortal(<>{children}</>, document.getElementById("portalMacro"));
}
