#! /bin/bash
set -e

extract_news() {
    PREV_RELEASE_LINE=$(expr $(grep -n "^===" NEWS.md | head -n 2 | tail -n 1 | cut -d: -f1) - 3)
    if [ ${PREV_RELEASE_LINE} == 2 ]; then
        PREV_RELEASE_LINE=$(wc -l NEWS.md)
    fi

    head -n ${PREV_RELEASE_LINE} NEWS.md | tail -n +5 | awk '{printf "%s ",$0} /^$/{print "\n"} END{print ""}'
}

extract_news
