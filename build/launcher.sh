#! /usr/bin/env bash
set -e

if [[ -n "$WAYLAND_DISPLAY" ]]; then
	set -- --enable-features=UseOzonePlatform --ozone-platform=wayland "$@"
fi

if ! grep -qFx 1 /proc/sys/kernel/unprivileged_userns_clone; then
	set -- --no-sandbox "$@"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

exec "$SCRIPT_DIR/chrysalis-bin" "$@"
