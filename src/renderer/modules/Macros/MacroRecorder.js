// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2022  DygmaLab, Inc.
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
document.onkeyup = keyup;
document.onkeydown = keydown;
var inputs = [];
var timer = 0;
var timercap = null;
var on = 0;
var playing = 0;
var order = 0;
function keydown(event) {
  event = event || window.event;
  if (event.keyCode === 191) {
    record("toggle", "keydown");
  }

  if (event.keyCode === 220) {
    play();
  }
  record(event.keyCode, "keydown");
}
function keyup(event) {
  event = event || window.event;
  record(event.keyCode, "keyup");
}

function record(info, type) {
  if (info === "toggle") {
    if (on == 0) {
      on = 1;
      timer = 0;
      inputs = [];
    } else {
      on = 0;
      timercap = timer;
    }
  } else {
    inputs.push([info, type, timer]);
  }
}

function play() {
  if (on == 0) {
    timer = 0;
    playing = 1;
    order = 0;
  }
}
var maintime = setInterval(function () {
  timer++;
  if (playing == 1) {
    while (inputs[order][2] < timer) {
      var evnt = new KeyboardEvent(inputs[order][1], { keyCode: inputs[order][0], which: inputs[order][0] });
      //for (var x = 0; x < document.all.length; x++) {
      //document.all[x].dispatchEvent(evnt);
      //}
      window.dispatchEvent(evnt);
      order++;
    }
    if (timer >= timercap) {
      playing = 0;
      timer = 0;
    }
  }
}, 30 / 1000);
