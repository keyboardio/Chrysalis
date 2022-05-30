#! /bin/sh

TMP_RAW=$(mktemp --suffix .png)
TMP=$(mktemp --suffix .png)

echo "Taking screenshot..."

import -silent -window Chrysalis -format png "${TMP_RAW}"

convert "${TMP_RAW}"                                          \
        -alpha set -virtual-pixel transparent -channel A      \
        -blur 32x18 -threshold 50% +channel                   \
                                                              \
        -background black \( +clone -shadow 60x4+0+0 \) +swap \
        -background none  -layers merge +repage               \
                                                              \
        "${TMP}"

rm -f "${TMP_RAW}"

echo "Crushing the image..."

pngcrush -brute -q "${TMP}" data/screenshot.png

rm -f "${TMP}"
