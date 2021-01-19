#! /bin/bash
set -e

generate_new_version() {
    VERSION="$(jq -r .version <package.json | cut -d- -f1)"
    PATCH="$(echo "${VERSION}" | cut -d. -f3)"
    MAJOR_MINOR="$(echo "${VERSION}" | cut -d. -f1-2)"

    NEW_VERSION="${MAJOR_MINOR}.$(expr ${PATCH} + 1)-snapshot"

    echo "${NEW_VERSION}"
}

update_version() {
    TMP=$(mktemp)
    VERSION="$(generate_new_version)"
    jq ". | .[\"version\"] = \"${VERSION}\"" <package.json >"${TMP}"
    mv "${TMP}" package.json

    TMP=$(mktemp)
    sed -e "s,\[build:dev\]: .*,[build:dev]: https://github.com/keyboardio/Chrysalis/releases/tag/v${VERSION}," <README.md >"${TMP}"
    mv "${TMP}" README.md
}

commit_changes() {
    VERSION="$(jq -r .version <package.json)"
    git add package.json README.md
    git commit -s -m "Bump version to ${VERSION}"
}

create_prerelease() {
    VERSION="$(jq -r .version <package.json)"
    TMP=$(mktemp)
    cat >>${TMP} <<EOF
Snapshot of the current development build.

Sources may be out of date, but the assets are current.
EOF
    gh release create -p -F "${TMP}" -t "Chrysalis ${VERSION}" v${VERSION}
}

push_changes() {
    git push
}

update_version
commit_changes
push_changes

create_prerelease
