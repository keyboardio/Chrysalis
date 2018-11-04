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

import React from "react";

import { keyCodeTable } from "./keymap-transformer";

import Select from "react-select";

class KeySelector extends React.Component {
  constructor(props) {
    super(props);

    this.keyCodeOptions = keyCodeTable.map(group => {
      return {
        label: group.groupName,
        options: group.keys.map(key => {
          if (key)
            return {
              value: key.code,
              group: group.groupName,
              key: key
            };
        })
      };
    });

    this.filterKeyOption = this.filterKeyOption.bind(this);
    this.getCurrentKeyCodeOption = this.getCurrentKeyCodeOption.bind(this);
  }

  getCurrentKeyCodeOption() {
    if (this.props.currentKeyCode == "") return null;

    for (let group of this.keyCodeOptions) {
      for (let option of group.options) {
        if (option.value == this.props.currentKeyCode) return option;
      }
    }
  }

  formatKeyLabel(option) {
    let key;

    if (option.data) {
      key = option.data.key;
    } else {
      key = option.key;
    }

    return (
      <div>
        <span className="dim">{option.group}</span>
        &nbsp;
        {key.labels.verbose || key.labels.primary}
      </div>
    );
  }

  fuzzyMatch(s1, s2) {
    var hay = s1.toLowerCase(),
      i = 0,
      n = -1,
      l;
    s2 = s2.toLowerCase();
    for (; (l = s2[i++]); ) {
      if (!~(n = hay.indexOf(l, n + 1))) {
        return false;
      }
    }
    return true;
  }

  filterKeyOption(option, filterString) {
    let label = `${option.data.group}
${option.data.key.labels.verbose || option.data.key.labels.primary}`;

    if (filterString.length == 1) filterString = `letter ${filterString}`;

    return this.fuzzyMatch(label, filterString);
  }

  render() {
    return (
      <div>
        <label>New keycode:</label>
        <Select
          {...this.props}
          maxMenuHeight={500}
          options={this.keyCodeOptions}
          formatOptionLabel={this.formatKeyLabel}
          filterOption={this.filterKeyOption}
          value={this.getCurrentKeyCodeOption()}
        />
      </div>
    );
  }
}

export default KeySelector;
