/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2021-2022  Keyboardio, Inc.
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
import { KeymapDB } from "../keymap";

global.chrysalis_macros_instance = null;

const Macros = function () {
  if (global.chrysalis_macros_instance) return global.chrysalis_macros_instance;

  const db = new KeymapDB();

  const stepEnd = () => ({
    // We do not need to parse the END step, as we handle that specially.
    serialize: (data) => {
      if (data.type == "END") {
        return [0];
      }
    },
  });

  const stepEmpty = (type, id) => ({
    parse: () => ({
      macroStep: {
        type: type,
      },
      advance: 0,
    }),
    serialize: (data) => {
      if (data.type == type) {
        return [id];
      }
    },
  });

  const stepu8 = (type, id) => ({
    parse: (data) => ({
      macroStep: {
        type: type,
        value: data[0],
      },
      advance: 1,
    }),
    serialize: (data) => {
      if (data.type == type) {
        return [id, data.value];
      }
    },
  });

  const stepkey = (type, id) => ({
    parse: (data) => ({
      macroStep: {
        type: type,
        value: db.lookup(data[0] * 256 + data[1]),
      },
      advance: 2,
    }),
    serialize: (data) => {
      if (data.type == type) {
        return [id, Math.floor(data.value.code / 256), data.value.code % 256];
      }
    },
  });

  const stepkeyCode = (type, id) => ({
    parse: (data) => ({
      macroStep: {
        type: type,
        value: db.lookup(data[0]),
      },
      advance: 1,
    }),
    serialize: (data) => {
      if (data.type == type) {
        return [id, data.value.code];
      }
    },
  });

  const stepTapSequence = () => ({
    parse: (data) => {
      let pos = 0;
      const sequence = [];
      let key = 0;
      do {
        key = db.lookup(data[pos] * 256 + data[pos + 1]);
        if (key.code > 0) sequence.push(key);
        pos += 2;
      } while (key.code > 0);

      return {
        macroStep: {
          type: "TAPSEQUENCE",
          value: sequence,
        },
        advance: pos,
      };
    },
    serialize: (data) => {
      if (data.type == "TAPSEQUENCE") {
        const ser = [12];
        for (let i = 0; i < data.value.length; i++) {
          ser.push(Math.floor(data.value[i].code / 256));
          ser.push(data.value[i].code % 256);
        }
        ser.push(0);
        ser.push(0);
        return ser;
      }
    },
  });

  const stepTapCodeSequence = () => ({
    parse: (data) => {
      let pos = 0;
      const sequence = [];
      let key = 0;
      do {
        key = db.lookup(data[pos]);
        if (key.code > 0) sequence.push(key);
        pos += 1;
      } while (key.code > 0);

      return {
        macroStep: {
          type: "TAPCODESEQUENCE",
          value: sequence,
        },
        advance: pos,
      };
    },
    serialize: (data) => {
      if (data.type == "TAPCODESEQUENCE") {
        const ser = [13];
        for (let i = 0; i < data.value.length; i++) {
          ser.push(data.value[i].code);
        }
        ser.push(0);
        return ser;
      }
    },
  });

  const steps = [
    stepEnd(),
    stepu8("INTERVAL", 1),
    stepu8("WAIT", 2),
    stepkey("KEYDOWN", 3),
    stepkey("KEYUP", 4),
    stepkey("TAP", 5),
    stepkeyCode("KEYCODEDOWN", 6),
    stepkeyCode("KEYCODEUP", 7),
    stepkeyCode("TAPCODE", 8),
    stepEmpty("EXPLICIT_REPORT", 9),
    stepEmpty("IMPLICIT_REPORT", 10),
    stepEmpty("SEND_REPORT", 11),
    stepTapSequence(),
    stepTapCodeSequence(),
  ];

  this.serialize = (macroMap) => {
    let ser = [];

    for (const macro of macroMap) {
      for (const macroStep of macro) {
        for (const step of steps) {
          const s = step.serialize(macroStep);
          if (s) {
            ser = ser.concat(s);
          }
        }
      }
      ser = ser.concat([0]);
    }

    return ser;
  };

  this.parse = (macroMap) => {
    // First, check if we're all 255 bytes, when we're uninitialized
    if (macroMap.filter((n) => n != 255).length == 0) {
      return [];
    }
    const macros = [];
    let currentMacro = 0;
    let pos = 0;

    while (pos < macroMap.length) {
      const step = macroMap[pos];
      if (step == 0) {
        currentMacro++;
        pos++;
      } else if (steps[step]) {
        const res = steps[step].parse(macroMap.slice(pos + 1));
        pos += res.advance + 1;
        if (macros[currentMacro]) {
          macros[currentMacro].push(res.macroStep);
        } else {
          macros[currentMacro] = [res.macroStep];
        }
      } else {
        break;
      }
    }
    return macros;
  };

  const expandMacro = (macro) => {
    const mapping = {
      KEYCODEUP: "KEYUP",
      KEYCODEDOWN: "KEYDOWN",
      TAPCODE: "TAP",
      TAPCODESEQUENCE: "TAPSEQUENCE",
    };
    // Upscale from code -> key
    const m = macro.map((step) => {
      const newStep = Object.assign({}, step);

      if (mapping[step.type]) {
        newStep.type = mapping[step.type];
      }

      return newStep;
    });

    // Expand TAPSEQUENCE into discrete taps
    const expanded = [];
    for (const step of m) {
      if (step.type == "TAPSEQUENCE") {
        for (const s of step.value) {
          expanded.push({
            type: "TAP",
            value: s,
          });
        }
      } else {
        expanded.push(step);
      }
    }

    return expanded;
  };

  const clone = (macro) => {
    return macro.map((v) => Object.assign({}, v));
  };

  const fitsInU8 = (v) => v.code < 256;

  const compressMacro = (macro) => {
    const expanded = clone(macro);
    const m = [];
    let taps = [];

    for (const step of expanded) {
      if (taps.length == 0) {
        // We don't have previous taps
        if (step.type == "TAP") {
          taps.push(step.value);
        } else {
          m.push(step);
        }
      } else {
        if (step.type == "TAP") {
          taps.push(step.value);
        } else {
          m.push({
            type: "TAPSEQUENCE",
            value: taps,
          });
          m.push(step);
          taps = [];
        }
      }
    }
    if (taps.length > 0) {
      m.push({
        type: "TAPSEQUENCE",
        value: taps,
      });
    }

    // Downscale
    for (const step of m) {
      if (step.type == "KEYUP" && fitsInU8(step.value)) step.type = "KEYCODEUP";
      if (step.type == "KEYDOWN" && fitsInU8(step.value))
        step.type = "KEYCODEDOWN";
      if (step.type == "TAPSEQUENCE" && step.value.length == 1) {
        step.type = "TAP";
        step.value = step.value[0];
      }
      if (step.type == "TAP" && fitsInU8(step.value)) step.type = "TAPCODE";
      if (step.type == "TAPSEQUENCE") {
        if (step.value.filter((c) => !fitsInU8(c)).length == 0) {
          step.type = "TAPCODESEQUENCE";
        }
      }
    }
    return m;
  };

  this.compress = (macros) => ({
    storageSize: macros.storageSize,
    macros: macros.macros.map((macro) => compressMacro(clone(macro))),
  });

  this.getStoredSize = (macros) =>
    this.serialize(this.compress(macros).macros).length;

  this.focus = async (s, macros) => {
    if (macros) {
      const m = this.compress(macros);
      const ser = this.serialize(m.macros);
      if (ser.length > m.storageSize) {
        throw new Error("Not enough macro storage space!");
      }

      await s.request("macros.map", ...ser);
    } else {
      const macroMap = (await s.request("macros.map"))
        .trimEnd()
        .split(" ")
        .map((v) => parseInt(v));

      return {
        storageSize: macroMap.length,
        macros: this.parse(macroMap).map((m) => expandMacro(m)),
      };
    }
  };

  return this;
};

const focus = new Focus();
focus.addCommands({
  macros: new Macros(),
});

export { Macros as default };