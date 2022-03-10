import { createGlobalStyle } from "styled-components";

import LibreFranklin from "./fonts/LibreFranklin/LibreFranklin-VariableFont_wght.ttf";
import LibreFranklinItalic from "./fonts/LibreFranklin/LibreFranklin-Italic-VariableFont_wght.ttf";

import iconChevronDown from "../../../static/base/icon-arrow--chevron-down.svg";

const NavWidth = "64";

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: "Libre Franklin";
    font-weight: 100 900;
    font-style: normal;
    src: url(${LibreFranklin}) format("truetype");
  }

  @font-face {
    font-family: "Libre Franklin";
    font-weight: 100 900;
    font-style: italic;
    src: url(${LibreFranklinItalic}) format("truetype");
  }
  
  body {
    background: ${({ theme }) => theme.colors.body};
    font-weight: 600;
    background-image: url(${({ theme }) => theme.body.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};;
    transition: all 0.50s linear;
    text-rendering: optimizeLegibility;
    font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2), 
  (min-resolution: 192dpi) { 
      body {
        background-image: url(${({ theme }) => theme.body.backgroundImage2x});
      }
  }

  div.main-container{
    padding-left: calc(90px + 8px);
    padding-right: 8px;
    transition: all 0.50s linear;
    // overflow: auto;
    height: 100vh;
  }
  .wrapper {
    margin-top: 2px;
    padding-left: 17px;
    padding-right: 17px;
  }
  .wrapperBackground {
    background-color: ${({ theme }) => theme.styles.wrapper.background};
    padding-bottom: 8px;
    margin-bottom: 32px;
    border-radius: 0 0 16px 16px;
  }

  div.title-row{
    .section-title{
      margin 0;
      padding: 0.5em 1em;
      color: rgb(165,103,181);

    }
  }

  nav {
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer;
  }

  .marginCenter {
    .spinner-border {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
    
  }
.loading {
  color: ${({ theme }) => theme.colors.purple300};
}
  .longtooltip > .tooltip-inner {
    max-width: 100%;
  }

  .tooltip.show {
    opacity: 1;
  }

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.button.background};
    color: #FFFFFF;
  }


  button.btn-primary, button.btn{
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
    border: none;
  }
  .btn-primary:hover {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.hover};
    border: none;
  }
  .btn-primary:disabled, &.btn-primary.disabled {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.disabled};
    border: none;
  }
  .btn-primary:not(:disabled):not(.disabled).active {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.active};
    border: none;
  }
  .btn-primary.focus, .btn-primary:focus{
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.hover};
    border-color: ${({ theme }) => theme.colors.button.background};
    box-shadow: none;
  }
  .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle  {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.active};
    border-color: ${({ theme }) => theme.colors.button.background};
    box-shadow: ${({ theme }) => theme.colors.button.boxShadow};
  }
  .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
    box-shadow: ${({ theme }) => theme.colors.button.boxShadow};
}

