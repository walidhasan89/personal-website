#!/usr/bin/env python3
"""
Generates a circular-cropped favicon from public/assets/walidhasan-logo.png.

Why a separate file instead of editing the master logo in place: the master
logo is reused at multiple sizes/shapes across the site (navbar mark, footer
mark, About/Home hero portrait frames, Inoviqa mentions). Those larger
portrait frames are designed around a square image filling a rounded-square
frame; baking a hard circular crop with transparent corners into that same
file would leave visible transparent corners inside those frames. Browsers
also don't apply page CSS (border-radius) to the tab favicon itself, so
getting a round favicon requires the pixel data to actually be circular.
This script produces a dedicated derived asset for that purpose only; the
navbar/footer <img> marks stay circular via CSS (border-radius: 50%), which
is sufficient for on-page rendering.

Regenerate with:  python3 scripts/generate-round-favicon.py
Output:           public/assets/favicon-round.png (square canvas, circular
                   crop of the source photo, transparent outside the circle)
"""

from PIL import Image, ImageDraw
import os

SRC = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "walidhasan-logo.png")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "favicon-round.png")


def main():
    img = Image.open(SRC).convert("RGBA")

    # Crop to a centered square first (source may not be perfectly square).
    size = min(img.size)
    left = (img.width - size) // 2
    top = (img.height - size) // 2
    img = img.crop((left, top, left + size, top + size))

    # Supersample the circular mask for smoother edges, then downsample.
    scale = 4
    big = size * scale
    img_big = img.resize((big, big), Image.LANCZOS)
    mask_big = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask_big).ellipse((0, 0, big - 1, big - 1), fill=255)
    mask = mask_big.resize((size, size), Image.LANCZOS)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    out.save(OUT, "PNG", optimize=True)
    print("wrote", os.path.relpath(OUT), out.size, os.path.getsize(OUT), "bytes")


if __name__ == "__main__":
    main()
