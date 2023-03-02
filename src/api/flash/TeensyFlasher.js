/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
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

import { logger } from "@api/log";
import { getStaticPath } from "@renderer/config";
const { TeensyLoader } = eval(`require("teensy-loader")`);
import { delay, reportUpdateStatus } from "./utils";

const HalfKayUSBDescriptor = {
  vendorId: 0x16c0,
  productId: 0x0478,
};

const rebootToApplicationMode = async (port) => {
  logger("flash").debug("rebooting to application mode");
  const device = await TeensyLoader.open(
    HalfKayUSBDescriptor.vendorId,
    HalfKayUSBDescriptor.productId
  );
  await TeensyLoader.reboot(device);
};

const flash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await reportUpdateStatus(callback)("flash");
  const device = await TeensyLoader.open(
    HalfKayUSBDescriptor.vendorId,
    HalfKayUSBDescriptor.productId
  );
  await TeensyLoader.upload(device, filename);
  await TeensyLoader.reboot(device);
};

export const TeensyFlasher = { rebootToApplicationMode, flash };