svg text{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
// 
// Typography
// 
.displayLg {
	font-size:81px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.displayMd {
	font-size:54px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.headingH1 {
	font-size:36px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.headingH2 {
	font-size:24px;
	font-family:"Libre Franklin";
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.headingH3 {
	font-size:21px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.headingH4 {
	font-size:18px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.headingH5 {
	font-size:12px;
	font-weight:600;
	line-height:125%;
	letter-spacing:0.04em;
	text-decoration:none;
}
.paragraphRegular {
	font-size:16px;
	font-family:"Libre Franklin";
	font-weight:400;
	font-style:normal;
	line-height:150%;
	text-decoration:none;
}
.paragraphSmall {
	font-size:14px;
	font-weight:400;
	font-style:normal;
	line-height:150%;
	text-decoration:none;
}
.paragraphMicro {
	font-size:12px;
	font-weight:400;
	line-height:150%;
	text-decoration:none;
}

// 
// Components
// 
.simpleAccordion {
  background-color: ${({ theme }) => theme.styles.accordion.background};
  border-radius: 3px;
  margin-top: 24px;
  .card {
    background:transparent;
  } 
  .card .card-header {
    background: transparent;
    color: ${({ theme }) => theme.colors.purple300};
    font-size: 13px;
    font-weight: 600;
  }
  .accordionTitle {
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      display: inline-block;
      margin-left: 8px;
      background: url(${({ theme }) => theme.styles.collpase.iconBackgroud});
    }
  }
  .cardContent {
    padding-left: 24px;
    padding-right: 24px;
  }
}
.accordion .card {
  border-radius: 6px;
  padding: 0;
}
.accordion .card .card-header{
  
}
.button {
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5em;
  padding: 14px 24px;
  border-radius: 6px;
  display: inline-block;
  transition: all 250ms ease-in-out;
}
.button:hover {
  cursor: pointer;
}
.button[disabled]:hover {
  cursor: not-allowed;
}
.button.sm {
  padding: 9px 24px;
}

.button .buttonLabel {
  position: relative;
  z-index: 2;
}
.button.primary {
  color: #fff;
  background: ${({ theme }) => theme.styles.button.primary.backgroundColor};
  position: relative;
}
.button.primary[disabled] {
  background: ${({ theme }) => theme.styles.button.primary.disabledBackgroundColor};
  color: ${({ theme }) => theme.styles.button.primary.disabledTextColor};
}
.button.danger {
  background: ${({ theme }) => theme.styles.button.danger.backgroundColor};
  color: ${({ theme }) => theme.styles.button.danger.color};
}
.button.danger:hover {
  background: ${({ theme }) => theme.styles.button.danger.backgroundColorHover};
  color: ${({ theme }) => theme.styles.button.danger.color};
}
.button.outline {
  color: ${({ theme }) => theme.styles.button.outline.color};
  border: 1px solid ${({ theme }) => theme.styles.button.outline.borderColor};
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.styles.button.outline.borderColor} inset;
  transition-property: border, box-shadow, background;
  transition: 300ms ease-in-out;
}
.button.outline:hover {
  border: 1px solid ${({ theme }) => theme.styles.button.outline.borderColorHover};
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.styles.button.outline.boxShadowColorHover} inset;
  background-color: rgba(255,255,255,0.05);
}
.button.outline[disabled] {
  opacity: ${({ theme }) => theme.styles.button.outline.disabledOpacity}; 
  color: ${({ theme }) => theme.styles.button.outline.disabledTextColor};
  border: 1px solid ${({ theme }) => theme.styles.button.outline.disabledBorderColor};
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.styles.button.outline.disabledBoxShadowColor} inset;
}

.button.outline.gradient {
  color: ${({ theme }) => theme.styles.button.outlineGradient.color};
  border: none;
  box-shadow: none;
  transition-property: border, box-shadow, background;
  transition: 300ms ease-in-out;
  position: relative;
}
.button.outline.gradient .buttonLabel{
  z-index: 2;
  position: relative;
}

.button.outline.gradient:before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: -1px; 
  border-radius: 6px;
  background: ${({ theme }) => theme.styles.button.outlineGradient.background};
  border: 2px solid transparent;
}

.buttonFX {
  position: absolute;
  z-index: 0;
  width: 100px;
  height: 32px;
  bottom: 2px;
  left: 50%;
  transform: translate3d(-50%,0, 0);
  transition: all 200ms ease-in-out;
  opacity: 0.5;
}
.button.primary:not([disabled]) .buttonFX,
.button.outline.gradient .buttonFX {
  filter: blur(2px);
  background: ${({ theme }) => theme.colors.gradient};
}
.button.primary:not([disabled]):hover .buttonFX,
.button.outline.gradient:hover .buttonFX {
  bottom: -5px;
  filter: blur(15px);
}

.button-config {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.03em;
  padding: 8px 16px;
  border: ${({ theme }) => theme.styles.button.config.border} 
  color: ${({ theme }) => theme.styles.button.config.color}; 
  background: ${({ theme }) => theme.styles.button.config.background};
  border: none;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.styles.button.config.boxShadow};
  transition: all 300ms ease-in-out;
}
.button-config.sm {
  padding: 6px 16px;
  font-size: 14px;
}
.button-config.sm svg {
  max-width: 16px;
}
.button-config:hover {
  cursor: pointer;
  color: ${({ theme }) => theme.styles.button.config.colorHover}; 
  background: ${({ theme }) => theme.styles.button.config.backgroundHover};
  box-shadow: ${({ theme }) => theme.styles.button.config.boxShadowHover};
}
.button-config.active,
.button-config.active:hover {
  color: ${({ theme }) => theme.styles.button.config.colorActive}; 
  background: ${({ theme }) => theme.styles.button.config.backgroundActive};
  box-shadow: ${({ theme }) => theme.styles.button.config.boxShadowActive};
}

.button-config.link {
  box-shadow: none;
  border: none;
  background: transparent;
}
.button-config.link:hover {
  box-shadow: none;
  border: none;
  background: transparent;
}
.button.short {
  padding: 6px 16px;
  border-radius: 4px;
  line-height: 2em;
  border: ${({ theme }) => theme.styles.button.short.background};
  background: ${({ theme }) => theme.styles.button.short.background};
}
.button.short:hover {
  background: ${({ theme }) => theme.styles.button.short.backgroundHover};
}
.button.short.danger {
  background: ${({ theme }) => theme.styles.button.danger.backgroundColor};
  color: ${({ theme }) => theme.styles.button.danger.color};
}
.button.short.danger:hover {
  background: ${({ theme }) => theme.styles.button.danger.backgroundColorHover};
  color: ${({ theme }) => theme.styles.button.danger.color};
}
.dropdown-toggle.btn.btn-primary {
  background: ${({ theme }) => theme.styles.dropdown.backgroundButtonColor};
  border: 1px solid ${({ theme }) => theme.styles.dropdown.borderButtonColor};
  border-radius: 6px;
  width: 100%;
  padding: 12px 16px;
  position: relative;
  box-shadow: none;
  text-align: left;
  font-weight: 600;
}
.dropdown.show .dropdown-toggle.btn.btn-primary,
.dropdown-toggle.btn.btn-primary:hover {
  border: 1px solid ${({ theme }) => theme.styles.dropdown.borderButtonActive};
  background: ${({ theme }) => theme.styles.dropdown.backgroundButtonColor};
  box-shadow: none;
}
.btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
  box-shadow: none;
}

