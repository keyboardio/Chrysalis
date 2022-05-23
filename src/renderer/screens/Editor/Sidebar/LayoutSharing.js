import Focus from "@api/focus";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { t } from "i18next";
import React from "react";
import { BackupImport } from "./LayoutSharing/BackupImport";
import { ExportToFile } from "./LayoutSharing/ExportToFile";
import { FileImport } from "./LayoutSharing/FileImport";
import { LibraryImport } from "./LayoutSharing/LibraryImport";

const focus = new Focus();

export default class LayoutSharing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importConfirmOpen: false,
      layout: {},
      layoutName: null,
    };
  }

  setLayout = (layoutName, layout) => {
    this.setState({
      layoutName: layoutName,
      layout: layout,
    });
  };

  openImportConfirm = () => {
    this.setState({ importConfirmOpen: true });
  };
  closeImportConfirm = () => {
    this.setState({ importConfirmOpen: false });
  };

  onImport = () => {
    const { keymap, colormap } = this.props;
    const { layout } = this.state;

    const newKeymap = layout.keymaps.concat(
      keymap.custom.slice(layout.keymaps.length)
    );
    const newColormap = layout.colormaps
      ? layout.colormaps.concat(
          colormap.colorMap.slice(layout.colormaps.length)
        )
      : colormap.colorMap;
    const newPalette = layout.palette || colormap.palette;

    this.closeImportConfirm();
    this.props.onKeymapChange(newKeymap);
    this.props.onColormapChange(newColormap);
    this.props.onPaletteChange(newPalette);
    this.props.onClose();
  };

  render() {
    const { open, onClose, theme, keymap, colormap, ...others } = this.props;
    const { layout, layoutName } = this.state;
    const sidebarWidth = 300;

    const Keymap = focus.focusDeviceDescriptor.components.keymap;
    const previewLayout = layout.keymaps ? layout.keymaps[0] : keymap.custom[0];
    const palette = layout.palette || colormap.palette;
    const previewColormap = layout.colormaps
      ? layout.colormaps[0]
      : colormap.colorMap[0];

    return (
      <Dialog open={open} onClose={onClose} fullScreen>
        <DialogTitle>
          <Typography>{t("editor.sharing.title")}</Typography>
          <IconButton
            onClick={onClose}
            size="large"
            sx={{
              position: "absolute",
              right: 1,
              top: 1,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{ width: sidebarWidth, flexShrink: 0 }}
            PaperProps={{
              sx: {
                width: sidebarWidth,
                marginTop: "65px",
              },
            }}
          >
            <Box sx={{ overflow: "auto", padding: 3 }}>
              <LibraryImport
                setLayout={this.setLayout}
                layoutName={layoutName}
                {...others}
              />
              <BackupImport
                setLayout={this.setLayout}
                layoutName={layoutName}
                {...others}
              />
              <FileImport setLayout={this.setLayout} {...others} />
              <ExportToFile keymap={keymap} colormap={colormap} />

              <Button
                disabled={layoutName == null}
                variant="outlined"
                color="primary"
                onClick={this.openImportConfirm}
              >
                {t("editor.sharing.import")}
              </Button>
              <ConfirmationDialog
                title={t("editor.sharing.importConfirm.title")}
                open={this.state.importConfirmOpen}
                onConfirm={this.onImport}
                onCancel={this.closeImportConfirm}
              >
                {t("editor.sharing.importConfirm.contents")}
              </ConfirmationDialog>
            </Box>
          </Drawer>

          <Box
            sx={{
              flexGrow: 1,
              padding: 3,
              marginLeft: `${sidebarWidth}px`,
              width: `calc(100% - ${sidebarWidth}px)`,
            }}
          >
            <Keymap
              keymap={previewLayout}
              palette={palette}
              colormap={previewColormap}
              theme={theme}
            />{" "}
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}
