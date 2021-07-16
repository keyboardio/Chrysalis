import { createGlobalStyle } from "styled-components";
import TitilliumWebExtraLight from "./fonts/TitilliumWeb-ExtraLight.ttf";
import TitilliumWebExtraLightItalic from "./fonts/TitilliumWeb-ExtraLightItalic.ttf";
import TitilliumWebLight from "./fonts/TitilliumWeb-Light.ttf";
import TitilliumWebLightItalic from "./fonts/TitilliumWeb-LightItalic.ttf";
import TitilliumWebRegular from "./fonts/TitilliumWeb-Regular.ttf";
import TitilliumWebItalic from "./fonts/TitilliumWeb-Italic.ttf";
import TitilliumWebSemiBold from "./fonts/TitilliumWeb-SemiBold.ttf";
import TitilliumWebSemiBoldItalic from "./fonts/TitilliumWeb-SemiBoldItalic.ttf";
import TitilliumWebBold from "./fonts/TitilliumWeb-Bold.ttf";
import TitilliumWebBoldItalic from "./fonts/TitilliumWeb-BoldItalic.ttf";
import TitilliumWebBlack from "./fonts/TitilliumWeb-Black.ttf";

const NavWidth = "64";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebExtraLight}) format("truetype");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebExtraLightItalic}) format("truetype");
    font-weight: 100;
    font-style: italic;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebLight}) format("truetype");;
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebLightItalic}) format("truetype");
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebRegular}) format("truetype");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebItalic}) format("truetype");
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebSemiBold}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: Titillium Web;
    src: url(${TitilliumWebSemiBoldItalic}) format("truetype");
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: Titillium Web;
    font-weight: 600;
    font-style: normal;
    src: url(${TitilliumWebBold}) format("truetype");
  }
  @font-face {
    font-family: Titillium Web;
    font-weight: 600;
    font-style: italic;
    src: url(${TitilliumWebBoldItalic}) format("truetype");
  }
  @font-face {
    font-family: Titillium Web;
    font-weight: 700;
    font-style: normal;
    src: url(${TitilliumWebBlack}) format("truetype");
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};;
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