.dropdown-toggle.btn.btn-primary:hover {
  background: ${({ theme }) => theme.styles.dropdown.backgroundButtonHover};
  border: 1px solid ${({ theme }) => theme.styles.dropdown.borderButtonHover};
  box-shadow: none;
}
.dropdown-toggle::after {
  border: none;
  position: absolute;
  right: 16px;
  top: 50%;
  width: 12px;
  height: 12px;
  background-image: url(${iconChevronDown});
  background-size: cover;
  transform: translate3d(0, -50%, 0);
}
.dropdownInner,
.dropdownItemSelected {
  display: flex;
  align-items: center;
  text-align: left;
} 
.dropdownIcon {
  flex: 0 0 24px;
}

.dropdown-menu {
  padding: 14px 8px;
  background: ${({ theme }) => theme.styles.dropdown.dropdownMenu.backgroundColor};
  box-shadow: ${({ theme }) => theme.styles.dropdown.dropdownMenu.boxShadow};
  border-radius: 6px;
  border: none;
}
.dropdown-item {
  padding: 8px;
  border-radius: 6px; 
  margin: 2px 0;
  color: ${({ theme }) => theme.styles.dropdown.dropdownMenu.itemTextColor};
  font-weight: 600;
  font-size: 14px; 
}
.dropdown-item:hover {
  color: ${({ theme }) => theme.styles.dropdown.dropdownMenu.itemTextColorHover};
  background: ${({ theme }) => theme.styles.dropdown.dropdownMenu.itemBackgroundColorHover};
}
.dropdown-item.active,
.dropdown-item.active:hover {
  color: #fff;
  background: ${({ theme }) => theme.styles.dropdown.dropdownMenu.itemBackgroundColorActive};
}

