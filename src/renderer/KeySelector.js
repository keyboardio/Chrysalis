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

class KeyList extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(key) {
    return event => {
      event.preventDefault();
      this.props.onKeySelect(key);
    };
  }

  render() {
    const { keys, ...props } = this.props;
    delete props["onKeySelect"];

    return (
      <ul {...props}>
        {keys.map((key, index) => {
          return (
            <li key={`keylist-${index}`} onClick={this.onClick(key)}>
              <em>{key.group}</em>
              &nbsp;
              {key.labels.verbose || key.labels.primary}
            </li>
          );
        })}
      </ul>
    );
  }
}

function fuzzyMatch(s1, s2) {
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

/*
 * TODO:
 * - Update the searcher with clicked results
 * - default to the current key
 * - ESC should clear the field
 * - Tab should complete the topmost one
 * - up/down should scroll the list below (nice to have)
 */

class KeySelector extends React.Component {
  constructor(props) {
    super(props);

    this.keys = [];
    for (let group of keyCodeTable) {
      for (let key of group.keys) {
        key.group = group.groupName;
        this.keys.push(key);
      }
    }

    this.state = {
      items: this.keys
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let filteredList = this.keys;
    let filterString = event.target.value;

    if (filterString.length == 1) filterString = `letter ${filterString}`;

    filteredList = filteredList.filter(item => {
      let label = `${item.group} ${item.labels.verbose || item.labels.primary}`;
      return fuzzyMatch(label, filterString);
    });

    this.setState({ items: filteredList });
  }

  render() {
    const { isDisabled, onChange, currentKeyCode, ...props } = this.props; // eslint-disable-line
    return (
      <div {...props}>
        <input type="text" placeholder="Search" onChange={this.onChange} />
        <KeyList
          keys={this.state.items}
          className="keylist"
          onKeySelect={onChange}
        />
      </div>
    );
  }
}

export { KeySelector as default };
