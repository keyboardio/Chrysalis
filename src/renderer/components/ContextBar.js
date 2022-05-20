// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

const context_bar_channel = new BroadcastChannel("context_bar");

export const showContextBar = () => {
  context_bar_channel.postMessage("show");
};

export const hideContextBar = () => {
  context_bar_channel.postMessage("cancel");
};

export const contextBarChangesDiscarded = () => {
  console.log("posting a changes-discarded message");
  context_bar_channel.postMessage("changes-discarded");
};
