/* model01-load.js -- A Chrysalis API example
 * Copyright (C) 2019  Keyboardio, Inc.
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

import Focus from "@chrysalis-api/focus";
import { Model01 } from "@chrysalis-api/hardware-keyboardio-model01";
import convert from "color-convert";
import os from "os";

const focus = new Focus();

const mapLoad = async (avg) => {
  const load = avg / (os.cpus().length / 2);
  const ledMap = [3, 4, 11, 12, 19, 20, 26];
  const hueMap = [120, 80, 60, 40, 20, 10, 0];
  const nearest = Math.min(Math.max(Math.round(load) - 1, 0), ledMap.length - 1);

  for (let i = 0; i < nearest; i++) {
    const frac = i < nearest ? 1 : load - Math.trunc(load);
    const [ r, g, b ] = convert.hsl.rgb(hueMap[i], 100, 50);
    await focus.command("led.at", ledMap[i], r, g, b);
  }

  const frac = (load - Math.trunc(load)) / 2 + 0.5;
  const [ r, g, b ] = convert.hsl.rgb(hueMap[nearest], 100, 50 * frac);
  await focus.command("led.at", ledMap[nearest], r, g, b);

  for (let i = nearest + 1; i < ledMap.length; i++) {
    await focus.command("led.at", ledMap[i], 0, 0, 0);
  }
};

const simulate = () => {
  let load = 0.0;
  let target = Math.random() * os.cpus().length * 5;
  let speed = 0.1;

  setInterval(() => {
    if (!focus.device) return;
    mapLoad(load);
    load += speed;
    if (load >= target && speed > 0) {
      target = Math.random() * os.cpus().length * 5;
      if (load >= target) {
        speed = -0.1;
      } else {
        speed = 0.1;
      }
    }
    if (load <= target && speed < 0) {
      target = Math.random() * os.cpus().length * 5;
      if (load >= target) {
        speed = -0.1;
      } else {
        speed = 0.1;
      }
    }
    if (load <= 0) {
      load = 0;
      speed = 0.1;
    }
  }, 20);
};

const realLoad = () => {
  mapLoad(os.loadavg()[0]);
  setInterval(() => {
    if (!focus.device) return;
    mapLoad(os.loadavg()[0]);
  }, 1000 * 60);
};

focus.open(Model01).then(() => {
  if (process.argv[2] == "simulate") {
    simulate();
  } else {
    realLoad();
  }
});
