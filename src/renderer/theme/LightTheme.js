import BackgroundImageLight from "../../../static/light/lightBackground.png";
import BackgroundImageLight2x from "../../../static/light/lightBackground-2x.png";
import NeuronLoaderLight from "../../../static/light/neuron-loader.jpg";
import CheckedIconLight from "../../../static/dark/icon-check-animated.gif";
import closeButton from "../../../static/light/X.svg";
import IconPlusXS from "../../../static/light/plusIcon.svg";
import RaiseFirmwareUpgrade from "../../../static/light/raiseFirmwareupgrade.svg";

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
    body: "#eaeff1",
    text: Tokens.colors.gray400,
    textWarning: Tokens.colors.brandWarning,
    textSuccess: Tokens.colors.brandSuccess,
    textDanger: Tokens.colors.brandDanger,
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
    background: "rgba(255, 255, 255, 0.6)",
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
    accordion: {
      background: settingColorOpacity(Tokens.colors.gray25, 0.8)
    },
    backupConfiguratorFolder: {
      headingColor: Tokens.colors.gray500,
      inputColor: Tokens.colors.gray300,
      inputBackground: "rgba(255, 255, 255, 0.4)",
      border: settingColorOpacity(Tokens.colors.gray100, 0.6)
    },
    button: {
      primary: {
        backgroundColor: Tokens.colors.gradient,
        disabledTextColor: Tokens.colors.gray100,
        disabledBackgroundColor: Tokens.colors.gradientDisabledLight
      },
      outline: {
        color: Tokens.colors.gray400,
        colorHover: Tokens.colors.gray600,
        borderColor: Tokens.colors.gray100,
        borderColorHover: Tokens.colors.gray200,
        boxShadowColor: Tokens.colors.gray100,
        boxShadowColorHover: Tokens.colors.gray200,
        disabledTextColor: Tokens.colors.gray100,
        disabledBorderColor: Tokens.colors.gray50,
        disabledBoxShadowColor: Tokens.colors.gray50,
        disabledOpacity: 1
      },
      outlineGradient: {
        color: Tokens.colors.brandPrimary,
        background: `linear-gradient(98.12deg, #F0DDE9 0%, #F0F2F4 56.24%) padding-box,
        ${Tokens.colors.gradient} border-box`
      },
      danger: {
        color: Tokens.colors.gray25,
        backgroundColor: Tokens.colors.brandDanger,
        backgroundColorHover: Tokens.colors.brandDangerLighter
      },
      config: {
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), rgba(176, 175, 194, 0.3)",
        boxShadow: "0px 2px 0px rgba(141, 132, 188, 0.2), 0px 0px 0px 1px rgba(209, 207, 234, 0.5) inset",
        border: "none",
        color: Tokens.colors.gray500,
        backgroundHover:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.4) -22.96%, rgba(255, 255, 255, 0) 123.24%), rgba(196, 201, 213, 0.8)",
        backgroundActive: Tokens.colors.purple200,
        colorHover: Tokens.colors.gray600,
        colorActive: Tokens.colors.gray25,
        boxShadowHover: "0px 2px 0px rgba(141, 132, 188, 0.4)",
        boxShadowActive: "0px 3px 0px rgba(37, 39, 59, 0.05), 0px 16px 16px -8px rgba(76, 102, 177, 0.3)"
      },
      settings: {
        color: Tokens.colors.purple300,
        colorHover: Tokens.colors.purple100,
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), rgba(176, 175, 194, 0.3)",
        backgroundHover:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.4) -22.96%, rgba(255, 255, 255, 0) 123.24%), rgba(196, 201, 213, 0.8)"
      },
      short: {
        color: Tokens.colors.gray500,
        border: "1px solid rgba(209, 207, 234, 0.5)",
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), rgba(176, 175, 194, 0.3)",
        backgroundHover:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.4) -22.96%, rgba(255, 255, 255, 0) 123.24%), rgba(196, 201, 213, 0.8)"
      }
    },
    collpase: {
      iconBackgroud: IconPlusXS
    },
    callout: {
      iconInfo: "white",
      iconInfoBackground: Tokens.colors.gray100,
      iconInfoBorder: Tokens.colors.gray200,
      iconInfoShadowColor: settingColorOpacity(Tokens.colors.gray800, 0.1),
      calloutColor: Tokens.colors.gray400,
      calloutBackground: "rgba(255,255,255,0.1)",
      calloutBorderColor: settingColorOpacity(Tokens.colors.gray100, 0.7)
    },
    card: {
      color: "#000",
      altColor: "#333",
      colorDisabled: "#999",
      background: "rgba(255, 255, 255, 0.6)",
      cardTitleColor: Tokens.colors.gray500,
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
    dropdown: {
      backgroundButtonColor: "rgba(255, 255, 255, 0.5)",
      backgroundButtonHover: "rgba(255, 255, 255, 0.75)",
      backgroundButtonActive: "rgba(255, 255, 255, 0.75)",
      textButtonColor: Tokens.colors.gray500,
      textButtonHover: Tokens.colors.gray600,
      borderButtonColor: "rgba(196, 201, 213, 0.6)",
      borderButtonHover: "rgba(196, 201, 213, 0.8)",
      borderButtonActive: Tokens.colors.purple200,
      titleColor: Tokens.colors.gray600,
      subTitleColor: Tokens.colors.gray300,
      dropdownMenu: {
        backgroundColor: "#fff",
        boxShadow: "16px 32px 32px -16px rgba(11, 2, 25, 0.2), 0px 32px 72px -32px rgba(26, 17, 46, 0.5)",
        itemTextColor: Tokens.colors.gray400,
        itemTextColorHover: Tokens.colors.gray500,
        itemBackgroundColorHover: Tokens.colors.gray25,
        itemBackgroundColorActive: Tokens.colors.purple100,
        linkColor: Tokens.colors.purple200,
        textColor: Tokens.colors.gray400
      },
      selector: {
        numberColor: Tokens.colors.gray500,
        separatorColor: settingColorOpacity(Tokens.colors.gray200, 0.5),
        labelColor: Tokens.colors.gray200,
        color: Tokens.colors.gray600,
        arrowsColor: Tokens.colors.gray300
      }
    },
    firmwareUpdatePanel: {
      backgroundContent: Tokens.colors.gray25,
      backgroundSidebar: "rgba(255,255,255,0.15)",
      neuronStatusLineColor: Tokens.colors.gray100,
      neuronStatusLineWarning: Tokens.colors.brandWarning,
      neuronStatusLineSuccess: Tokens.colors.brandSuccess,
      neuronLightMatrixWarning: "0 0 0 0 0.996078 0 0 0 0 0.792157 0 0 0 0 0.341176 0 0 0 0.5 0",
      neuronLightMatrixSuccess: "0 0 0 0 0 0 0 0 0 0.807843 0 0 0 0 0.788235 0 0 0 1 0",
      versionInstalledTitle: Tokens.colors.gray300,
      nextVersionAvaliableTitle: Tokens.colors.gray500,
      nextVersionAvaliableBadge: Tokens.colors.gray200,
      versionSuccessTitle: Tokens.colors.brandSuccess,
      versionSuccessBadge: settingColorOpacity(Tokens.colors.brandSuccess, 0.3),
      badgeBorderColor: Tokens.colors.gray50,
      badgeBorderColorActive: Tokens.colors.gray100,
      iconDropodownColor: Tokens.colors.purple200,
      backgroundStripeColor: "white",
      backgroundStripeGradientColor: "linear-gradient(90deg, #FFFFFF -9.28%, #F4F4F5 94.29%)",
      caretColor: "#F4F4F5",
      disclaimerTitle: Tokens.colors.purple200
    },
    firmwareUpdateProcess: {
      raiseSVG: RaiseFirmwareUpgrade,
      processFooterBackground: "white",
      processImageBackground: settingColorOpacity(Tokens.colors.gray25, 0.25),
      processNeuronBackground: Tokens.colors.gray25,
      neuronLineColor: Tokens.colors.gray100,
      neuronSleepingMode: Tokens.colors.gray100
    },
    form: {
      formLabelTextcolor: Tokens.colors.gray500,
      inputColor: Tokens.colors.gray400,
      inputBorder: settingColorOpacity(Tokens.colors.gray100, 0.6),
      inputBorderActive: Tokens.colors.purple200,
      inputBackgroundColor: "rgba(255,255,255,0.6)",
      inputBackgroundColorActive: "rgba(255,255,255,1)"
    },
    modal: {
      closeButton: closeButton,
      backdropColor: "rgba(214, 217, 224, 0.85)",
      background: Tokens.colors.gray25,
      titleColor: Tokens.colors.gray400,
      footerBackground: settingColorOpacity(Tokens.colors.gray200, 0.075)
    },
    navbar: {
      background: Tokens.colors.gray25,
      menuLink: {
        color: Tokens.colors.gray200,
        colorHover: Tokens.colors.gray500,
        colorActive: Tokens.colors.purple300,
        svgColor: Tokens.colors.gray400,
        svgColorActive: Tokens.colors.brandSecondary,
        svgColorHover: Tokens.colors.gray600,
        lightingOpacity: 0.5,
        gradient: "linear-gradient(236.53deg, #F0F2F4 1.37%, #D8DBF1 117.2%)"
      }
    },
    neuronConnection: {
      backgroundColor: Tokens.colors.gray25,
      titleColor: Tokens.colors.gray500,
      subTitleColor: Tokens.colors.gray200
    },
    neuronData: {
      neuronInfoBackground: "#fff",
      neuronInfoBoxShadow: `0px 4px 16px ${settingColorOpacity(Tokens.colors.purple200, 0.08)}`,
      accordionBorder: Tokens.colors.gray50,
      accordionCardBackground: "transparent",
      accordionCardBodyBackground: settingColorOpacity(Tokens.colors.gray25, 0.2),
      accordionCardHeaderColor: Tokens.colors.purple300,
      accordionCardHeaderBorderColor: settingColorOpacity(Tokens.colors.gray100, 0.2),
      plusOpacity: 1
    },
    neuronStatus: {
      neuronStatusBackgroundColor: "rgba(255, 255, 255, 0.15)",
      lineStrokeColor: settingColorOpacity(Tokens.colors.gray200, 0.4),
      lineStrokeColorConnected: "#7ACD92",
      connectionSuccessFill: "#7ACD92",
      connectionColorMatrix: "0 0 0 0 0.566745 0 0 0 0 0.898039 0 0 0 0 0.145098 0 0 0 0.5 0",
      connectionColorMatrixOnLoading: settingColorMatrix("rgba(107, 20, 249, 1)", 0.3),
      neuronNotFoundedColor: Tokens.colors.gray400,
      connectionStrokeOpacity: 0.05,
      neuronLoader: NeuronLoaderLight,
      checkedIcon: CheckedIconLight
    },
    neuronTitle: {
      heading3Color: Tokens.colors.brandSecondary,
      heading4Color: Tokens.colors.gray200
    },
    pageHeader: {
      backgroundColor: "rgba(240, 242, 244, 0.9)",
      titleColor: Tokens.colors.purple200
    },
    progress: {
      progressBackground: Tokens.colors.gray50,
      progressBarBackground: Tokens.colors.brandSuccess,
      boxShadow: "0px 0px 4px rgba(50, 238, 238, 0.5)"
    },
    slider: {
      trackColor: Tokens.colors.gray50,
      progressColor: Tokens.colors.purple200,
      handleBorderColor: Tokens.colors.gray25,
      handleBackgroundColor: Tokens.colors.purple200,
      handleBoxShadow: "rgba(97, 32, 234, 0.4)",
      labelColor: Tokens.colors.gray300
    },
    stepsBar: {
      stepBarBackground: settingColorOpacity(Tokens.colors.gray100, 0.5),
      stepBarBackgroundActive: Tokens.colors.purple200,
      bulletIconColor: Tokens.colors.gray300,
      bulletBackground: Tokens.colors.gray200,
      bulletBackgroundActive: Tokens.colors.purple300,
      bulletBorder: Tokens.colors.gray100,
      bulletBorderActive: Tokens.colors.purple200,
      bulletBoxShadow: "0px 4px 12px rgba(107, 119, 148, 0.4)",
      bulletBoxShadowActive: "0px 4px 12px #6C5CE7"
    },
    switch: {
      background:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), rgba(176, 175, 194, 0.5)",
      backgroundActive: Tokens.colors.purple300,
      thumbBackground: Tokens.colors.gray100,
      thumbBackgroundActive: Tokens.colors.gray25,
      thumbBorderColor: Tokens.colors.gray200,
      thumbBorderColorActive: Tokens.colors.purple200,
      thumbBoxShadow: "0px 4px 12px rgba(97, 32, 234, 0)",
      thumbBoxShadowActive: "0px 4px 12px rgba(97, 32, 234, 1)"
    },
    toast: {
      boxShadow: `0px 32px 32px -32px ${settingColorOpacity(Tokens.colors.gray300, 0.1)}, 0px 0px 32px ${settingColorOpacity(
        Tokens.colors.gray300,
        0.3
      )}`,
      background: Tokens.colors.gray25,
      backgroundNoStatus: Tokens.colors.gray100,
      backgroundSuccess: `linear-gradient(90deg, rgba(0, 206, 201, 0.05) -10.33%, rgba(0, 206, 201, 0) 41.03%), ${Tokens.colors.gray25}`,
      backgroundDanger: ` linear-gradient(90deg, ${settingColorOpacity(
        Tokens.colors.brandDanger,
        0.05
      )} -10.33%, ${settingColorOpacity(Tokens.colors.brandDanger, 0)} 41.03%), ${Tokens.colors.gray25}`,
      backgroundWarning: `linear-gradient(90deg, ${settingColorOpacity(
        Tokens.colors.brandWarning,
        0.05
      )} -10.33%, ${settingColorOpacity(Tokens.colors.brandWarning, 0)} 41.03%), ${Tokens.colors.gray25}`,
      defaultColorTitle: Tokens.colors.gray700,
      defaultColorBody: Tokens.colors.gray500,
      warningColorTitle: Tokens.colors.brandWarning,
      dangerColorTitle: Tokens.colors.brandPrimary,
      successColorTitle: Tokens.colors.brandSuccess
    },
    toggleButton: {
      background: "#fff"
    },
    wrapper: {
      background: settingColorOpacity(Tokens.colors.gray25, 0.8)
    }
  }
};

export default Light;
