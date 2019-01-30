// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
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

import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import DeviceMenu from "../DeviceMenu";

afterEach(cleanup);
const mockOpenMenu = jest.fn();
const device = {
  urls: { url: "http://www.keyboard.io", name: "Home" },
  displayName: "Keyboardio Model01"
};

test("DeviceMenu renders a button with the proper device name", () => {
  const { getByText } = render(
    <DeviceMenu openBoardMenu={mockOpenMenu} device={device} />
  );

  expect(getByText("Keyboard: Keyboardio Model01")).toMatchSnapshot();
});

test("DeviceMenu button calls openMenu when clicked", () => {
  const { getByText } = render(
    <DeviceMenu openBoardMenu={mockOpenMenu} device={device} />
  );
  fireEvent.click(getByText("Keyboard: Keyboardio Model01"));

  expect(mockOpenMenu).toHaveBeenCalled();
});
