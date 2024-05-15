import React from "react";
import Tooltip from "@mui/material/Tooltip";
// This component wraps the MUI tooltip with a custom tooltip component so that we can set our own tooltip defaults.
const CustomTooltip = ({ title, children }) => {
  // Set tooltip defaults here
  const tooltipProps = {
    disableInteractive: true,
    placement: "top",
  };

  return (
    <Tooltip {...tooltipProps} title={title}>
      {children}
    </Tooltip>
  );
};

// export "CustomToolTip" as "Tooltip"
export default CustomTooltip;
