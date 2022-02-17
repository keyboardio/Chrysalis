import BackgroundImageLight from "../../../static/light/lightBackground.png";
import BackgroundImageLight2x from "../../../static/light/lightBackground-2x.png";
import Tokens from "./Tokens";

const Light = {
  name: "Light",
  drawerWidth: 64,
  body: {
    backgroundImage: BackgroundImageLight,
    backgroundImage2x: BackgroundImageLight2x
  },
  keyboardPicker: {
    keyColor: "#f3f3f3",
    keyActiveColor: "#96dbff",
    keyDisabledColor: "#BBBBBB",
    keyTextColor: "#444444",
    keyIconColor: "#666666",
    keySubTextColor: "#808080",
    keyActiveSubTextColor: "#000000",
    keyTextDisabledColor: "#BBBBBB",
    titleColor: "#666666",
    subTitleColor: "#808080"
  },
  colors: {
    gardient: "linear-gradient(180deg, rgba(131,58,180,1) 0%, rgba(189,38,38,1) 63%, rgba(252,112,42,1) 100%);",
    gray25: Tokens.colors.gray25,
    gray50: Tokens.colors.gray50,
    gray100: Tokens.colors.gray100,
    gray200: Tokens.colors.gray200,
    gray300: Tokens.colors.gray300,
    gray400: Tokens.colors.gray400,
    gray500: Tokens.colors.gray500,
    gray600: Tokens.colors.gray600,
    gray700: Tokens.colors.gray700,
    gray800: Tokens.colors.gray800,
    gray900: Tokens.colors.gray900,
    purple300: Tokens.colors.purple300,
    purple200: Tokens.colors.purple200,
    purple100: Tokens.colors.purple100,
    brandPrimary: Tokens.colors.brandPrimary,
    brandSecondary: Tokens.colors.brandSecondary,
    brandSuccess: Tokens.colors.brandSuccess,
    brandSuccessLighter: Tokens.colors.brandSuccessLighter,
    brandWarning: Tokens.colors.brandWarning,
    brandWarningLighter: Tokens.colors.brandWarningLighter,
    brandDanger: Tokens.colors.brandDanger,
    brandDangerLighter: Tokens.colors.brandDangerLighter,
    pastelShadesGreen200: Tokens.colors.pastelShadesGreen200,
    pastelShadesGreen300: Tokens.colors.pastelShadesGreen300,
    pastelShadesGreen100: Tokens.colors.pastelShadesGreen100,
    pastelShadesMint300: Tokens.colors.pastelShadesMint300,
    pastelShadesMint200: Tokens.colors.pastelShadesMint200,
    pastelShadesMint100: Tokens.colors.pastelShadesMint100,
    body: "#eaeff1",
    text: "#000000",
    subtext: "#555555",
    tipIcon: "#666",
    button: {
      text: "#000",
      background: "#f3f3f3",
      deselected: "#e5e5e5",
      hover: "#b0e3ff",
      disabled: "#999",
      cancel: "#ef26268f",
      save: "#24e24dad",
      active: "#96dbff",
      secondary: "#7b7e82",
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
    altColor: "#333",
    colorDisabled: "#999",
    background: "#fff",
    backgroundActive: "#cbedff",
    disabled: "#AAA",
    altBackground: "#FFF",
    altBackgroundActive: "#F1F1F1",
    ballIcon: "#DDD",
    icon: "#666",
    altIcon: "#DDD",
    radius: "10",
    boxShadow: "0 0 0.5rem 0.3rem rgba(0,0,0,0.1)"
  },
  slider: {
    color: "#2AD2C9"
  },
  font: "Libre Franklin",
  styles: {
    navbar: {
      background: Tokens.colors.gray25,
      menuLink: {
        color: Tokens.colors.gray200,
        colorActive: Tokens.colors.purple300,
        gradient: "linear-gradient(236.53deg, #F0F2F4 1.37%, #D8DBF1 117.2%);"
      }
    }
  }
};

export default Light;
