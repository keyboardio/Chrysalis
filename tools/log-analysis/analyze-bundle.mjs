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

const analyze_error = (logs, error) => {
  // Is it a focus request timeout?
  if (error.label == "focus" && error.message == "request timed out") {
    analyze_focus_request_timeout(logs, error);
  } else {
    // Unknown type of error
    const printable = Object.assign({}, error);
    delete printable.level;
    console.log("Don't know how to analyze:", printable);
  }
}

print_header(get_meta(bundle));

const errors = find_errors(bundle.logs);
console.log(`Found ${errors.length} errors.\n`);
errors.forEach((error) => {
  analyze_error(bundle.logs, error);
  console.log();
})
