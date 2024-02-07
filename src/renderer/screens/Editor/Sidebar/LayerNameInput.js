import InputBase from "@mui/material/InputBase";
import React from "react";
import useCheckDeviceSupportsPlugins from "@renderer/hooks/useCheckDeviceSupportsPlugins";

export const LayerNameInput = (props) => {
  const [loaded, plugins] = useCheckDeviceSupportsPlugins(["LayerNames"]);

  const onChange = (event) => {
    props.setLayerName(props.index, event.target.value);
  };

  if (!loaded || !plugins["LayerNames"]) {
    return `${props.value}`;
  }

  return (
    <InputBase
      sx={{
        flex: 1,
        fontSize: "0.8rem",
        "& input": {
          padding: "0", // Minimizes padding to adjust for baseline alignment
          margin: "0",
          marginBottom: "0.1rem",
        },
      }}
      value={props.value}
      size="small"
      onChange={onChange}
    />
  );
};
