#! /usr/bin/env bash
set -e

if [ ! -z "$WAYLAND_DISPLAY" ]; then
    WAYLAND_OPTIONS="--enable-features=UseOzonePlatform --ozone-platform=wayland"
fi

UNPRIVILEGED_USERNS_ENABLED=$(cat /proc/sys/kernel/unprivileged_userns_clone 2>/dev/null || echo 0)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/chrysalis-bin" "$([[ $UNPRIVILEGED_USERNS_ENABLED == 0 ]] && echo '--no-sandbox')" "${WAYLAND_OPTIONS}" "$@"
