// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

import NavigationMenu from "./NavigationMenu";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NMenu: true
    };
  }

  closeNMenu() {
    this.setState({ NMenu: false });
  }

  render() {
    const { connected, pages, theme, flashing } = this.props;
    const { NMenu } = this.state;

    return (
      <NavigationMenu
        connected={connected}
        pages={pages}
        open={NavigationMenu}
        closeMenu={this.closeNavigationMenu}
        themeDark={theme}
        flashing={flashing}
      />
    );
  }
}

export default Header;
