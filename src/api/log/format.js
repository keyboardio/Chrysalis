/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import winston from "winston";

export const suppress = (() => {
  let cache = [];

  return winston.format((info, opts) => {
    const lookback = opts?.lookback || 2;

    const current = Object.assign({}, info, { timestamp: null });
    let result = info;

    // Are we in the cache?
    for (const i of cache) {
      const cached = Object.assign({}, i, { timestamp: null });
      if (JSON.stringify(current) == JSON.stringify(cached)) {
        // We are, set the result appropriately
        result = false;
        break;
      }
    }

    // push ourselves onto the cache
    cache.push(info);

    // keep the last N
    cache = cache.splice(-lookback);

    return result;
  });
})();
