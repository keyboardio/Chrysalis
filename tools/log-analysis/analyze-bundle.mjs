#! /usr/bin/env node
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

import fs from "fs";

const bundle = JSON.parse(
  fs.readFileSync(process.argv[2], { encoding: "utf-8" })
);

const get_meta = (bundle) => ({
  timestamp: bundle.timestamp,
  chrysalis: bundle.chrysalis,
  os: {
    platform: bundle.os.platform,
    distro: bundle.os.distro,
    release: bundle.os.release,
    arch: bundle.os.arch,
  },
});

const print_header = (meta) => {
  const title = `Chrysalis ${meta.chrysalis.version}, on ${meta.os.distro} (${meta.os.release}, ${meta.os.arch}); ${meta.timestamp}`;
  console.log(title);
  console.log(title.replace(/./g, "="));
};

const find_errors = (logs) => {
  return logs.filter((info) => info.level == "error");
};

const focus_timeout_summary = (req, resp) => {
  const ts1 = new Date(req.timestamp), ts2 = new Date(resp.timestamp);
  const diff = (ts2 - ts1) / 1000;
  console.log(` Request that timed out (#${req.request.id}):`);
  console.log(`   Sent at: ${req.timestamp}`);
  console.log(`   Request: ${req.request.command} ${req.request.args.join(" ")}`);
  console.log(`   Timeout: ${resp.timestamp} (${diff.toFixed(2)}s)`)
  console.log()
}

const focus_unfulfilled_request = (req) => {
  console.log(` Unfulfilled request (#${req.request.id}):`);
  console.log(`   Sent at: ${req.timestamp}`)
  console.log(`   Request: ${req.request.command} ${req.request.args.join(" ")}`);
  console.log();
}

const analyze_focus_request_timeout = (logs, error) => {
  const error_req_id = error.request.id;
  const error_log_index = logs.indexOf(error);

  // Find the connection
  let connection_index;
  for (let i = error_log_index - 1; i > 0; i = i - 1) {
    if (logs[i].message == "Connecting to port") {
      connection_index = i;
      break;
    }
  }

  let request_response_map = {};
  // Find previous requests
  for (let i = connection_index + 1; i <= error_log_index; i = i + 1) {
    const info = logs[i];
    if (info.label == "focus") {
      if (info.message == "request") {
        request_response_map[[info.request.id]] = {
          request_index: i,
        };
      } else if (info.message == "response") {
        request_response_map[[info.request.id]].response_index = i;
      }
    }
  }

  const fully_fulfilled = Object.keys(request_response_map)
        .reduce((fulfilled, curr) => {
          if (curr == error_req_id) return fulfilled;
          return request_response_map[curr].request_index !== undefined &&
            request_response_map[curr].response_index !== undefined;
        }, true);

  if (fully_fulfilled) {
    console.log("Every previous request was fulfilled, nothing hanging.");
    focus_timeout_summary(logs[request_response_map[error_req_id].request_index], error);
  } else {
    for (const i of Object.keys(request_response_map)) {
      const { request_index, response_index } = request_response_map[i];
      if (!response_index) {
        focus_unfulfilled_request(logs[request_index]);
      }
    }
  }
}

const format_failed_step = (step) => {
  console.log(`Flashing failed at the "${step.step}" step, at ${step.timestamp}.`)
}

const analyze_flash_reconnect_fail = (logs, flash_start_index, error_log_index, error) => {
  let last_portlist;
  for (let i = error_log_index; i > flash_start_index; i--) {
    if (logs[i].message == "serial port list obtained" && logs[i].function == "waitForSerialDevice") {
      last_portlist = logs[i];
      break;
    }
  }

  const bootloader = last_portlist.device.bootloader;

  // Check if we find a bootloader match
  let boot_found = false;
  for (const port of last_portlist.portList) {
    const vid = parseInt(`0x${port.vendorId}`), pid = parseInt(`0x${port.productId}`)

    if (vid == bootloader.vendorId && pid == bootloader.productId) {
      boot_found = true;
      break
    }
  }

  if (!boot_found) {
    console.log("\nUnable to determine what went wrong, sorry.")
    const printable = Object.assign({}, error);
    delete printable.level;
    console.log("Final error:", printable);
  }

  console.log("Verdict: The keyboard is still in bootloader mode.")
  console.log(" It either failed to boot into the new firmware, or the bootloader")
  console.log(" trigger key has been held for too long.")
}

