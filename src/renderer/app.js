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
import Keymap from "chrysalis-keymap"
import { Model01 } from "chrysalis-hardware-keyboardio-model01"

class Layer extends React.Component {
    render() {
        let keys = this.props.keymap.map((key, index) => {
            let keyName = "key-" + this.props.index.toString() + "-" + index.toString()
            return (
                <input type="text" defaultValue={key} key={keyName} size="5" />
            )
        })

        return (
            <div>
              <h1>Layer #{this.props.index}</h1>
              {keys}
              <hr/>
            </div>
        )
    }
}

class KeyLayout extends React.Component {
    render() {
        let layers = this.props.keymap.map((layer, index) => {
            let layerName = "layer-" + index.toString()
            return (
                <div key={layerName}>
                  <Layer index={index} keymap={layer} />
                </div>
            )
        })
        return (
            <form>
              {layers}
            </form>
        )
    }
}

class App extends React.Component {
    focus = new Focus()

    constructor(props) {
        super(props)
        this.state = {device: {},
                      keymap: []}

        this.focus.addCommands({keymap: new Keymap().setLayerSize(Model01)})
        this.openKeyboard = this.openKeyboard.bind(this)
    }

    openKeyboard(event) {
        event.preventDefault()

        this.focus.close()
        this.focus.open(Model01).then((port) => {
            this.setState({device: port})
            this.focus.command("keymap").then((keymap) => {
                this.setState({keymap: keymap})
            })
        })
    }

    render() {
        return (
            <main>
              <KeyLayout keymap={this.state.keymap} />

              <div>
                <button onClick={this.openKeyboard}>Probe for Model01</button>
              </div>
            </main>
        );
    }
}

export default App
