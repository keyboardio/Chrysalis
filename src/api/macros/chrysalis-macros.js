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

function Macros() {
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
      let sequence = [];
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
        let ser = [12];
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
      let sequence = [];
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
        let ser = [13];
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
    let macros = [];
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
    let m = macro.map((v) => Object.assign({}, v));
    const mapping = {
      KEYCODEUP: "KEYUP",
      KEYCODEDOWN: "KEYDOWN",
      TAPCODE: "TAP",
      TAPCODESEQUENCE: "TAPSEQUENCE",
    };

    for (let step of m) {
      if (mapping[step.type]) {
        step.type = mapping[step.type];
      }
    }

    return m;
  };

  const clone = (macro) => {
    return macro.map((v) => Object.assign({}, v));
  };

  const compressMacro = (macro) => {
    let m = clone(macro);
    for (let step of m) {
      if (step.type == "KEYUP" && step.value.code < 256)
        step.type = "KEYCODEUP";
      if (step.type == "KEYDOWN" && step.value.code < 256)
        step.type = "KEYCODEDOWN";
      if (step.type == "TAP" && step.value.code < 256) step.type = "TAPCODE";
      if (step.type == "TAPSEQUENCE") {
        if (step.value.filter((c) => c.code >= 256).length == 0) {
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
}

let focus = new Focus();
focus.addCommands({
  macros: new Macros(),
});

export { Macros as default };