const analyze_flash_bootloaderWait_fail = (logs, flash_start_index, error_log_index, error) => {
  let last_portlist;
  for (let i = error_log_index; i > flash_start_index; i--) {
    if (logs[i].message == "serial port list obtained" && logs[i].function == "waitForSerialDevice") {
      last_portlist = logs[i];
      break;
    }
  }

  const device = last_portlist.device;

  // Check if we find a non-bootloader match
  let device_found = false;
  for (const port of last_portlist.portList) {
    const vid = parseInt(`0x${port.vendorId}`), pid = parseInt(`0x${port.productId}`)

    // FIXME: We're checking pid + 1 here, assuming that the boot pid is the
    // normal pid - 1. The vid/pid we fished out from the last portlist is the
    // vid/pid Chrysalis is looking for, which would be the bootloader at this
    // stage.
    if (vid == device.vendorId && pid == device.productId + 1) {
      device_found = true;
      break
    }
  }

  if (!device_found) {
    console.log("\nUnable to determine what went wrong, sorry.")
    const printable = Object.assign({}, error);
    delete printable.level;
    console.log("Final error:", printable);
  }

  console.log("Verdict: The keyboard is still in keyboard mode.")
  console.log(" It either failed to go into bootloader mode in the first place,")
  console.log(" or the trigger key has been released too early.")
}

const analyze_flash_error = (logs, error) => {
  const error_log_index = logs.indexOf(error);

  let flash_start_index;
  for (let i = error_log_index; i > 0; i--) {
    if (logs[i].message == "Starting to flash") {
      flash_start_index = i;
      break;
    }
  }

  // Find where flashing started
  if (!flash_start_index) {
    // Unknown type of error
    const printable = Object.assign({}, error);
    delete printable.level;
    console.log("Unable to find where flashing started for: ", printable);
    return
  }

  // Find the executed steps
  let executed_steps = []
  for (let i = flash_start_index + 1; i < error_log_index; i++) {
    if (logs[i].message == "executing step" && logs[i].label == "flash") {
      executed_steps.push(logs[i]);
    }
  }

  // Since we have an error, during flash, one of the steps must have failed.
  // It's going to be the last one.
  const failed_step = executed_steps.pop()

  format_failed_step(failed_step);

  if (failed_step.step == "reconnect") {
    return analyze_flash_reconnect_fail(logs, flash_start_index, error_log_index, error);
  }
  if (failed_step.step == "bootloaderWait") {
    return analyze_flash_bootloaderWait_fail(logs, flash_start_index, error_log_index, error);
  }

  // Fallback: We don't know how to analyize steps other than reconnect and
  // bootloaderWait.
  console.log(`\nI don't know how to analyze "${failed_step.step}" steps, exiting.`)

  const printable = Object.assign({}, error);
  delete printable.level;

  console.log("Final error:", printable);
}

const analyze_error = (logs, error) => {
  // Is it a focus request timeout?
  if (error.label == "focus" && error.message == "request timed out") {
    analyze_focus_request_timeout(logs, error);
  } else if (error.message == "Error while uploading firmware") {
    analyze_flash_error(logs, error);
  } else if (error.label == "flash" && error.message == "bootloader not found") {
    // Ignore this one, because it always comes hand in hand with the above one,
    // and we don't want to analyze the same thing twice.
    return
  } else {
    // Unknown type of error
    const printable = Object.assign({}, error);
    delete printable.level;
    console.log("Don't know how to analyze:", printable);
  }

  console.log();
}

print_header(get_meta(bundle));

const errors = find_errors(bundle.logs);
console.log(`Found ${errors.length} errors.\n`);
errors.forEach((error) => {
  analyze_error(bundle.logs, error);
})
