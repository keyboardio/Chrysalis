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

import { keyCodeTable } from "chrysalis-keymap-transformer-core";

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
    const { keys, currentKeyCode, ...props } = this.props;
    delete props["onKeySelect"];

    return (
      <ul {...props}>
        {keys.map((key, index) => {
          let isHighlighted = key.code == currentKeyCode;
          return (
            <li
              key={`keylist-${index}`}
              className={isHighlighted ? "highlight" : null}
              onClick={this.onClick(key)}
            >
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
      items: this.keys,
      searchTerm: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeySelect = this.onKeySelect.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentKeyCode != this.props.currentKeyCode) {
      for (let key of this.keys) {
        if (key.code == this.props.currentKeyCode) {
          let searchTerm = `${key.group}`;
          searchTerm += ` ${key.labels.verbose || key.labels.primary}`;
          this.updateFilter(searchTerm);
        }
      }
    }
  }

  onChange(event) {
    this.updateFilter(event.target.value);
  }

  updateFilter(filterString) {
    let filteredList = this.keys,
      searchTerm = filterString;

    if (
      filterString.length == 1 &&
      filterString.toLowerCase() >= "a" &&
      filterString.toLowerCase() <= "z"
    )
      filterString = `letter ${filterString}`;

    filteredList = filteredList.filter(item => {
      let label = `${item.group} ${item.labels.verbose || item.labels.primary}`;
      return fuzzyMatch(label, filterString);
    });

    this.setState({
      items: filteredList,
      searchTerm: searchTerm
    });
  }

  onKeySelect(key) {
    this.updateFilter(
      `${key.group} ${key.labels.verbose || key.labels.primary}`
    );
    this.props.onChange(key);
  }

  onKeyUp(event) {
    if (event.keyCode == 27) {
      event.preventDefault();
      this.updateFilter("");
    } else if (event.keyCode == 13) {
      event.preventDefault();
      if (this.state.items.length > 0) {
        this.onKeySelect(this.state.items[0]);
      }
    }
  }

  onKeyDown(event) {
    if (event.keyCode == 9) {
      event.preventDefault();

      if (this.state.items.length <= 0) return;

      const key = this.state.items[0];
      this.updateFilter(
        `${key.group} ${key.labels.verbose || key.labels.primary}`
      );
    }
  }

  render() {
    const { isDisabled, currentKeyCode, ...props } = this.props; // eslint-disable-line
    delete props["onChange"];
    return (
      <div {...props}>
        <input
          disabled={isDisabled}
          id="keyselector-search"
          value={this.state.searchTerm}
          type="text"
          placeholder="Search"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
        />
        <KeyList
          keys={this.state.items}
          className="keylist"
          currentKeyCode={currentKeyCode}
          onKeySelect={this.onKeySelect}
        />
      </div>
    );
  }
}

export { KeySelector as default };
