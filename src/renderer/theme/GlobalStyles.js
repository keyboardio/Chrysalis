import { createGlobalStyle } from "styled-components";

import LibreFranklin from "./fonts/LibreFranklin/LibreFranklin-VariableFont_wght.ttf";
import LibreFranklinItalic from "./fonts/LibreFranklin/LibreFranklin-Italic-VariableFont_wght.ttf";

import BackgroundImageDark from "../../../static/dark/darkBackground.png";
import BackgroundImageDark2x from "../../../static/dark/darkBackground-2x.png";
import BackgroundImageLight from "../../../static/light/lightBackground.png";
import BackgroundImageLight2x from "../../../static/light/lightBackground-2x.png";

const NavWidth = "64";

const GlobalStyles = createGlobalStyle`

  :root {
    --gray-25: rgba(240,242,244,1);
    --gray-50: rgba(226,228,234,1);
    --gray-100: rgba(196,201,213,1);
    --gray-200: rgba(151,160,180,1);
    --gray-300: rgba(123,134,158,1);
    --gray-400: rgba(107,119,148,1);
    --gray-500: rgba(87,97,126,1);
    --gray-600: rgba(63,66,90,1);
    --gray-700: rgba(48,51,73,1);
    --gray-800: rgba(37,39,59,1);
    --gray-900: rgba(11,2,25,1);
    --purple-300: rgba(108,92,231,1);
    --purple-200: rgba(120,121,241,1);
    --purple-100: rgba(162,155,254,1);
    --brand-primary: rgba(254,0,124,1);
    --brand-secondary: rgba(107,20,249,1);
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

    background-image: url(${({ theme }) => (theme.name == "Dark" ? BackgroundImageDark : BackgroundImageLight)});
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
        background-image: url(${({ theme }) => (theme.name == "Dark" ? BackgroundImageDark2x : BackgroundImageLight2x)});
      }
  }

  div {
  }

  div.main-container{
    padding-left: ${NavWidth}px;
    padding-left: 120px;
    transition: all 0.50s linear;
    overflow: auto;
    height: 100vh;
  }

  div.card {
    padding: 24px;
    overflow: hidden;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    background-color: ${({ theme }) => theme.card.background};
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
    font-family: ${({ theme }) => theme.font};
  }

  button.btn {

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

`;

export default GlobalStyles;
