import { createGlobalStyle } from "styled-components";
// Import Fonts for software
import AktHair from "../../../static/styles/fonts/AktivGrotesk-Hairline.otf";
import AktHairItalic from "../../../static/styles/fonts/AktivGrotesk-HairlineItalic.otf";
import AktThin from "../../../static/styles/fonts/AktivGrotesk-Thin.otf";
import AktThinItalic from "../../../static/styles/fonts/AktivGrotesk-ThinItalic.otf";
import AktLight from "../../../static/styles/fonts/AktivGrotesk-Light.otf";
import AktLightItalic from "../../../static/styles/fonts/AktivGrotesk-LightItalic.otf";
import AktRegular from "../../../static/styles/fonts/AktivGrotesk-Regular.otf";
import AktItalict from "../../../static/styles/fonts/AktivGrotesk-Italic.otf";
import AktMed from "../../../static/styles/fonts/AktivGrotesk-Medium.otf";
import AktMedItalic from "../../../static/styles/fonts/AktivGrotesk-MediumItalic.otf";
import AktBold from "../../../static/styles/fonts/AktivGrotesk-Bold.otf";
import AktBoldItalic from "../../../static/styles/fonts/AktivGrotesk-BoldItalic.otf";
import AktXBold from "../../../static/styles/fonts/AktivGrotesk-XBold.otf";
import AktXBoldItalic from "../../../static/styles/fonts/AktivGrotesk-XBoldItalic.otf";
const NavWidth = "64";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktHair}) format('opentype');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktHairItalic}) format('opentype');
    font-weight: 100;
    font-style: italic;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktThin}) format('opentype');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktThinItalic}) format('opentype');
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktLight}) format('opentype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktLightItalic}) format('opentype');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktRegular}) format('opentype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: AktivGrotesk;
    src: url(${AktItalict}) format('opentype');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: AktivGrotesk;
    font-weight: 600;
    font-style: normal;
    src: url(${AktMed}) format('opentype');
  }
  @font-face {
    font-family: AktivGrotesk;
    font-weight: 600;
    font-style: italic;
    src: url(${AktMedItalic}) format('opentype');
  }
  @font-face {
    font-family: AktivGrotesk;
    font-weight: 700;
    font-style: normal;
    src: url(${AktBold}) format('opentype');
  }
  @font-face {
    font-family: AktivGrotesk;
    font-weight: 700;
    font-style: italic;
    src: url(${AktBoldItalic}) format('opentype');
  }
  @font-face {
    font-family: AktivGrotesk;
    font-weight: 900;
    font-style: normal;
    src: url(${AktXBold}) format('opentype');
  }
  @font-face {
    font-family: AktivGrotesk;
    font-weight: 900;
    font-style: italic;
    src: url(${AktXBoldItalic}) format('opentype');
  }
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

  div {
  }

  div.main-container{
    margin: 0;
    padding: 0;
    padding-left: ${NavWidth}px;
    background: ${({ theme }) => theme.colors.body};
    transition: all 0.50s linear;
  }

  div.card {
    padding: 24px;
    overflow: hidden;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
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

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: #1064EA;
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.font};
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }

  button.btn-primary, button.btn{
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
    background-color: ${({ theme }) => theme.colors.button.hover};
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
