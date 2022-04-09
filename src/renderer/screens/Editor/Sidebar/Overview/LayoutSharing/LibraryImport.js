import React from "react";
import i18n from "i18next";
import path from "path";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import Focus from "../../../../../../api/focus";
import { getStaticPath } from "../../../../../config";
import { loadLayout } from "../LayoutSharing";

export class LibraryImport extends React.Component {
  selectLibraryItem = (item) => () => {
    this.loadFromLibrary(item);
  };

  loadFromLibrary = (layoutName) => {
    const focus = new Focus();
    const { vendor, product } = focus.device.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutPath = (layout) =>
      path.join(getStaticPath(), cVendor, cProduct, `layouts/${layout}.json`);

    const layoutData = loadLayout(layoutPath(layoutName));

    if (layoutData != null) this.props.setLayout(layoutName, layoutData);
  };

  render() {
    const { library, layoutName } = this.props;

    if (library.length == 0) return null;

    const layouts = library.map((name) => {
      const label = name.charAt(0).toUpperCase() + name.slice(1);

      return (
        <MenuItem
          selected={layoutName == name}
          value={name}
          key={`library-item-${name}`}
          onClick={this.selectLibraryItem(name)}
        >
          {label}
        </MenuItem>
      );
    });

    return (
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5">
          {i18n.t("editor.sharing.loadFromLibrary")}
        </Typography>
        <MenuList>{layouts}</MenuList>
        <Divider />
      </Box>
    );
  }
}
