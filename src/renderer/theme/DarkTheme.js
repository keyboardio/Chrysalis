import BackgroundImageDark from "../../../static/dark/darkBackground.png";
import BackgroundImageDark2x from "../../../static/dark/darkBackground-2x.png";
import CheckedIconDark from "../../../static/dark/icon-check-animated.gif";
import NeuronLoaderDark from "../../../static/dark/neuron-loader.jpg";
import Tokens from "./Tokens";

const Dark = {
  name: "Dark",
  drawerWidth: 64,
  body: {
    backgroundImage: BackgroundImageDark,
    backgroundImage2x: BackgroundImageDark2x
  },
  keyboardPicker: {
    keyColor: "#252525",
    keyActiveColor: "#299898",
    keyDisabledColor: "#BBBBBB",
    keyTextColor: "#DDDDDD",
    keyIconColor: "#DDDDDD",
    keySubTextColor: "#959595",
    keyActiveSubTextColor: "#FFFFFF",
    keyTextDisabledColor: "#BBBBBB",
    titleColor: "#FFFFFF",
    subTitleColor: "#959595"
  },
  colors: {
    gardient: "linear-gradient(180deg, rgba(65,147,199,1) 0%, rgba(90,100,140,1) 63%, rgba(0,0,0,1) 100%);",
    gradient: Tokens.colors.gradient,
    gradientDisabled: Tokens.colors.gradientDisabled,
    gradientDisabledLight: Tokens.colors.gradientDisabledLight,
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
    body: "#222",
    text: Tokens.colors.gray25,
    subtext: "#555555",
    tipIcon: "#DDD",
    button: {
      text: "#fff",
      background: "#888",
      deselected: "#555",
      hover: "#777",
      disabled: "#444",
      cancel: "#ef26268f",
      save: "#24e24dad",
      active: "#30b1b1",
      secondary: "#BBB",
      activeText: "#000",
      deselectedText: "#454545",
      boxShadow: "0 0 0 0.2rem rgba(150,150,150,.5)",
      borderColor: "#30b1b1"
    },
    link: {
      text: "#6ecfff",
      opacity: 1
    }
  },
  card: {
    color: "#fff",
    altColor: "#f2f2f2",
    colorDisabled: "#BBB",
    background: "#555",
    backgroundActive: "#888",
    disabled: "#333",
    altBackground: "#444",
    altBackgroundActive: "#666",
    ballIcon: "#999",
    icon: "#DDD",
    altIcon: "#DDD",
    radius: "10",
    boxShadow: "0 0 0.5rem 0.3rem rgba(0,0,0,0.1)"
  },
  slider: {
    color: "#30b1b1"
  },
  font: "Libre Franklin",
  styles: {
    navbar: {
      color: "#555",
      background: "#0B0219",
      menuLink: {
        color: Tokens.colors.gray300,
        colorHover: Tokens.colors.gray50,
        colorActive: Tokens.colors.gray50,
        svgColor: Tokens.colors.gray50,
        svgColorActive: Tokens.colors.gray50,
        svgColorHover: Tokens.colors.gray50,
        lightingOpacity: 1,
        gradient: "linear-gradient(237.13deg, rgba(39, 27, 58, 0.32) 1.37%, rgba(123, 134, 158, 0.32) 99.24%)"
      }
    },
    button: {
      primary: {
        backgroundColor: Tokens.colors.gradient,
        disabledTextColor: Tokens.colors.gray300,
        disabledBackgroundColor: Tokens.colors.gradientDisabled
      },
      outline: {
        color: "#fff",
        colorHover: "#fff",
        borderColor: Tokens.colors.gray400,
        borderColorHover: Tokens.colors.gray300,
        boxShadowColor: Tokens.colors.gray400,
        boxShadowColorHover: Tokens.colors.gray300,
        disabledTextColor: Tokens.colors.gray400,
        disabledBorderColor: Tokens.colors.gray400,
        disabledBoxShadowColor: Tokens.colors.gray400,
        disabledOpacity: 0.35
      }
    },
    dropdown: {
      backgroundButtonColor: "rgba(11, 2, 25, 0.2)",
      backgroundButtonHover: "rgba(11, 2, 25, 0.35)",
      backgroundButtonActive: "rgba(11, 2, 25, 0.2)",
      textButtonColor: Tokens.colors.gray400,
      textButtonHover: Tokens.colors.gray400,
      borderButtonColor: "#3F425A",
      borderButtonHover: Tokens.colors.gray500,
      borderButtonActive: Tokens.colors.purple300,
      titleColor: Tokens.colors.gray100,
      subTitleColor: Tokens.colors.gray200,
      dropdownMenu: {
        backgroundColor: "#3F425A",
        boxShadow: "16px 32px 32px -16px rgba(11, 2, 25, 0.2), 0px 32px 72px -32px rgba(26, 17, 46, 0.5)",
        itemBackgroundColorHover: "rgba(107, 119, 148, 0.2)",
        itemBackgroundColorActive: Tokens.colors.purple200
      }
    },
    neuronStatus: {
      neuronStatusBackgroundColor: "rgba(107, 119, 148, 0.05)",
      lineStrokeColor: "#3F425A",
      lineStrokeColorConnected: "#32EEEE",
      connectionSuccessFill: "#32EEEE",
      connectionStrokeOpacity: 0.15,
      neuronLoader: NeuronLoaderDark,
      checkedIcon: CheckedIconDark
    },
    neuronConnection: {
      backgroundColor: Tokens.colors.gray800,
      titleColor: Tokens.colors.gray25,
      subTitleColor: Tokens.colors.gray200
    },
    pageHeader: {
      backgroundColor: "rgba(107, 119, 148, 0.15)",
      titleColor: Tokens.colors.gray50
    }
  }
};

export default Dark;