.dropdown-menu .dropdown-item.active h3,
.dropdown-menu .dropdown-item.active h4 {
  color: #fff;
}

.dropdownMultipleActions {
  position: relative;
}
.dropdownList {
  border: none;
}
.dropdownListInner {
  display: flex;
  flex-wrap: nowrap;
}
.dropdownListNumber {
  align-self: center;
  width: 32px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.03em;
  position: relative;
  color: ${({ theme }) => theme.styles.dropdown.selector.numberColor};
}
.dropdownListNumber:after {
  content: '';
  width: 1px;
  height: 34px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  background-color: ${({ theme }) => theme.styles.dropdown.selector.separatorColor};
}
.dropdownListItem {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 32px);
  padding-left: 12px;
  line-height: 1.25em;
}
.dropdownListItemInner {
  position: relative;
  padding-right: 60px;
  width: 100%;
}
.dropdownListItemInner .caret {
  position: absolute;
  right: 42px;
  top: 50%;
  transform: translate3d(0,-50%, 0) scale(0.8);
  color: ${({ theme }) => theme.styles.dropdown.selector.arrowsColor};
}
.dropdownListItemLabel {
  letter-spacing: -0.03em;
  font-size: 13px; 
  color: ${({ theme }) => theme.styles.dropdown.selector.labelColor};
}
.dropdownListItemSelected {
  color: ${({ theme }) => theme.styles.dropdown.selector.color}
}

.dropdownMultipleActions .dropdownActions {
  position: absolute;
  right: 4px;
  top: 4px;
}
.dropdownMultipleActions .dropdown-toggle.btn.btn-primary {
  padding: 8px 16px;
  margin: 0;
}
.dropdownMultipleActions .dropdown-toggle.btn.btn-primary:after {
  content: none;
}

.dropdown-toggle.btn.btn-primary.button-settings {
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  text-align: center;
  border-radius: 4px;
  color: ${({ theme }) => theme.styles.button.settings.color};
  background: ${({ theme }) => theme.styles.button.settings.background};
}
.dropdown.show .dropdown-toggle.btn.btn-primary.button-settings,
.dropdown-toggle.btn.btn-primary.button-settings:hover {
  border: none;
  color: ${({ theme }) => theme.styles.button.settings.colorHover};
  background: ${({ theme }) => theme.styles.button.settings.backgroundHover};
}

.dropdownInner {
  display: flex;
  flex-wrap: nowrap;
}
.dropdownInner .dropdownIcon {
  flex: 0 0 32px; 
}
.dropdownInner .dropdownItem {
  flex: calc(100% -32px);
}
.buttonToggler.dropdown-toggle.btn.btn-primary{
  background-color: transparent;
  border: none; 
  width: 36px;
  padding: 12px 0;
  margin-top: 0;
  text-align: center;
  &:after{
    content: none;
  } 
}
.dropdownWithContent {
  .dropdownMenuPadding {
    padding: 8px 4px;
    color: ${({ theme }) => theme.styles.dropdown.dropdownMenu.textColor};
    font-size: 12px;
    a {
      color: ${({ theme }) => theme.styles.dropdown.dropdownMenu.linkColor};
    }
    .button {
      white-space: nowrap;
    }
  }
}

.tooltip .tooltip-inner{
  padding: 12px;
  /* background-color: ${({ theme }) => theme.styles.card.background}; */
  font-weight: 600;
  font-size: 13px;
}
.tooltip .tooltip-inner h5{
  font-weight: 600;
  font-size: 18px;
}
.tooltip .tooltip-inner ul {
  padding-left: 16px;
}
.tooltip .tooltip-inner ul li+li{
  margin-top: 8px;
}
.tooltip.tooltipWide .tooltip-inner{
  max-width: 364px!important;
  font-weight: 500;
  font-size: 14px;
}

}
//
// Card
//
div.card {
  padding: 32px;
  border: none;
  box-shadow: none;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.styles.card.background};
}
div.card-body {
  padding-left: 0;
  padding-right: 0; 
}

