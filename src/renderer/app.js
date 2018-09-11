// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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

import React from 'react'

import Focus from "chrysalis-focus"
import { Model01 } from "chrysalis-hardware-keyboardio-model01"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {focus: new Focus(),
                      device: {}}

        this.openKeyboard = this.openKeyboard.bind(this);
    }

    openKeyboard(event) {
        event.preventDefault()

        this.state.focus.open(Model01).then((port) => {
            this.setState({device: port})
        })
    }

    render() {
        return (
            <main>
              {this.state.device.path}

              <div>
                <button onClick={this.openKeyboard}>Probe for Model01</button>
              </div>
            </main>
        );
    }
}

export default App
