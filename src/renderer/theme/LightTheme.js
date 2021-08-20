const Light = {
  name: "Light",
  drawerWidth: 64,
  keyboardPicker: {
    keyColor: "#f3f3f3",
    keyActiveColor: "#96dbff",
    keyDisabledColor: "#BBBBBB",
    keyTextColor: "#444444",
    keyIconColor: "#666666",
    keySubTextColor: "#808080",
    keyTextDisabledColor: "#BBBBBB",
    titleColor: "#666666",
    subTitleColor: "#808080"
  },
  colors: {
    gardient:
      "linear-gradient(180deg, rgba(131,58,180,1) 0%, rgba(189,38,38,1) 63%, rgba(252,112,42,1) 100%);",
    body: "#eaeff1",
    text: "#000000",
    subtext: "#555555",
    button: {
      text: "#000",
      background: "#f3f3f3",
      deselected: "#e5e5e5",
      hover: "#b0e3ff",
      disabled: "#999",
      active: "#96dbff",
      activeText: "#FFF",
      deselectedText: "#AAA",
      boxShadow: "0 0 0 0.2rem rgba(203,237,255,.5)",
      borderColor: "#44c0ff"
    },
    link: {
      text: "teal",
      opacity: 1
    }
  },
  card: {
    color: "#000",
    colorDisabled: "#999",
    background: "#fff",
    backgroundActive: "#cbedff",
    icon: "#666",
    disabled: "#AAA",
    radius: "10",
    boxShadow: "0 0 0.5rem 0.3rem rgba(0,0,0,0.1)"
  },
  navbar: {
    color: "#555",
    background: "#fff"
  },
  font: "Titillium Web"
};

export default Light;
