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
                <input type="text" value={key} key={keyName} size="5"
                       data-layer={this.props.index}
                       data-key-index={index}
                       onChange={this.props.onKeyChange} />
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
                  <Layer index={index} keymap={layer} onKeyChange={this.props.onKeyChange} />
                </div>
            )
        })

        if (layers.length > 0) {
            return (
                <form>
                  {layers}
                  <button onClick={this.props.onApply}>Apply</button>
                </form>
            )
        } else {
            return null
        }
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
        this.onKeyChange = this.onKeyChange.bind(this)
        this.onApply = this.onApply.bind(this)
    }

    onKeyChange(event) {
        event.persist()
        this.setState((state, props) => {
            let keymap = state.keymap.slice(),
                layer = event.target.getAttribute("data-layer"),
                keyIndex = event.target.getAttribute("data-key-index")
            keymap[layer][keyIndex] = event.target.value
            return keymap
        })
    }

    onApply(event) {
        event.preventDefault()
        this.focus.command("keymap", this.state.keymap)
        console.log("keymap updated")
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
              <KeyLayout keymap={this.state.keymap}
                         onKeyChange={this.onKeyChange}
                         onApply={this.onApply} />

              <div>
                <button onClick={this.openKeyboard}>Probe for Model01</button>
              </div>
            </main>
        );
    }
}

export default App