div.card.card-preferences .card-title {
  color: ${({ theme }) => theme.styles.card.cardTitleColor};
}
div.card.card-preferences .card-title svg {
  color: ${({ theme }) => theme.colors.gray500};
}
div.card.card-preferences .card-body {
  padding-top: 0;
}

.modal-backdrop.show {
  background-color: ${({ theme }) => theme.styles.modal.backdropColor};
  opacity: 1;
}
.modal .modal-content {
  transform: translateX(64px);
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.styles.modal.background};
}
.modal .modal-header {
  border: none;
  padding: 32px 32px 0 32px;
}
.modal .modal-header .close{
  opacity: 1;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('${({ theme }) => theme.styles.modal.closeButton}');
}
.modal .modal-header .close span{
  opacity: 0;
}
.modal .modal-body {
  padding: 24px 32px;
}
.modal .modal-body .form-control {
  font-weight: 600;
  font-size: 16px; 
  height: calc(1.5em + 1.5rem + 2px);
   color: ${({ theme }) => theme.styles.form.inputColor};
  background: ${({ theme }) => theme.styles.form.inputBackgroundColor};
  border: 1px solid ${({ theme }) => theme.styles.form.inputBorder};
} 
.modal .modal-body .form-control:focus {
  background: ${({ theme }) => theme.styles.form.inputBackgroundColorActive};
  border: 1px solid ${({ theme }) => theme.styles.form.inputBorderActive};
  box-shadow: none;
}
.modal .modal-footer {
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.styles.modal.footerBackground};
  padding: 24px 32px;
}
.modal .modal-title {
  letter-spacing: -0.03em;
  font-weight:600;
  color: ${({ theme }) => theme.styles.modal.titleColor};
}

//
// Toast
// 
.Toastify__toast-container {
  padding: 0;
  width: 368px;
}
.Toastify__toast--default,
.Toastify__toast {
  padding: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.styles.toast.background};
  box-shadow: ${({ theme }) => theme.styles.toast.boxShadow}; 
  position: relative;
  overflow: visible;
  color: ${({ theme }) => theme.styles.toast.defaultColorBody};
  &:after {
    content: '';
    background-color: ${({ theme }) => theme.styles.toast.backgroundNoStatus};
    width: 3px;
    height: 24px;
    border-radius: 3px 0px 0px 3px;
    position: absolute;
    left: -3px;
    top: 22px;
  }
}

.Toastify__toast--default {
  .toastIcon,
  .toastBodyInner h4{
    color: ${({ theme }) => theme.styles.toast.defaultColorTitle};
  }
}
.Toastify__toast--warning {
  background: ${({ theme }) => theme.styles.toast.backgroundWarning};
  &:after {
    background: ${({ theme }) => theme.colors.gradientWarning};
  }
  .toastIcon,
  .toastBodyInner h4{
    color: ${({ theme }) => theme.styles.toast.warningColorTitle};
  }
}
.Toastify__toast--error {
  background: ${({ theme }) => theme.styles.toast.backgroundDanger};
  &:after {
    background: ${({ theme }) => theme.colors.gradientDanger};
  }
  .toastIcon,
  .toastBodyInner h4{
    color: ${({ theme }) => theme.styles.toast.dangerColorTitle};
  }
}
.Toastify__toast--success {
  background: ${({ theme }) => theme.styles.toast.backgroundSuccess};
  &:after {
    background: ${({ theme }) => theme.colors.gradientSuccess};
  }
  .toastIcon,
  .toastBodyInner h4{
    color: ${({ theme }) => theme.styles.toast.successColorTitle};
  }
}
.Toastify__close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('${({ theme }) => theme.styles.modal.closeButton}');
  width: 24px;
  height: 24px;
  opacity: 0.7;
  svg {
    display:none;
  }
}

.Toastify__progress-bar {
  margin: 8px 24px;
  height: 3px;
  border-radius: 3px;
  background: ${({ theme }) => theme.styles.toast.backgroundNoStatus};
  &.Toastify__progress-bar--success {
    background: ${({ theme }) => theme.styles.toast.successColorTitle};
  }
  &.Toastify__progress-bar--warning {
    background: ${({ theme }) => theme.styles.toast.warningColorTitle};
  }
  &.Toastify__progress-bar--error {
    background: ${({ theme }) => theme.styles.toast.dangerColorTitle};
  }
}
.Toastify__toast-container--top-right {
  top: 126px;
  right: 26px;
}



