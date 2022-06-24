#! /bin/bash
set -e

news_version() {
    head -n 1 NEWS.md | cut -d" " -f 2
}

package_version() {
    jq -r .version <package.json
}

release_version() {
    package_version | cut -d- -f1
}

firmware_version() {
    head -n 1 static/firmware-changelog.md | cut -d" " -f 2
}

verify_version() {
    if [ "$(news_version)" != "$(package_version)" ]; then
        cat >&2 <<EOF
Package version ($(package_version)) does not match the version in NEWS.md ($(news_version)).

Please add NEWS items for the upcoming release, and make sure the versions
align.
EOF
    fi

    case "$(package_version)" in
        *-snapshot)
            ;;
        *)
            cat >&2 <<EOF
Package version is not a snapshot version. This script requires the version to
be a snapshot version of the upcoming release.
EOF
            exit 1
            ;;
    esac
}

verify_firmware_version() {
    if [ "$(firmware_version)" != "$(package_version)" ]; then
        cat >&2 <<EOF
Package version ($(package_version)) does not match the version in  static/firmware-changelog.md ($(firmware_version)).

Please update the shipped firmware, and make sure the versions align.
EOF
        exit 1
    fi
}

prompt_for_screenshot() {
    echo -n "Is the screenshot up to date? (Y/n) "

    read a

    case "$a" in
        n|N)
            exit 1
        ;;
        *)
            ;;
    esac
}

prompt_for_package_version() {
    package="$1"
    version="$(yarn why ${package} | awk '/=> Found/ { print $4 }' | tr -d '"')"

    echo -n "The \"${package}\" package is at version \"${version}\". Is that ok? (y/N) "

    read a

    case "$a" in
        y|Y)
            ;;
        *)
            exit 1
            ;;
    esac
}

update_shipped_firmware() {
    echo -n "Do the firmware files need updating? (Y/n) "
    read a
    case "$a" in
        n|N)
            return
            ;;
    esac

    tools/firmware-update
}

update_version() {
    VERSION="$(release_version)"

    ## Update package.json
    TMP=$(mktemp)
    jq ". | .[\"version\"] = \"${VERSION}\"" <package.json >"${TMP}"
    mv "${TMP}" package.json

    ## Update NEWS.md
    TMP=$(mktemp)
    VERSION_STRING="Chrysalis ${VERSION}"
    (echo "${VERSION_STRING}"; \
     echo "${VERSION_STRING}" | sed -e "s/./=/g"; \
     tail -n +3 NEWS.md) >"${TMP}"
    mv "${TMP}" NEWS.md
}

update_release_date() {
    TMP=$(mktemp)
    sed -e "s,\*\*UNRELEASED\*\*,Released on $(date +%Y-%m-%d)," <NEWS.md >${TMP}
    mv "${TMP}" NEWS.md
}

commit_preparations() {
    TMP=$(mktemp)
    git add package.json NEWS.md
    cat >${TMP} <<EOF
Preparations for Chrysalis $(package_version)

Bump the version, and finalize the release date.
EOF
    git commit -s -F "${TMP}"
    rm -f "${TMP}"
}

push_changes() {
    git push
}

create_and_push_tag() {
    VERSION=$(package_version)
    git tag -a -s -m "Chrysalis ${VERSION} release." v${VERSION}
    git push origin v${VERSION}
}

verify_version
prompt_for_screenshot
prompt_for_package_version usb
prompt_for_package_version serialport
update_shipped_firmware
verify_firmware_version
update_version
update_release_date
commit_preparations
push_changes
create_and_push_tag
