import BackgroundImageLight from "../../../static/light/lightBackground.png";
import BackgroundImageLight2x from "../../../static/light/lightBackground-2x.png";
import NeuronLoaderLight from "../../../static/light/neuron-loader.jpg";
import CheckedIconLight from "../../../static/dark/icon-check-animated.gif";
import closeButton from "../../../static/light/X.svg";
import IconPlusXS from "../../../static/light/plusIcon.svg";
import RaiseFirmwareUpgrade from "../../../static/light/raiseFirmwareupgrade.svg";
import mouseWheelBackground from "../../../static/light/mouseWheel.png";

import Tokens from "./Tokens";

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
      cancel: settingColorOpacity(Tokens.colors.gray25, 0.25),
      save: Tokens.colors.gradient,
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
      previewButton: {
        color: Tokens.colors.gray400,
        borderColor: Tokens.colors.gray50,
        colorHover: Tokens.colors.gray600,
        borderHover: Tokens.colors.gray100,
        backgroundHover: settingColorOpacity(Tokens.colors.gray100, 0.05)
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
      configMinimal: {
        border: Tokens.colors.gray100,
        borderActive: Tokens.colors.purple200,
        color: Tokens.colors.gray300,
        colorActive: Tokens.colors.purple200,
        iconColorActive: Tokens.colors.purple200,
        background: "transparent",
        backgroundActive: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) -22.96%, rgba(255, 255, 255, 0) 123.24%)"
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
      },
      buttonColor: {
        color: Tokens.colors.gray500,
        subtitleColor: Tokens.colors.gray300,
        borderColor: Tokens.colors.gray500
      },
      buttonMouse: {
        backgroundColor: "linear-gradient(269.56deg, rgba(87, 97, 126, 0.25) 0.39%, rgba(226, 228, 234, 0.25) 74.37%)",
        backgroundColorHover: "linear-gradient(270deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70.91%), #C4C9D5",
        backgroundColorActive: Tokens.colors.purple300,
        color: Tokens.colors.gray500,
        colorHover: Tokens.colors.gray500,
        colorActive: "#fff"
      },
      recordButton: {
        background: settingColorOpacity(Tokens.colors.gray25, 0.5),
        backgroundHover: "linear-gradient(0deg, rgba(254, 0, 124, 0.05), rgba(254, 0, 124, 0.05)), rgba(240, 242, 244, 0.5)",
        borderColor: Tokens.colors.brandPrimary,
        borderColorResume: Tokens.colors.gray400,
        color: Tokens.colors.brandPrimary
      }
    },
    colorPanel: {
      colorTitle: Tokens.colors.gray500,
      colorPickerBase: "linear-gradient(270deg, #FFFFFF 0%, #F0F2F4 100%)",
      colorPickerBaseActive: "linear-gradient(270deg, #FFFFFF 0%, #F0F2F4 100%)",
      colorPickerBorder: Tokens.colors.gray100,
      colorPickerBorderActive: Tokens.colors.purple200,
      colorPickerBorderHover: Tokens.colors.gray200,
      addButtonBackground:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), rgba(176, 175, 194, 0.3)",
      addButtonColor: Tokens.colors.gray500
    },
    collpase: {
      iconBackgroud: IconPlusXS,
      gridItemBackground: "rgba(255,255,255, 0.3)",
      gridItemTitle: Tokens.colors.gray400,
      gridItemBody: Tokens.colors.gray300,
      gridItemCaret: Tokens.colors.gray25
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
    cardButtons: {
      background: "rgba(255, 255, 255, 0.6)",
      color: Tokens.colors.gray300,
      titleColor: Tokens.colors.gray500,
      groupButtonsBackground: "rgba(255,255,255,1)"
    },
    customCheckbox: {
      background: Tokens.colors.gray100,
      borderColor: Tokens.colors.gray100,
      backgroundActive: Tokens.colors.brandSuccess,
      borderColorActive: Tokens.colors.brandSuccess
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
        textColor: Tokens.colors.gray400,
        dropdownDivider: Tokens.colors.gray25
      },
      selector: {
        numberColor: Tokens.colors.gray500,
        separatorColor: settingColorOpacity(Tokens.colors.gray200, 0.5),
        labelColor: Tokens.colors.gray200,
        color: Tokens.colors.gray600,
        arrowsColor: Tokens.colors.gray300
      }
    },
    raiseKeyboard: {
      keyBase: "#E2E4EA",
      keyShadow: Tokens.colors.gray600,
      keyColorOpacity: 0.65,
      keyOnFocusBorder: "#000",
      contentColor: Tokens.colors.gray700,
      modifier: {
        color: Tokens.colors.gray25,
        background: "rgba(63, 66, 90, 0.6)",
        boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.15)"
      }
    },
    keyPicker: {
      iconColor: Tokens.colors.gray200,
      titleColor: Tokens.colors.gray200,
      titleSpan: Tokens.colors.gray500,
      keyMatrixShadow: settingColorMatrix("rgba(141, 132, 188, 1)", 0.1),
      keyFill: "rgba(176, 175, 194, 0.3)",
      keyFillHover: "rgba(196, 201, 213, 0.8)",
      keyFillActive: Tokens.colors.purple300,
      keyColor: Tokens.colors.gray500,
      keyColorSecondary: Tokens.colors.gray300,
      keyColorActive: Tokens.colors.gray25,
      keyStrokeColor: "rgba(209, 207, 234, 0.5)",
      keyStrokeColorActive: Tokens.colors.purple300
    },
    keyboardPicker: {
      keyBoardPickerBackground: Tokens.colors.gray25,
      keyEnhanceWrapperBackground: Tokens.colors.gray25,
      keyEnhanceWrapperBoxShadow: "32px 32px 64px -12px rgba(11, 2, 25, 0.1), 32px 32px 72px -32px rgba(26, 17, 46, 0.2)",
      keyEnhanceWrapperBorder: "none",
      modPickerBackground: "rgba(255, 255, 255, 0.6)",
      modPickerBoxShadow: "none",
      modPickerAlignAdjust: "0",
      keysRowBackground: "#fff",
      keysRowBoxShadow: "0px 4px 16px rgba(120, 121, 241, 0.08)"
    },
    keyVisualizer: {
      background: "linear-gradient(90deg, rgba(196, 201, 213, 0.2) 26.28%, rgba(63, 66, 90, 0.2) 124.24%)",
      border: "2px solid #A29BFE",
      color: Tokens.colors.gray500,
      boxShadow:
        "24px 0px 32px -12px rgba(93, 95, 239, 0.25), 0px 4px 12px rgba(0, 0, 0, 0.25), 24px 24px 52px -10px rgba(93, 95, 239, 0.25)",
      labelModifierBackground: "rgba(107, 119, 148, 0.5)",
      labelModifierColor: "#fff",
      labelBorder: "1px solid rgba(37, 40, 66, 0.1)"
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
      disclaimerTitle: Tokens.colors.purple200,
      fileSelected: settingColorOpacity(Tokens.colors.gray300, 0.05)
    },
    firmwareUpdateProcess: {
      raiseSVG: RaiseFirmwareUpgrade,
      processFooterBackground: settingColorOpacity(Tokens.colors.gray25, 0.8),
      processImageBackground: settingColorOpacity(Tokens.colors.gray25, 0.5),
      processNeuronBackground: settingColorOpacity(Tokens.colors.gray25, 0.8),
      neuronLineColor: Tokens.colors.gray100,
      neuronSleepingMode: Tokens.colors.gray100
    },
    form: {
      formLabelTextcolor: Tokens.colors.gray500,
      inputColor: Tokens.colors.gray400,
      inputBorder: settingColorOpacity(Tokens.colors.gray100, 0.6),
      inputBorderSolid: "rgba(196, 201, 213, 0.6)",
      inputBorderActive: Tokens.colors.purple200,
      inputBackgroundColor: "#F9FAFB",
      inputBackgroundColorActive: "rgba(255,255,255,1)",
      inputGroupColor: Tokens.colors.gray300,
      inputGroupBackground: Tokens.colors.gray25,
      inputGroup: {
        background: "#F9FAFB"
      }
    },
    listGroup: {
      listItem: {
        background: Tokens.colors.gray50,
        backgroundHover: Tokens.colors.gray100,
        backgroundSelected: Tokens.colors.purple200,
        backgroundDisabled: Tokens.colors.gray25,
        color: Tokens.colors.gray500,
        colorSelected: Tokens.colors.gray25,
        colorSelectedSpan: Tokens.colors.gray50,
        colorDisabled: Tokens.colors.gray200,
        colorDisabledSpan: Tokens.colors.gray300
      }
    },
    macro: {
      tabCategoriesBackground: Tokens.colors.gray50,
      tabContentBackground: Tokens.colors.gray25,
      tabTile: Tokens.colors.gray500,
      tabSubTitle: Tokens.colors.gray300,
      descriptionColor: Tokens.colors.gray400,
      trackingBackground: Tokens.colors.gray25,
      timelineBackground: "rgba(255, 255, 255, 0.8)",
      timelineHiddenTracking: "linear-gradient(90deg, rgba(240, 242, 244, 0) 0%, #F0F2F4 72.31%)",
      timelineHiddenTrackingBefore: "linear-gradient(-90deg, rgba(240, 242, 244, 0) 0%, #F0F2F4 72.31%)",
      colorTitle: Tokens.colors.gray500,
      keyMacroMiniDashboardBackground: settingColorOpacity(Tokens.colors.gray25, 0.4),
      keyMacroMiniDashboardBorder: `1px solid ${settingColorOpacity(Tokens.colors.gray50, 0.75)}`,
      keyInfoBackground: settingColorOpacity(Tokens.colors.gray50, 0.4),
      keyInfoTitle: Tokens.colors.gray300,
      keyFunctionsBorder: Tokens.colors.gray50,
      keyValueColor: Tokens.colors.gray600,
      keyFunctionTile: Tokens.colors.gray500,
      previewColor: Tokens.colors.gray200,
      recordingMessageColor: Tokens.colors.gray300,
      timelineRecordTrackingBackground: settingColorOpacity(Tokens.colors.gray100, 0.35),
      timelineBarBackground: Tokens.colors.gray100,
      tabSaveButtonColor: Tokens.colors.gray200,
      tabSaveButtonBorder: `linear-gradient(98.12deg, ${Tokens.colors.gray50} 0%, ${Tokens.colors.gray25} 56.24%) padding-box, linear-gradient(90deg, ${Tokens.colors.gray100} 0%, ${Tokens.colors.gray50}  100%) border-box`,
      specialKeyColor: Tokens.colors.gray400,
      timelinePointeText: Tokens.colors.gray400,
      recordMacroOptionsBackground: settingColorOpacity(Tokens.colors.gray100, 0.15),
      recordMacroOptionsBoxShadow: "0 2px 0 rgba(151,160,180,0.1)",
      recordMacroOptionsTitle: Tokens.colors.gray200
    },
    macroKey: {
      background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), #DADDE4",
      backgroundColorDrag: settingColorOpacity(Tokens.colors.gray100, 0.5),
      backgroundDrag: `linear-gradient(45deg, rgba(11, 2, 25, 0.05) 25%, transparent 25%, transparent 50%, rgba(11, 2, 25, 0.05) 50%, rgba(11, 2, 25, 0.05) 75%, transparent 75%, transparent 100%)`,
      boxShadowOnDrag: "0 12px 24px rgba(11, 2, 25, 0.25)",
      color: Tokens.colors.gray50,
      colorModifier: Tokens.colors.gray600,
      backgroundHeader: "rgba(51, 53, 74, 0.1)",
      backgroundHeaderModifier: "rgba(51, 53, 74, 0.2)",
      borderColor: Tokens.colors.gray100,
      borderColorModifier: "rgba(63, 66, 90, 0.15)",
      iconDragColor: Tokens.colors.gray200,
      iconDragColorModifier: Tokens.colors.gray25,
      actionIconColor: settingColorOpacity(Tokens.colors.gray500, 0.6),
      actionColorModifier: settingColorOpacity(Tokens.colors.gray600, 0.8),
      dropdownIconColor: Tokens.colors.purple200,
      dropdownIconColorModifier: Tokens.colors.gray25,
      alt: {
        background: "linear-gradient(90deg, rgba(206, 207, 222, 0.2) 21.15%, rgba(123, 134, 158, 0.2) 100%), #F178B6"
      },
      altGr: {
        background: "linear-gradient(90deg, rgba(206, 207, 222, 0.2) 21.15%, rgba(123, 134, 158, 0.2) 100%), #A1BC5E"
      },
      control: {
        background: "linear-gradient(90deg, rgba(206, 207, 222, 0.2) 21.15%, rgba(123, 134, 158, 0.2) 100%), #35C2D5"
      },
      delay: {
        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), #FF6B6B",
        color: Tokens.colors.gray700,
        borderColor: "rgba(63, 66, 90, 0.3)",
        actionIconColor: settingColorOpacity(Tokens.colors.gray25, 0.85)
      },
      os: {
        background: "linear-gradient(90deg, rgba(206, 207, 222, 0.2) 21.15%, rgba(123, 134, 158, 0.2) 100%), #7879F1"
      },
      shift: {
        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 21.15%, rgba(255, 255, 255, 0) 100%), #FECA57",
        color: Tokens.colors.gray600,
        actionColor: settingColorOpacity(Tokens.colors.gray600, 0.6)
      }
    },
    memoryUsage: {
      color: Tokens.colors.gray200,
      borderColor: Tokens.colors.gray50,
      percentageColor: Tokens.colors.gray500,
      progressBaseColor: Tokens.colors.gray100,
      progressFill: Tokens.colors.brandSuccess,
      colorWarning: Tokens.colors.brandWarning,
      colorError: Tokens.colors.brandDanger
    },
    modal: {
      closeButton: closeButton,
      backdropColor: "rgba(214, 217, 224, 0.85)",
      background: Tokens.colors.gray25,
      backgroundInner: "#fff",
      titleColor: Tokens.colors.gray400,
      footerBackground: settingColorOpacity(Tokens.colors.gray200, 0.075)
    },
    mouseButtons: {
      background: Tokens.colors.gray50,
      backgroundWheelCircle: Tokens.colors.gray50,
      mouseWheel: mouseWheelBackground
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
      // lineStrokeColorConnected: "#7ACD92",
      lineStrokeColorConnected: Tokens.colors.purple200,
      connectionSuccessFill: Tokens.colors.purple200,
      connectionColorMatrix: settingColorMatrix(Tokens.colors.purple200, 0.3),
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
    superkeyAction: {
      color: Tokens.colors.gray400,
      background: settingColorOpacity(Tokens.colors.gray25, 0.7),
      backgroundActive: settingColorOpacity(Tokens.colors.gray25, 1),
      titleColor: Tokens.colors.gray400,
      descriptionColor: Tokens.colors.gray400
    },
    superkeyButton: {
      backgroundColor:
        "linear-gradient(0deg, rgba(120, 121, 241, 0.8), rgba(120, 121, 241, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      backgroundColorHover:
        "linear-gradient(0deg, rgba(120, 121, 241, 0.8), rgba(120, 121, 241, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      backgroundColorActive:
        "linear-gradient(0deg, rgba(120, 121, 241, 0.8), rgba(120, 121, 241, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949",
      border: "2px solid #7879F1",
      boxShadow: "0px 4px 24px rgba(120, 121, 241, 0.65)",
      boxShadowHover: "0px 4px 24px rgba(120, 121, 241, 0.1)",
      backgroundColorInner:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(120, 121, 241, 0.3), rgba(120, 121, 241, 0.3)), #E2E4EA",
      backgroundColorInnerActive:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(120, 121, 241, 0.3), rgba(120, 121, 241, 0.3)), #E2E4EA",
      boxShadowInner: "0px 4px 24px rgba(120, 121, 241, 0.65)",
      colorInner: Tokens.colors.gray600
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
    tab: {
      color: Tokens.colors.gray500,
      colorHover: Tokens.colors.gray600,
      colorActive: Tokens.colors.purple300,
      backgroundHover: "linear-gradient(122.87deg, rgba(238, 241, 248, 0.2) 52.49%, rgba(255, 255, 255, 0.2) 99.24%)",
      backgroundActive: "linear-gradient(122.87deg, rgba(238, 241, 248, 0.7) 52.49%, rgba(255, 255, 255, 0.7) 99.24%)",
      lightOpacity: 0.5
    },
    tabButton: {
      background: settingColorOpacity(Tokens.colors.gray25, 0.2),
      backgroundHover: Tokens.colors.gray25,
      color: Tokens.colors.gray500,
      colorHover: Tokens.colors.gray600,
      svgColor: Tokens.colors.gray300,
      svgHover: Tokens.colors.brandDanger
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
    toogleEditMode: {
      titleColor: Tokens.colors.gray300,
      containerBackground: "rgba(255, 255, 255, 0.3)",
      containerBorder: "1px solid rgba(196, 201, 213, 0.5)",
      buttonColor: Tokens.colors.gray400,
      buttonColorHover: Tokens.colors.gray500,
      buttonColorActive: Tokens.colors.gray25,
      buttonBackground:
        "linear-gradient(90deg, rgba(240, 242, 244, 0) 7.92%, rgba(240, 242, 244, 0.4) 73.86%), rgba(162, 155, 254, 0.05)",
      buttonBackgroundHover:
        "linear-gradient(90deg, rgba(240, 242, 244, 0) 7.92%, rgba(240, 242, 244, 0.4) 73.86%), rgba(162, 155, 254, 0.2)",
      buttonBackgroundActive: "linear-gradient(90deg, rgba(255, 255, 255, 0.4) -22.96%, rgba(255, 255, 255, 0) 123.24%), #7879F1",
      buttonBoxShadow: "0px 12px 24px -12px rgba(93, 95, 239, 0.1)"
    },
    wrapper: {
      background: settingColorOpacity(Tokens.colors.gray25, 0.8)
    }
  }
};

export default Light;
