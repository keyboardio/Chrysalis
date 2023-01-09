/* eslint-disable react/jsx-filename-extension */
// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Tooltip from "react-bootstrap/Tooltip";
import Styled from "styled-components";

import i18n from "../../i18n";
import Focus from "../../../api/focus";

import { NavigationButton } from "../../component/Button";
import { IconKeyboardSelector } from "../../component/Icon";
import { IconKeyboard2Stroke } from "../../component/Icon";
import { IconMemory2Stroke } from "../../component/Icon";
import { IconRobot2Stroke } from "../../component/Icon";
import { IconThunder2Stroke } from "../../component/Icon";
import { IconPreferences2Stroke } from "../../component/Icon";

import DygmaLogo from "../../../../static/logo.svg";
import { fwVersion } from "../../../../package.json";

const drawerWidth = 64;

const Styles = Styled.div`
.disabled {
  pointer-events: none;
}
.brand-image {
  padding: 0 !important;
  margin-left: 0;
  margin-top: 20px;
  margin-bottom: 32px;
  display: block;
  width: 100%;
  text-align: center;
  -webkit-app-region: drag;
  img {
    margin: 0;
    height: ${({ theme }) => theme.drawerWidth - 16}px;
    width: ${({ theme }) => theme.drawerWidth - 16}px;
  }
}
.left-navbar {
  width: ${({ theme }) => theme.drawerWidth}px; 
  width: 120px;
  height: 100%;
  display: block !important;

  position: fixed !important;
  z-index: 1100;
  padding: 12px !important;
  background-color: ${({ theme }) => theme.styles.navbar.background};
  
  .navbar-nav {
    flex-wrap: wrap;
    height: calc(100% - 98px);
    .bottomMenu {
      margin-top: auto;
    }
  }
}
.list-link {
  display: flex;
  &:hover {
    text-decoration: none;
  }
}
.list-link+.list-link {
  margin-top: 8px;
}
.disabled {
  color: ${({ theme }) => theme.card.disabled};
}

.select {
  background-color: ${({ theme }) => theme.card.backgroundActive};
  border-radius: 8px;
  width: 100%;
}
@media screen and (max-width: 999px) {
  .left-navbar {
    width: 90px;
  }
}
@media screen and (max-height: 719px) {
  .left-navbar {
    width: 90px;
  }
}
`;

class NavigationMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      versions: null,
      flashing: props.flashing
    };
  }

  componentDidMount() {
    const focus = new Focus();
    let versions;

    focus.command("version").then(v => {
      if (!v) return;
      let parts = v.split(" ");
      versions = {
        bazecor: parts[0],
        kaleidoscope: parts[1],
        firmware: parts[2]
      };
      this.setState({ versions: versions, flashing: this.props.flashing });
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.flashing != previousProps.flashing) {
      this.setState({ flashing: this.props.flashing });
    }
    if (this.state.versions != null && this.state.versions.bazecor.length > 0 && this.state.flashing == previousState.flashing) {
      return;
    }
    const focus = new Focus();
    let versions;

    focus.command("version").then(v => {
      if (!v) return;
      let parts = v.split(" ");
      versions = {
        bazecor: parts[0],
        kaleidoscope: parts[1],
        firmware: parts[2]
      };
      this.setState({ versions: versions, flashing: this.props.flashing });
    });
  }

  cleanFWVer(version) {
    let ver = version != null ? (version[0] != "v" ? version : version.substring(1)) : null;
    ver = ver.split("beta");
    let aux = ver[0].split(".").map(x => parseInt(x));
    if (ver[1] != "") aux.push(parseInt(ver[1]));
    else aux.push(0);
    return aux;
  }

  compareFWVer(oldVer, newVer) {
    // console.log("comparing versions ", oldVer, newVer);
    if (oldVer.length != newVer.length) {
      if (oldVer.length > newVer.length) {
        return -1;
      } else {
        return 1;
      }
    }
    for (var i = 0; i < oldVer.length; ++i) {
      if (oldVer[i] == newVer[i]) {
        continue;
      } else if (oldVer[i] > newVer[i]) {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  }

  renderTooltip(text) {
    return <Tooltip id="button-tooltip">{text}</Tooltip>;
  }

  render() {
    const { connected, pages, history, themeDark, fwUpdate } = this.props;
    const currentPage = history.location.pathname;

    // const homePage = connected
    //   ? pages.keymap
    //     ? "/editor"
    //     : "/welcome"
    //   : "/keyboard-select";
    let fwVer = this.state.versions != null ? this.cleanFWVer(this.state.versions.bazecor) : [];
    let newVer = this.cleanFWVer(fwVersion);
    let showNotif = this.compareFWVer(fwVer, newVer);

    return (
      <Styles>
        <Navbar className={`left-navbar sidebar`} sticky="top">
          <NavbarBrand as={Link} to="/" className="brand-image d-lg-block">
            <img alt="" src={DygmaLogo} className="d-inline-block align-top" />
          </NavbarBrand>
          <Nav>
            {/* <Link to="/welcome" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
              <WelcomeMenu
                selected={currentPage === "/welcome"}
                userMenu={i18n.app.menu.userMenu}
                drawerWidth={drawerWidth}
                onClick={() => setCurrentPage("/welcome")}
              />
            </Link> */}
            <div className="topMenu">
              {connected && (
                <>
                  {pages.keymap && (
                    <React.Fragment>
                      <Link to="/editor" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                        <NavigationButton
                          selected={currentPage === "/editor"}
                          drawerWidth={drawerWidth}
                          buttonText={i18n.app.menu.editor}
                          icoSVG={<IconKeyboard2Stroke />}
                          disabled={fwUpdate}
                        />
                      </Link>
                      <Link to="/macros" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                        <NavigationButton
                          selected={currentPage === "/macros"}
                          drawerWidth={drawerWidth}
                          buttonText={i18n.app.menu.macros}
                          icoSVG={<IconRobot2Stroke />}
                          disabled={fwUpdate}
                        />
                      </Link>
                      <Link to="/superkeys" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                        <NavigationButton
                          selected={currentPage === "/superkeys"}
                          drawerWidth={drawerWidth}
                          buttonText={i18n.app.menu.superkeys}
                          icoSVG={<IconThunder2Stroke />}
                          showNotif={true}
                          notifText="BETA"
                          disabled={fwUpdate}
                        />
                      </Link>
                    </React.Fragment>
                  )}
                  <Link to="/firmware-update" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                    <NavigationButton
                      selected={currentPage === "/firmware-update"}
                      drawerWidth={drawerWidth}
                      showNotif={showNotif != 0 ? (showNotif > 0 ? true : false) : false}
                      buttonText={i18n.app.menu.firmwareUpdate}
                      icoSVG={<IconMemory2Stroke />}
                      disabled={fwUpdate}
                    />
                  </Link>
                </>
              )}
              <Link to="/keyboard-select" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                <NavigationButton
                  keyboardSelectText={connected ? i18n.app.menu.selectAnotherKeyboard : i18n.app.menu.selectAKeyboard}
                  drawerWidth={drawerWidth}
                  selected={currentPage === "/keyboard-select"}
                  buttonText={i18n.app.menu.selectAKeyboard}
                  icoSVG={<IconKeyboardSelector />}
                  disabled={fwUpdate}
                />
              </Link>

              {/* <OverlayTrigger
                rootClose
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip("Update Bazecor")}
              >
                <div className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                  <SoftwareUpdateMenuItem
                    keyboardSelectText={i18n.app.menu.softwareUpdate}
                    drawerWidth={drawerWidth}
                    selected={currentPage === "/software-update"}
                    onClick={event => event.stopPropagation()}
                  />
                </div>
              </OverlayTrigger> */}
              {/* <OverlayTrigger
                rootClose
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip("Exit Bazecor")}
              >
                <div className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                  <ExitMenuItem
                    drawerWidth={drawerWidth}
                    onClick={() => remote.app.exit(0)}
                  />
                </div>
              </OverlayTrigger> */}
            </div>
            <div className="bottomMenu">
              <Link to="/preferences" className={`list-link ${fwUpdate ? "disabled" : ""}`}>
                <NavigationButton
                  drawerWidth={drawerWidth}
                  selected={currentPage === "/preferences"}
                  buttonText={i18n.app.menu.preferences}
                  icoSVG={<IconPreferences2Stroke />}
                  disabled={fwUpdate}
                />
              </Link>
            </div>
          </Nav>
        </Navbar>
      </Styles>
    );
  }
}
NavigationMenu.propTypes = {
  connected: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pages: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(NavigationMenu);