//
// Form
//
.form-label {
  font-size: 14px;
  color: ${({ theme }) => theme.styles.form.formLabelTextcolor};
  margin-bottom: .25rem;
}
.custom-control.custom-switch .custom-control-label::before {
  width: 60px;
  height: 32px;
  border-radius: 30px;
  background: ${({ theme }) => theme.styles.switch.background};
  border: none;
  box-shadow: none;
}
.custom-control.custom-switch .custom-control-label::before {
  box-shadow: none !important;
}
.custom-control.custom-switch .custom-control-label::after {
  width:24px;
  height:24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.styles.switch.thumbBackground};
  border: 1px solid ${({ theme }) => theme.styles.switch.thumbBorderColor};
  box-shadow: ${({ theme }) => theme.styles.switch.thumbBoxShadow};
  top: 8px;
  left: -32px;
}
.custom-control.custom-switch .custom-control-input:checked~.custom-control-label::before {
  background-color: ${({ theme }) => theme.styles.switch.backgroundActive};
  border: none;
}
.custom-control.custom-switch .custom-control-input:checked~.custom-control-label::after {
  transform: translateX(28px);
  background-color: ${({ theme }) => theme.styles.switch.thumbBackgroundActive};
  border: 1px solid ${({ theme }) => theme.styles.switch.thumbBorderColorActive};
  box-shadow: ${({ theme }) => theme.styles.switch.thumbBoxShadowActive};
}

.rangeslider {
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.styles.slider.trackColor};
}
.rangeslider, .rangeslider .rangeslider__fill {
  box-shadow: none;
}
.rangeslider-horizontal .rangeslider__fill {
  height: 100%;
  background-color: ${({ theme }) => theme.styles.slider.progressColor};
  border-radius: 3px;
  top: 0;
  box-shadow: none;
}

.rangeslider-horizontal .rangeslider__handle {
  background: ${({ theme }) => theme.styles.slider.handleBackgroundColor};
  border: 3px solid ${({ theme }) => theme.styles.slider.handleBorderColor};
  box-sizing: border-box;
  box-shadow: 0px 4px 12px ${({ theme }) => theme.styles.slider.handleBoxShadow};
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
.rangeslider-horizontal .rangeslider__handle:after {
  content: none;
}
.tagsfix {
  color: ${({ theme }) => theme.styles.slider.labelColor};
  font-weight: 200;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.03em;
  white-space: nowrap;
}
.bs-tooltip-right.tooltipMenu {
  z-index: 2000;  
  white-space: nowrap!important;
  font-weight: 600;
  letter-spacing: -0.03em;
  text-align: left;
  br  {
    content: ' ';
  }
}
.bs-tooltip-right.tooltipMenu * {
  white-space: nowrap!important;
  text-align: left;
}
@media screen and (min-width: 1000px) {
  .bs-tooltip-right.tooltipMenu {
    display: none!important;
  }
  div.main-container {
    padding-left: calc(120px + 30px);
    padding-right: 30px;
  }
  .Toastify__toast-container--top-right {
    top: 126px;
    right: 46px;
  }
}

.animRight {
    transform: translateX(82px);
    opacity: 0;
    animation: animRight 0.3s forwards;
}
  
@keyframes animRight {
    to {
      transform: initial;
      opacity: initial;
    }
}

::-webkit-scrollbar {
  background-color: rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: transparent;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: transparent;
  background-transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.85);
  outline: 2px solid transparent;
  border-radius: 3px;
}
::-webkit-scrollbar:vertical {
  width: 8px; 
}
::-webkit-scrollbar-thumb:vertical {
  width: 6px; 
}
::-webkit-scrollbar:horizontal {
  height: 8px; 
}
::-webkit-scrollbar-thumb:horizontal {
  height: 6px; 
}
`;

export default GlobalStyles;
