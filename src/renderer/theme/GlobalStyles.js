import { createGlobalStyle } from "styled-components";

import LibreFranklin from "./fonts/LibreFranklin/LibreFranklin-VariableFont_wght.ttf";
import LibreFranklinItalic from "./fonts/LibreFranklin/LibreFranklin-Italic-VariableFont_wght.ttf";

import iconChevronDown from "../../../static/base/icon-arrow--chevron-down.svg";

const NavWidth = "64";

const GlobalStyles = createGlobalStyle`
  :root {
    --gray-25: ${({ theme }) => theme.colors.gray25};
    --gray-50: ${({ theme }) => theme.colors.gray50};
    --gray-100: ${({ theme }) => theme.colors.gray100};
    --gray-200: ${({ theme }) => theme.colors.gray200};
    --gray-300: ${({ theme }) => theme.colors.gray300};
    --gray-400: ${({ theme }) => theme.colors.gray400};
    --gray-500: ${({ theme }) => theme.colors.gray500};
    --gray-600: ${({ theme }) => theme.colors.gray600};
    --gray-700: ${({ theme }) => theme.colors.gray700};
    --gray-800: ${({ theme }) => theme.colors.gray800};
    --gray-900: ${({ theme }) => theme.colors.gray900};
    --purple-300: ${({ theme }) => theme.colors.purple300};
    --purple-200: ${({ theme }) => theme.colors.purple200};
    --purple-100: ${({ theme }) => theme.colors.purple100};
    --brand-primary: ${({ theme }) => theme.colors.brandPrimary};
    --brand-secondary:  rgba(107,20,249,1);
    --brand-success: rgba(0,206,201,1);
    --brand-success-lighter: rgba(85,239,196,1);
    --brand-warning: rgba(255,159,67,1);
    --brand-warning-lighter: rgba(254,202,87,1);
    --brand-danger: rgba(225,4,50,1);
    --brand-danger-lighter: rgba(255,107,107,1);
    --pastel-shades-green-200: rgba(53,194,212,1);
    --pastel-shades-green-300: rgba(37,161,177,1);
    --pastel-shades-green-100: rgba(95,206,221,1);
    --pastel-shades-mint-300: rgba(135,162,67,1);
    --pastel-shades-mint-200: rgba(161,188,94,1);
    --pastel-shades-mint-100: rgba(181,203,129,1);
  }

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
    padding-left: ${NavWidth}px;
    padding-left: calc(120px + 30px);
    padding-right: 30px;
    transition: all 0.50s linear;
    overflow: auto;
    height: 100vh;
  }
  .wrapper {
    margin-top: 2px;
    padding-left: 17px;
    padding-right: 17px;
  }
  .wrapperBackground {
    background-color: ${({ theme }) => theme.styles.wrapper.background};
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
.button {
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5em;
  padding: 14px 24px;
  border-radius: 6px;
  display: inline-block;
}
.button:hover {
  cursor: pointer;
}
.button[disabled]:hover {
  cursor: not-allowed;
}
.button.primary {
  color: #fff;
  background: ${({ theme }) => theme.styles.button.primary.backgroundColor};
}
.button.primary[disabled] {
  background: ${({ theme }) => theme.styles.button.primary.disabledBackgroundColor};
  color: ${({ theme }) => theme.styles.button.primary.disabledTextColor};
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
//
// Card
//
div.card {
  padding: 32px;
  overflow: hidden;
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

//
// Form
//
.form-label {
  font-size: 14px;
  color: ${({ theme }) => theme.styles.form.formLabelTextcolor};
  margin-bottom: .25rem;
}
`;

export default GlobalStyles;
