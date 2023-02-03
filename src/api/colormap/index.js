/* bazecor-colormap -- Bazecor colormap library
 * Copyright (C) 2018  Keyboardio, Inc.
 * Copyright (C) 2019, 2020  DygmaLab SE
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

import Focus from "../focus";
import { rgb2w, rgbw2b } from "../color";

global.colormap_instance = null;

export default class Colormap {
  constructor(opts) {
    if (!global.colormap_instance) {
      global.colormap_instance = this;
    }
    global.colormap_instance.setLayerSize(opts);
    global.colormap_instance.setLEDMode(opts);

    return global.colormap_instance;
  }

  setLayerSize(opts) {
    if (!opts || opts == undefined) return;

    if (typeof opts == "number") {
      this._layerSize = opts;
    } else if (typeof opts == "object") {
      this._layerSize = opts.keyboardUnderglow
        ? opts.keyboardUnderglow.rows * opts.keyboardUnderglow.columns
        : opts.keyboard.rows * opts.keyboard.columns;
    }

    return this;
  }

  setLEDMode(opts) {
    if (!opts || opts == undefined) return;

    if (typeof opts == "number") {
      this._LEDMode = "RGB";
    } else if (typeof opts == "object") {
      this._LEDMode = opts.RGBWMode ? "RGBW" : "RGB";
    }

    return this;
  }

  _chunk(a, chunkSize) {
    var R = [];
    for (var i = 0; i < a.length; i += chunkSize) R.push(a.slice(i, i + chunkSize));
    return R;
  }

  async _pull(s) {
    let paletteData = await s.request("palette");
    let colorMapData = await s.request("colormap.map");

    let palette =
      this._LEDMode != "RGBW"
        ? this._chunk(
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
          })
        : this._chunk(
            paletteData
              .split(" ")
              .filter(v => v.length > 0)
              .map(k => parseInt(k)),
            4
          ).map(color => {
            const coloraux = rgbw2b({ r: color[0], g: color[1], b: color[2], w: color[3] });
            return {
              r: coloraux.r,
              g: coloraux.g,
              b: coloraux.b,
              rgb: coloraux.rgb
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

  _flatten(arr) {
    return [].concat(...arr);
  }

  async _updatePalette(s, palette) {
    let args;
    if (this._LEDMode != "RGBW") {
      args = this._flatten(palette.map(color => [color.r, color.g, color.b])).map(v => v.toString());
    } else {
      let paletteAux = palette.map(color => {
        let aux = rgb2w({ r: color.r, g: color.g, b: color.b });
        return aux;
      });
      args = this._flatten(paletteAux.map(color => [color.r, color.g, color.b, color.w])).map(v => v.toString());
      console.log(palette, paletteAux, args);
    }

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

let focus = new Focus();
focus.addCommands({ colormap: new Colormap() });
focus.addMethod("setLayerSize", "colormap");
focus.addMethod("setLEDMode", "colormap");
