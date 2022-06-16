import BackgroundImageDark from "../../../static/dark/darkBackground.png";
import BackgroundImageDark2x from "../../../static/dark/darkBackground-2x.png";
import CheckedIconDark from "../../../static/dark/icon-check-animated.gif";
import NeuronLoaderDark from "../../../static/dark/neuron-loader.jpg";
import closeButton from "../../../static/dark/X.svg";
import IconPlusXS from "../../../static/dark/plusIcon.svg";
import RaiseFirmwareUpgrade from "../../../static/dark/raiseFirmwareupgrade.svg";
import mouseWheelBackgroundDark from "../../../static/dark/mouseWheel.png";

import Tokens from "./Tokens";
import { RiGitBranchFill } from "react-icons/ri";

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
      cancel: settingColorOpacity(Tokens.colors.gray600, 0.5),
      save: Tokens.colors.gradient,
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
      previewButton: {
        color: Tokens.colors.gray300,
        borderColor: Tokens.colors.gray600,
        colorHover: Tokens.colors.gray200,
        borderHover: Tokens.colors.gray500,
        backgroundHover: settingColorOpacity(Tokens.colors.gray100, 0.05)
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
      configMinimal: {
        border: Tokens.colors.gray600,
        borderActive: Tokens.colors.gray500,
        color: Tokens.colors.gray300,
        colorActive: Tokens.colors.gray50,
        iconColorActive: Tokens.colors.brandSuccess,
        background: "transparent",
        backgroundActive: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) -22.96%, rgba(255, 255, 255, 0) 123.24%)"
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
      },
      buttonColor: {
        color: Tokens.colors.gray100,
        subtitleColor: Tokens.colors.gray200,
        borderColor: "#2B2B2B"
      },
      buttonMouse: {
        backgroundColor: "linear-gradient(-90deg, rgba(11, 2, 25, 0.25) 0.39%, rgba(49, 50, 74, 0.25) 74.37%)",
        backgroundColorHover:
          "linear-gradient(-90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70.91%), rgba(87, 97, 126, 0.6)",
        backgroundColorActive: Tokens.colors.purple300,
        color: "#fff",
        colorHover: "#fff",
        colorActive: "#fff"
      },
      recordButton: {
        background: settingColorOpacity(Tokens.colors.gray700, 0.3),
        backgroundHover: "linear-gradient(0deg, rgba(254, 0, 124, 0.05), rgba(254, 0, 124, 0.05)), rgba(48, 51, 73, 0.5)",
        borderColor: Tokens.colors.brandPrimary,
        borderColorResume: Tokens.colors.gray700,
        color: Tokens.colors.brandPrimary
      }
    },
    colorPanel: {
      colorTitle: Tokens.colors.gray100,
      colorPickerBase: "rgba(11, 2, 25, 0.2)",
      colorPickerBaseActive: "rgba(11, 2, 25, 0.6)",
      colorPickerBorder: "rgba(123, 134, 158, 0.1)",
      colorPickerBorderActive: Tokens.colors.purple300,
      colorPickerBorderHover: settingColorOpacity(Tokens.colors.gray300, 0.4),
      addButtonBackground: settingColorOpacity(Tokens.colors.gray600, 0.6),
      addButtonColor: Tokens.colors.gray100
    },
    collpase: {
      iconBackgroud: IconPlusXS,
      gridItemBackground: settingColorOpacity(Tokens.colors.gray500, 0.2),
      gridItemTitle: Tokens.colors.gray100,
      gridItemBody: Tokens.colors.gray300,
      gridItemCaret: Tokens.colors.gray600
    },
    callout: {
      iconInfo: "white",
      iconInfoBackground: Tokens.colors.gray700,
      iconInfoBorder: Tokens.colors.gray500,
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
    cardButtons: {
      background: settingColorOpacity(Tokens.colors.gray700, 0.5),
      color: Tokens.colors.gray200,
      titleColor: Tokens.colors.gray50,
      groupButtonsBackground: settingColorOpacity(Tokens.colors.gray900, 0.2)
    },
    customCheckbox: {
      background: Tokens.colors.gray700,
      borderColor: Tokens.colors.gray400,
      backgroundActive: Tokens.colors.brandSuccess,
      borderColorActive: Tokens.colors.brandSuccess
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
        itemBackgroundColorActive: Tokens.colors.purple200,
        linkColor: Tokens.colors.purple200,
        textColor: Tokens.colors.gray25,
        dropdownDivider: Tokens.colors.gray500
      },
      selector: {
        numberColor: Tokens.colors.gray200,
        separatorColor: settingColorOpacity(Tokens.colors.gray500, 0.5),
        labelColor: Tokens.colors.gray200,
        color: Tokens.colors.gray100,
        arrowsColor: Tokens.colors.gray300
      }
    },
    raiseKeyboard: {
      keyBase: "#303949",
      keyShadow: Tokens.colors.gray25,
      keyColorOpacity: 0.4,
      keyOnFocusBorder: "#fff",
      contentColor: "#fff",
      modifier: {
        color: Tokens.colors.gray600,
        background: "rgba(255, 255, 255, 0.6)",
        boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.15)"
      }
    },
    keyPicker: {
      iconColor: Tokens.colors.gray200,
      titleColor: Tokens.colors.gray25,
      titleSpan: Tokens.colors.gray200,
      keyMatrixShadow: settingColorMatrix("rgba(141, 132, 188, 1)", 0.1),
      keyFill: "rgba(87, 97, 126, 0.25)",
      keyFillHover: "rgba(87, 97, 126, 0.65)",
      keyFillActive: Tokens.colors.purple300,
      keyColor: Tokens.colors.gray25,
      keyColorSecondary: Tokens.colors.gray200,
      keyColorActive: Tokens.colors.gray25,
      keyStrokeColor: "transparent",
      keyStrokeColorActive: "transparent"
    },
    keyboardPicker: {
      keyBoardPickerBackground: "#25273B",
      keyEnhanceWrapperBackground: "#25273B",
      keyEnhanceWrapperBoxShadow: "0px 4px 82px rgba(0, 0, 0, 0.25), 0px 12px 62px rgba(108, 92, 231, 0.1)",
      keyEnhanceWrapperBorder: "1px solid rgba(63, 66, 90, 0.3)",
      modPickerBackground: "rgba(48, 57, 73, 0.2)",
      modPickerBoxShadow: "0 0 0 1px inset rgba(63, 66, 90, 0.3)",
      modPickerAlignAdjust: "-1px",
      keysRowBackground: "rgba(48, 51, 73, 0.6)",
      keysRowBoxShadow: "none"
    },
    keyVisualizer: {
      background: "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(63, 66, 90, 0.2) 100%), #303949",
      border: "2px solid #7879F1",
      color: Tokens.colors.gray500,
      boxShadow:
        "24px 0px 32px -12px rgba(93, 95, 239, 0.25), 0px 4px 12px rgba(0, 0, 0, 0.25), 24px 24px 52px -10px rgba(93, 95, 239, 0.25)",
      labelModifierBackground: "rgba(107, 119, 148, 0.5)",
      labelModifierColor: "#E2E4EA",
      labelBorder: "1px solid rgba(37, 40, 66, 0.55)"
    },
    firmwareUpdatePanel: {
      backgroundContent: Tokens.colors.gray800,
      backgroundSidebar: settingColorOpacity(Tokens.colors.gray400, 0.05),
      neuronStatusLineColor: Tokens.colors.gray500,
      neuronStatusLineWarning: Tokens.colors.brandWarning,
      neuronStatusLineSuccess: Tokens.colors.brandSuccess,
      neuronLightMatrixWarning: "0 0 0 0 0.996078 0 0 0 0 0.792157 0 0 0 0 0.341176 0 0 0 0.5 0",
      neuronLightMatrixSuccess: "0 0 0 0 0 0 0 0 0 0.807843 0 0 0 0 0.788235 0 0 0 1 0",
      versionInstalledTitle: Tokens.colors.gray200,
      nextVersionAvaliableTitle: Tokens.colors.gray25,
      nextVersionAvaliableBadge: Tokens.colors.gray100,
      versionSuccessTitle: Tokens.colors.brandSuccess,
      versionSuccessBadge: settingColorOpacity(Tokens.colors.brandSuccess, 0.3),
      badgeBorderColor: settingColorOpacity(Tokens.colors.gray100, 0.25),
      badgeBorderColorActive: Tokens.colors.gray100,
      iconDropodownColor: Tokens.colors.gray300,
      backgroundStripeColor: "rgba(43, 44, 67, 1)",
      backgroundStripeGradientColor: "linear-gradient(90deg, #3F425A -136.64%, #25273B 94.29%)",
      caretColor: "#25273B",
      disclaimerTitle: "white",
      fileSelected: "rgba(255,255,255,0.05)"
    },
    firmwareUpdateProcess: {
      raiseSVG: RaiseFirmwareUpgrade,
      processFooterBackground: Tokens.colors.gray800,
      processImageBackground: settingColorOpacity(Tokens.colors.gray100, 0.05),
      processNeuronBackground: Tokens.colors.gray800,
      neuronLineColor: Tokens.colors.gray600,
      neuronSleepingMode: Tokens.colors.gray600
    },
    form: {
      formLabelTextcolor: Tokens.colors.gray100,
      inputColor: Tokens.colors.gray50,
      inputBorder: Tokens.colors.gray500,
      inputBorderSolid: Tokens.colors.gray600,
      inputBorderActive: Tokens.colors.purple300,
      inputBackgroundColor: settingColorOpacity(Tokens.colors.gray900, 0.2),
      inputBackgroundColorActive: settingColorOpacity(Tokens.colors.gray900, 0.2),
      inputGroupColor: Tokens.colors.gray300,
      inputGroupBackground: "rgba(11, 2, 25, 0.2)",
      inputGroup: {
        background: "#202033"
      }
    },
    listGroup: {
      listItem: {
        background: Tokens.colors.gray700,
        backgroundHover: Tokens.colors.gray600,
        backgroundSelected: Tokens.colors.purple300,
        backgroundDisabled: settingColorOpacity(Tokens.colors.gray900, 0.1),
        color: Tokens.colors.gray25,
        colorSelected: Tokens.colors.gray25,
        colorSelectedSpan: Tokens.colors.gray50,
        colorDisabled: Tokens.colors.gray300,
        colorDisabledSpan: Tokens.colors.gray200
      }
    },
    macro: {
      tabCategoriesBackground: "rgba(43, 44, 67, 1)",
      tabContentBackground: Tokens.colors.gray800,
      tabTile: Tokens.colors.gray25,
      tabSubTitle: Tokens.colors.gray300,
      descriptionColor: Tokens.colors.gray200,
      trackingBackground: "#212235",
      timelineBackground: "#2B2C43",
      timelineHiddenTracking: "linear-gradient(90deg, rgba(33, 34, 53, 0) 0%, #212235 80%)",
      timelineHiddenTrackingBefore: "linear-gradient(-90deg, rgba(33, 34, 53, 0) 0%, #212235 80%)",
      colorTitle: Tokens.colors.gray25,
      keyMacroMiniDashboardBackground: Tokens.colors.gray700,
      keyMacroMiniDashboardBorder: "none",
      keyInfoBackground: Tokens.colors.gray800,
      keyInfoTitle: Tokens.colors.gray500,
      keyFunctionsBorder: Tokens.colors.gray700,
      keyValueColor: Tokens.colors.gray100,
      keyFunctionTile: Tokens.colors.gray50,
      previewColor: Tokens.colors.gray200,
      recordingMessageColor: Tokens.colors.gray200,
      timelineRecordTrackingBackground: settingColorOpacity(Tokens.colors.gray900, 0.3),
      timelineBarBackground: Tokens.colors.gray700,
      tabSaveButtonColor: Tokens.colors.gray400,
      tabSaveButtonBorder:
        "linear-gradient(98.12deg,#555769 0%,#303349 56.24%) padding-box, linear-gradient(90deg,#57617E 0%,#40425B 100%) border-box",
      specialKeyColor: Tokens.colors.gray400,
      timelinePointeText: Tokens.colors.gray50,
      recordMacroOptionsBackground: settingColorOpacity(Tokens.colors.gray900, 0.1),
      recordMacroOptionsBoxShadow: "0 4px 0 rgba(11, 2, 25, 0.05)",
      recordMacroOptionsTitle: Tokens.colors.gray300
    },
    macroKey: {
      background: Tokens.colors.gray500,
      backgroundColorDrag: settingColorOpacity(Tokens.colors.gray600, 0.5),
      backgroundDrag: `linear-gradient(45deg, rgba(11, 2, 25, 0.25) 25%, transparent 25%, transparent 50%, rgba(11, 2, 25, 0.25) 50%, rgba(11, 2, 25, 0.25) 75%, transparent 75%, transparent 100%)`,
      boxShadowOnDrag: "0 12px 24px rgba(11, 2, 25, 0.25)",
      color: Tokens.colors.gray50,
      colorModifier: Tokens.colors.gray600,
      backgroundHeader: "rgba(51, 53, 74, 0.3)",
      backgroundHeaderModifier: "rgba(51, 53, 74, 0.2)",
      borderColor: "rgba(63, 66, 90, 0.7)",
      borderColorModifier: "rgba(63, 66, 90, 0.15)",
      iconDragColor: Tokens.colors.gray400,
      iconDragColorModifier: Tokens.colors.gray25,
      actionIconColor: settingColorOpacity(Tokens.colors.gray25, 0.5),
      actionColorModifier: settingColorOpacity(Tokens.colors.gray600, 0.8),
      dropdownIconColor: Tokens.colors.purple100,
      dropdownIconColorModifier: Tokens.colors.gray25,
      alt: {
        background: Tokens.colors.pink200
      },
      control: {
        background: Tokens.colors.pastelShadesGreen300
      },
      delay: {
        background: Tokens.colors.brandDangerLighter,
        color: Tokens.colors.gray700,
        borderColor: "rgba(63, 66, 90, 0.3)",
        actionIconColor: settingColorOpacity(Tokens.colors.gray25, 0.85)
      },
      os: {
        background: "rgba(120, 121, 241, 1)"
      },
      shift: {
        background: Tokens.colors.brandWarningLighter,
        color: Tokens.colors.gray600,
        actionColor: settingColorOpacity(Tokens.colors.gray600, 0.6)
      }
    },
    memoryUsage: {
      color: Tokens.colors.gray300,
      borderColor: Tokens.colors.gray600,
      percentageColor: Tokens.colors.gray25,
      progressBaseColor: Tokens.colors.gray600,
      progressFill: Tokens.colors.brandSuccess,
      colorWarning: Tokens.colors.brandWarningLighter,
      colorError: Tokens.colors.brandDangerLighter
    },
    modal: {
      closeButton: closeButton,
      backdropColor: "rgba(43,44,67,0.85)",
      background: Tokens.colors.gray800,
      backgroundInner: "#2B2C43",
      titleColor: Tokens.colors.gray25,
      footerBackground: settingColorOpacity(Tokens.colors.gray900, 0.1)
    },
    mouseButtons: {
      background: "#2B2B42",
      backgroundWheelCircle: Tokens.colors.gray600,
      mouseWheel: mouseWheelBackgroundDark
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
    progress: {
      progressBackground: Tokens.colors.gray600,
      progressBarBackground: Tokens.colors.brandSuccess,
      boxShadow: "0px 0px 4px rgba(50, 238, 238, 0.5)"
    },
    slider: {
      trackColor: Tokens.colors.gray400,
      progressColor: Tokens.colors.purple300,
      handleBorderColor: Tokens.colors.gray25,
      handleBackgroundColor: Tokens.colors.purple300,
      handleBoxShadow: Tokens.colors.purple300,
      labelColor: Tokens.colors.gray200
    },
    stepsBar: {
      stepBarBackground: Tokens.colors.gray600,
      stepBarBackgroundActive: Tokens.colors.purple300,
      bulletIconColor: Tokens.colors.gray300,
      bulletBackground: Tokens.colors.gray600,
      bulletBackgroundActive: Tokens.colors.purple300,
      bulletBorder: Tokens.colors.gray800,
      bulletBorderActive: Tokens.colors.purple200,
      bulletBoxShadow: "0px 4px 12px #303949",
      bulletBoxShadowActive: "0px 4px 12px #303949"
    },
    superkeyAction: {
      color: Tokens.colors.gray500,
      background: settingColorOpacity(Tokens.colors.gray500, 0.2),
      backgroundActive: settingColorOpacity(Tokens.colors.gray500, 0.4),
      titleColor: Tokens.colors.gray25,
      descriptionColor: Tokens.colors.gray100
    },
    superkeyButton: {
      backgroundColor:
        "linear-gradient(0deg, rgba(108, 92, 231, 0.8), rgba(108, 92, 231, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      backgroundColorHover:
        "linear-gradient(0deg, rgba(108, 92, 231, 0.8), rgba(108, 92, 231, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      backgroundColorActive:
        "linear-gradient(0deg, rgba(108, 92, 231, 0.8), rgba(108, 92, 231, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      border: "2px solid #6C5CE7",
      boxShadow: "0px 4px 24px rgba(108, 92, 231, 0.65)",
      boxShadowHover: "0px 4px 12px rgba(108, 92, 231, 0.1)",
      backgroundColorInner:
        "linear-gradient(0deg, rgba(108, 92, 231, 0.3), rgba(108, 92, 231, 0.3)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      backgroundColorInnerActive:
        "linear-gradient(0deg, rgba(108, 92, 231, 0.3), rgba(108, 92, 231, 0.3)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      boxShadowInner: "0px 4px 24px rgba(108, 92, 231, 0.65)",
      colorInner: Tokens.colors.gray25
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
    tab: {
      color: Tokens.colors.gray200,
      colorHover: Tokens.colors.gray25,
      colorActive: Tokens.colors.gray25,
      backgroundHover:
        "linear-gradient(260.58deg, rgba(240, 242, 244, 0.05) -23.66%, rgba(255, 255, 255, 0) 38.79%), rgba(18, 19, 36, 0.15)",
      backgroundActive:
        "linear-gradient(278.53deg, rgba(240, 242, 244, 0.12) -19.7%, rgba(255, 255, 255, 0) 41.94%), rgba(18, 19, 36, 0.6)",
      lightOpacity: 1
    },
    tabButton: {
      background: "rgba(28, 29, 48, 0.2)",
      backgroundHover: "rgba(28, 29, 48, 0.4)",
      color: Tokens.colors.gray50,
      colorHover: Tokens.colors.gray25,
      svgColor: Tokens.colors.gray300,
      svgHover: Tokens.colors.brandDanger
    },
    toast: {
      boxShadow: "0px 32px 32px -32px rgba(0, 0, 0, 0.25), 0px 0px 32px rgba(0, 0, 0, 0.25)",
      background: Tokens.colors.gray800,
      backgroundNoStatus: Tokens.colors.gray600,
      backgroundSuccess: `linear-gradient(90deg, rgba(0, 206, 201, 0.25) -10.33%, rgba(0, 206, 201, 0) 41.03%), ${Tokens.colors.gray800}`,
      backgroundDanger: `linear-gradient(90deg, ${settingColorOpacity(
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
    toogleEditMode: {
      titleColor: Tokens.colors.gray500,
      containerBackground: settingColorOpacity(Tokens.colors.gray900, 0.25),
      containerBorder: "1px solid transparent",
      buttonColor: Tokens.colors.gray200,
      buttonColorHover: Tokens.colors.gray25,
      buttonColorActive: Tokens.colors.gray25,
      buttonBackground: "linear-gradient(90deg, rgba(255, 255, 255, 0.02) -11.11%, rgba(255, 255, 255, 0) 73.86%)",
      buttonBackgroundHover: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) -11.11%, rgba(255, 255, 255, 0) 73.86%)",
      buttonBackgroundActive: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) -11.11%, rgba(255, 255, 255, 0) 73.86%), #57617E",
      buttonBoxShadow: "0px 12px 24px -12px rgba(93, 95, 239, 0.1)"
    },
    wrapper: {
      background: settingColorOpacity(Tokens.colors.gray400, 0.15)
    }
  }
};

export default Dark;
