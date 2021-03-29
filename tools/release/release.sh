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

prompt_for_firmware_update() {
    echo -n "Is the firmware bundle up to date? (y/N) "

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

    VERSION=$(release_version)

    tools/firmware-update
    git add static/**/{experimental,default}.hex
    TMP=$(mktemp)
    cat >${TMP} <<EOF
Update the firmware files we ship with

Built using Chrysalis-Firmware-Bundle-${VERSION} and the latest Kaleidoscope.
EOF
    git commit -s -F "${TMP}"
    rm -f "${TMP}"
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

extract_news() {
    PREV_RELEASE_LINE=$(expr $(grep -n "^===" NEWS.md | head -n 2 | tail -n 1 | cut -d: -f1) - 3)
    if [ ${PREV_RELEASE_LINE} == 2 ]; then
        PREV_RELEASE_LINE=$(wc -l NEWS.md)
    fi

    head -n ${PREV_RELEASE_LINE} NEWS.md | tail -n +5 | awk '{printf "%s ",$0} /^$/{print "\n"} END{print ""}'
}

push_changes() {
    git push
}

create_and_push_tag() {
    VERSION=$(package_version)
    git tag v${VERSION}
    git push origin v${VERSION}
}

verify_version
prompt_for_firmware_update
update_shipped_firmware
update_version
update_release_date
commit_preparations
push_changes
create_and_push_tag
