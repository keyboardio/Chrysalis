#! /bin/sh

TMP=$(mktemp --suffix .png)

echo "Taking screenshot..."

import -silent -window Chrysalis -format png - |                  \
    convert -                                                     \
            -bordercolor white -border 6                          \
            -bordercolor snow  -border 1                          \
                                                                  \
            -alpha set -virtual-pixel transparent -channel A      \
            -blur 32x18 -threshold 50% +channel                   \
                                                                  \
            -background black \( +clone -shadow 60x4+0+0 \) +swap \
            -background none  -layers merge +repage               \
                                                                  \
            "${TMP}"

echo "Crushing the image..."

pngcrush -brute -q "${TMP}" data/screenshot.png

rm -f "${TMP}"
