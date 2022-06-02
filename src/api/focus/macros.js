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

import KeymapDB from "./keymap/db";

global.chrysalis_macros_instance = null;

const Step = {
  END: "END",
  INTERVAL: "INTERVAL",
  WAIT: "WAIT",
  KEYDOWN: "KEYDOWN",
  KEYUP: "KEYUP",
  TAP: "TAP",
  KEYCODEDOWN: "KEYCODEDOWN",
  KEYCODEUP: "KEYCODEUP",
  TAPCODE: "TAPCODE",
  EXPLICIT_REPORT: "EXPLICIT_REPORT",
  IMPLICIT_REPORT: "IMPLICIT_REPORT",
  SEND_REPORT: "SEND_REPORT",
  TAPSEQUENCE: "TAPSEQUENCE",
  TAPCODESEQUENCE: "TAPCODESEQUENCE",
};

const Macros = function () {
  if (global.chrysalis_macros_instance) return global.chrysalis_macros_instance;

  const db = new KeymapDB();

  const stepEnd = () => ({
    // We do not need to parse the END step, as we handle that specially.
    serialize: (data) => {
      if (data.type == Step.END) {
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
          type: Step.TAPSEQUENCE,
          value: sequence,
        },
        advance: pos,
      };
    },
    serialize: (data) => {
      if (data.type == Step.TAPSEQUENCE) {
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
          type: Step.TAPCODESEQUENCE,
          value: sequence,
        },
        advance: pos,
      };
    },
    serialize: (data) => {
      if (data.type == Step.TAPCODESEQUENCE) {
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
    stepu8(Step.INTERVAL, 1),
    stepu8(Step.WAIT, 2),
    stepkey(Step.KEYDOWN, 3),
    stepkey(Step.KEYUP, 4),
    stepkey(Step.TAP, 5),
    stepkeyCode(Step.KEYCODEDOWN, 6),
    stepkeyCode(Step.KEYCODEUP, 7),
    stepkeyCode(Step.TAPCODE, 8),
    stepEmpty(Step.EXPLICIT_REPORT, 9),
    stepEmpty(Step.IMPLICIT_REPORT, 10),
    stepEmpty(Step.SEND_REPORT, 11),
    stepTapSequence(),
    stepTapCodeSequence(),
  ];

  this.serialize = (macros, fillUp = true) => {
    let ser = [];
    let last = 0;

    if (macros.storageSize == 0) return [];

    // Find the last non-empty macro
    for (let i = 0; i < macros.macros.length; i++) {
      if (macros.macros[i].length > 0) last = i;
    }

    // Serialize macros, but not the trailing empty ones.
    for (let i = 0; i <= last; i++) {
      const macro = macros.macros[i];
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

    // Fill up the rest of the storage with 255 to clear it.
    if (fillUp) while (ser.length < macros.storageSize) ser = ser.concat(255);

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
        if (!macros[currentMacro]) {
          macros[currentMacro] = [];
        }
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

  const indexMacro = (macro) => {
    return macro.map((step, index) => {
      step.id = index;
      return step;
    });
  };

  const expandMacro = (macro) => {
    const mapping = {
      [Step.KEYCODEUP]: Step.KEYUP,
      [Step.KEYCODEDOWN]: Step.KEYDOWN,
      [Step.TAPCODE]: Step.TAP,
      [Step.TAPCODESEQUENCE]: Step.TAPSEQUENCE,
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
      if (step.type == Step.TAPSEQUENCE) {
        for (const s of step.value) {
          expanded.push({
            type: Step.TAP,
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
        if (step.type == Step.TAP) {
          taps.push(step.value);
        } else {
          m.push(step);
        }
      } else {
        if (step.type == Step.TAP) {
          taps.push(step.value);
        } else {
          m.push({
            type: Step.TAPSEQUENCE,
            value: taps,
          });
          m.push(step);
          taps = [];
        }
      }
    }
    if (taps.length > 0) {
      m.push({
        type: Step.TAPSEQUENCE,
        value: taps,
      });
    }

    // Downscale
    for (const step of m) {
      if (step.type == Step.KEYUP && fitsInU8(step.value))
        step.type = Step.KEYCODEUP;
      if (step.type == Step.KEYDOWN && fitsInU8(step.value))
        step.type = Step.KEYCODEDOWN;
      if (step.type == Step.TAPSEQUENCE && step.value.length == 1) {
        step.type = Step.TAP;
        step.value = step.value[0];
      }
      if (step.type == Step.TAP && fitsInU8(step.value))
        step.type = Step.TAPCODE;
      if (step.type == Step.TAPSEQUENCE) {
        if (step.value.filter((c) => !fitsInU8(c)).length == 0) {
          step.type = Step.TAPCODESEQUENCE;
        }
      }
    }
    return m;
  };

  this.compress = (macros) => {
    if (macros.macros.length == 0) return macros;
    return {
      storageSize: macros.storageSize,
      macros: macros.macros.map((macro) => compressMacro(clone(macro))),
    };
  };

  this.getStoredSize = (macros) =>
    this.serialize(this.compress(macros), false).length;

  const fill = (macros) => {
    const rem = 32 - macros.length;
    for (let i = 0; i < rem; i++) {
      macros.push([]);
    }
    return macros;
  };

  this.focus = async (s, macros) => {
    if (macros) {
      const m = this.compress(macros);
      const ser = this.serialize(m);
      if (ser.length > m.storageSize) {
        throw new Error("Not enough macro storage space!");
      }

      await s.request("macros.map", ...ser);
    } else {
      const map = (await s.request("macros.map")).trimEnd();
      if (map == "") {
        return {
          storageSize: 0,
          macros: [],
        };
      }
      const macroMap = map.split(" ").map((v) => parseInt(v));

      return {
        storageSize: macroMap.length,
        macros: fill(
          this.parse(macroMap).map((m) => indexMacro(expandMacro(m)))
        ),
      };
    }
  };

  return this;
};

export { Macros as default, Step };
