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
}

commit_changes() {
    VERSION="$(jq -r .version <package.json)"
    git add package.json
    git commit -s -m "Bump version to ${VERSION}"
}

push_changes() {
    git push
}

update_version
commit_changes
push_changes
