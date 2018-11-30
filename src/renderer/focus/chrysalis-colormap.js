/* chrysalis-colormap -- Chrysalis colormap library
 * Copyright (C) 2018  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

export default class Colormap {
  constructor(opts) {
    this.setLayerSize(opts);
  }

  setLayerSize(opts) {
    if (!opts || opts == undefined) return;

    if (typeof opts == "number") {
      this._layerSize = opts;
    } else if (typeof opts == "object") {
      this._layerSize = opts.keyboard.rows * opts.keyboard.columns;
    }

    return this;
  }

  _chunk(a, chunkSize) {
    var R = [];
    for (var i = 0; i < a.length; i += chunkSize)
      R.push(a.slice(i, i + chunkSize));
    return R;
  }

  async _pull(s) {
    let paletteData = await s.request("palette");
    let colorMapData = await s.request("colormap.map");

    let palette = this._chunk(
      paletteData
        .split(" ")
        .filter(v => v.length > 0)
        .map(k => parseInt(k)),
      3
    ).map(color => {
      return {
        r: color[0],
        g: color[1],
        b: color[2],
        rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      };
    });

    let colorMap = this._chunk(
      colorMapData
        .split(" ")
        .filter(v => v.length > 0)
        .map(k => parseInt(k)),
      this._layerSize
    );

    return {
      palette: palette,
      colorMap: colorMap
    };
  }

  _flatten = arr => {
    return [].concat(...arr);
  };

  async _updatePalette(s, palette) {
    let args = this._flatten(
      palette.map(color => [color.r, color.g, color.b])
    ).map(v => v.toString());

    return await s.request("palette", ...args);
  }

  async _updateColormap(s, colormap) {
    let args = this._flatten(colormap).map(v => v.toString());
    return await s.request("colormap.map", ...args);
  }

  async focus(s, palette, colormap) {
    if (!palette && !colormap) {
      return this._pull(s);
    }

    if (palette) await this._updatePalette(s, palette);
    if (colormap) await this._updateColormap(s, colormap);
  }
}
