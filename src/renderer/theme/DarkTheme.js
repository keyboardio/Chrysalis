import BackgroundImageDark from "../../../static/dark/darkBackground.png";
import BackgroundImageDark2x from "../../../static/dark/darkBackground-2x.png";
import CheckedIconDark from "../../../static/dark/icon-check-animated.gif";
import NeuronLoaderDark from "../../../static/dark/neuron-loader.jpg";
import closeButton from "../../../static/dark/X.svg";
import Tokens from "./Tokens";
import { TokenClass } from "typescript";

const settingColorOpacity = (color, opacity) => {
  let newColorArray = color;
  let newColor;
  newColorArray = newColorArray.replace(/[^\d,]/g, "").split(",");
  newColor = `rgba(${newColorArray[0]}, ${newColorArray[1]}, ${newColorArray[2]},  ${opacity})`;
  return newColor;
};
const settingColorMatrix = (color, opacity) => {
  let newColorArray = color;
  let newColor;
  newColorArray = newColorArray.replace(/[^\d,]/g, "").split(",");
  newColor = `0 0 0 0 ${(newColorArray[0] / 255).toFixed(2)} 0 0 0 0 ${(newColorArray[1] / 255).toFixed(2)} 0 0 0 0 ${(
    newColorArray[2] / 255
  ).toFixed(2)} 0 0 0 ${opacity} 0`;
  return newColor;
};

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
    gradientWarning: Tokens.colors.gradientWarning,
    gradientDanger: Tokens.colors.gradientDanger,
    gradientSuccess: Tokens.colors.gradientSuccess,
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
    textWarning: Tokens.colors.brandWarningLighter,
    textSuccess: Tokens.colors.brandSuccess,
    textDanger: Tokens.colors.brandDangerLighter,
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
    background: Tokens.colors.gray800,
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
    accordion: {
      background: settingColorOpacity(Tokens.colors.gray500, 0.2)
    },
    backupConfiguratorFolder: {
      headingColor: Tokens.colors.gray100,
      inputColor: Tokens.colors.gray50,
      inputBackground: settingColorOpacity(Tokens.colors.gray900, 0.2),
      border: Tokens.colors.gray600
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
      },
      outlineGradient: {
        color: "#fff",
        background: `linear-gradient(98.12deg, #555769 0%, #303349 56.24%) padding-box,
        ${Tokens.colors.gradient} border-box`
      },
      danger: {
        color: Tokens.colors.gray25,
        backgroundColor: Tokens.colors.brandDanger,
        backgroundColorHover: Tokens.colors.brandDangerLighter
      },
      config: {
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.1) -22.96%, rgba(255, 255, 255, 0) 123.24%), linear-gradient(0deg, ${settingColorOpacity(
          Tokens.colors.gray500,
          0.25
        )}, ${settingColorOpacity(Tokens.colors.gray500, 0.25)}), ${settingColorOpacity(Tokens.colors.gray900, 0.2)}`,
        boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.1)",
        border: "none",
        color: Tokens.colors.gray50,
        backgroundHover: `linear-gradient(90deg, rgba(255, 255, 255, 0.15) -22.96%, rgba(255, 255, 255, 0) 123.24%), ${settingColorOpacity(
          Tokens.colors.gray500,
          0.6
        )}`,
        backgroundActive: Tokens.colors.purple300,
        colorHover: Tokens.colors.gray25,
        colorActive: Tokens.colors.gray25,
        boxShadowHover: "0px 2px 0px rgba(0, 0, 0, 0.1)",
        boxShadowActive: `0px 3px 0px  ${settingColorOpacity(
          Tokens.colors.gray800,
          0.25
        )}, 0px 16px 16px -8px ${settingColorOpacity(Tokens.colors.gray500, 0.3)}`
      },
      settings: {
        color: Tokens.colors.gray100,
        colorHover: Tokens.colors.gray50,
        background: Tokens.colors.gray600,
        backgroundHover: Tokens.colors.gray500
      },
      short: {
        color: Tokens.colors.gray50,
        border: "none",
        background: Tokens.colors.gray600,
        backgroundHover: Tokens.colors.gray400
      }
    },
    callout: {
      iconInfo: "white",
      iconInfoBackground: Tokens.colors.gray500,
      iconInfoBorder: Tokens.colors.gray700,
      iconInfoShadowColor: settingColorOpacity(Tokens.colors.gray800, 0.2),
      calloutColor: "white",
      calloutBackground: "Transparent",
      calloutBorderColor: settingColorOpacity(Tokens.colors.gray600, 0.7)
    },
    card: {
      color: "#fff",
      altColor: "#f2f2f2",
      colorDisabled: "#BBB",
      background: Tokens.colors.gray800,
      cardTitleColor: Tokens.colors.gray25,
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
    dropdown: {
      backgroundButtonColor: settingColorOpacity(Tokens.colors.gray900, 0.2),
      backgroundButtonHover: settingColorOpacity(Tokens.colors.gray900, 0.35),
      backgroundButtonActive: settingColorOpacity(Tokens.colors.gray900, 0.2),
      textButtonColor: Tokens.colors.gray50,
      textButtonHover: Tokens.colors.gray25,
      borderButtonColor: "#3F425A",
      borderButtonHover: Tokens.colors.gray500,
      borderButtonActive: Tokens.colors.purple300,
      titleColor: Tokens.colors.gray100,
      subTitleColor: Tokens.colors.gray200,
      dropdownMenu: {
        backgroundColor: "#3F425A",
        boxShadow: `16px 32px 32px -16px ${settingColorOpacity(
          Tokens.colors.gray900,
          0.2
        )}, 0px 32px 72px -32px rgba(26, 17, 46, 0.5)`,
        itemTextColor: Tokens.colors.gray50,
        itemTextColorHover: Tokens.colors.gray25,
        itemBackgroundColorHover: settingColorOpacity(Tokens.colors.gray400, 0.2),
        itemBackgroundColorActive: Tokens.colors.purple200
      },
      selector: {
        numberColor: Tokens.colors.gray200,
        separatorColor: settingColorOpacity(Tokens.colors.gray500, 0.5),
        labelColor: Tokens.colors.gray200,
        color: Tokens.colors.gray100,
        arrowsColor: Tokens.colors.gray300
      }
    },
    firmwareUpdatePanel: {
      backgroundContent: Tokens.colors.gray800,
      backgroundSidebar: settingColorOpacity(Tokens.colors.gray400, 0.05),
      neuronStatusLineColor: Tokens.colors.gray500,
      neuronStatusLineWarning: Tokens.colors.brandWarning,
      neuronStatusLineSuccess: Tokens.colors.brandSuccess,
      neuronLightMatrixWarning: "0 0 0 0 0.996078 0 0 0 0 0.792157 0 0 0 0 0.341176 0 0 0 0.5 0",
      neuronLightMatrixSuccess: "0 0 0 0 0 0 0 0 0 0.807843 0 0 0 0 0.788235 0 0 0 1 0"
    },
    form: {
      formLabelTextcolor: Tokens.colors.gray100,
      inputColor: Tokens.colors.gray50,
      inputBorder: Tokens.colors.gray500,
      inputBorderActive: Tokens.colors.purple300,
      inputBackgroundColor: settingColorOpacity(Tokens.colors.gray900, 0.2),
      inputBackgroundColorActive: settingColorOpacity(Tokens.colors.gray900, 0.2)
    },
    modal: {
      closeButton: closeButton,
      backdropColor: settingColorOpacity(Tokens.colors.gray800, 0.85),
      background: Tokens.colors.gray600,
      titleColor: Tokens.colors.gray25,
      footerBackground: settingColorOpacity(Tokens.colors.gray900, 0.1)
    },
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
    neuronConnection: {
      backgroundColor: Tokens.colors.gray800,
      titleColor: Tokens.colors.gray25,
      subTitleColor: Tokens.colors.gray200
    },
    neuronData: {
      neuronInfoBackground: settingColorOpacity(Tokens.colors.gray900, 0.2),
      neuronInfoBoxShadow: "none",
      accordionBorder: Tokens.colors.gray600,
      accordionCardBackground: settingColorOpacity(Tokens.colors.gray900, 0.2),
      accordionCardBodyBackground: settingColorOpacity(Tokens.colors.gray900, 0.2),
      accordionCardHeaderColor: Tokens.colors.gray50,
      accordionCardHeaderBorderColor: settingColorOpacity(Tokens.colors.gray100, 0.2),
      plusOpacity: 0.5
    },
    neuronStatus: {
      neuronStatusBackgroundColor: settingColorOpacity(Tokens.colors.gray400, 0.05),
      lineStrokeColor: "#3F425A",
      lineStrokeColorConnected: "#32EEEE",
      connectionSuccessFill: "#32EEEE",
      connectionColorMatrix: "0 0 0 0 0.194444 0 0 0 0 0.933333 0 0 0 0 0.933333 0 0 0 0.5 0",
      connectionColorMatrixOnLoading: "0 0 0 0 0.194444 0 0 0 0 0.933333 0 0 0 0 0.933333 0 0 0 0.5 0",
      neuronNotFoundedColor: Tokens.colors.gray50,
      connectionStrokeOpacity: 0.15,
      neuronLoader: NeuronLoaderDark,
      checkedIcon: CheckedIconDark
    },
    neuronTitle: {
      heading3Color: Tokens.colors.gray25,
      heading4Color: Tokens.colors.gray200
    },
    pageHeader: {
      backgroundColor: settingColorOpacity(Tokens.colors.gray400, 0.15),
      titleColor: Tokens.colors.gray50
    },
    slider: {
      trackColor: Tokens.colors.gray400,
      progressColor: Tokens.colors.purple300,
      handleBorderColor: Tokens.colors.gray25,
      handleBackgroundColor: Tokens.colors.purple300,
      handleBoxShadow: Tokens.colors.purple300,
      labelColor: Tokens.colors.gray200
    },
    switch: {
      background: Tokens.colors.gray600,
      backgroundActive: Tokens.colors.purple300,
      thumbBackground: Tokens.colors.gray300,
      thumbBackgroundActive: Tokens.colors.gray25,
      thumbBorderColor: Tokens.colors.gray700,
      thumbBorderColorActive: Tokens.colors.purple200,
      thumbBoxShadow: "0px 4px 12px rgba(97, 32, 234, 0)",
      thumbBoxShadowActive: "0px 4px 12px rgba(97, 32, 234, 1)"
    },
    toast: {
      boxShadow: "0px 32px 32px -32px rgba(0, 0, 0, 0.25), 0px 0px 32px rgba(0, 0, 0, 0.25)",
      background: Tokens.colors.gray800,
      backgroundNoStatus: Tokens.colors.gray600,
      backgroundSuccess: `linear-gradient(90deg, rgba(0, 206, 201, 0.25) -10.33%, rgba(0, 206, 201, 0) 41.03%), ${Tokens.colors.gray800}`,
      backgroundDanger: ` linear-gradient(90deg, ${settingColorOpacity(
        Tokens.colors.brandDanger,
        0.25
      )} -10.33%, ${settingColorOpacity(Tokens.colors.brandDanger, 0)} 41.03%), ${Tokens.colors.gray800}`,
      backgroundWarning: `linear-gradient(90deg, ${settingColorOpacity(
        Tokens.colors.brandWarning,
        0.25
      )} -10.33%, ${settingColorOpacity(Tokens.colors.brandWarning, 0)} 41.03%), ${Tokens.colors.gray800}`,
      defaultColorTitle: Tokens.colors.gray25,
      defaultColorBody: Tokens.colors.gray50,
      warningColorTitle: Tokens.colors.brandWarningLighter,
      dangerColorTitle: Tokens.colors.brandPrimary,
      successColorTitle: Tokens.colors.brandSuccess
    },
    toggleButton: {
      background: settingColorOpacity(Tokens.colors.gray900, 0.2)
    },
    wrapper: {
      background: settingColorOpacity(Tokens.colors.gray400, 0.15)
    }
  }
};

export default Dark;
