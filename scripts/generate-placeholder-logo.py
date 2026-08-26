#!/usr/bin/env python3
"""
Generates a placeholder brand mark for walidhasan.com.

Why this exists: `public/assets/walidhasan-logo.png` was referenced across
the site (navbar, footer, About/Home portrait frames, favicon/apple-touch
icon) but the physical file did not exist in the project handed to this
session, and no tool available here can reach the user's original artwork
(no network access to arbitrary domains, no device-side image source found).
Rather than leave every one of those references broken (missing favicon,
missing nav logo, broken <img> alt-text boxes), this script generates a
clean, square "WH" monogram in the site's own brand colors as a functional
placeholder.

This is a DESIGN placeholder, not a factual claim, so it does not conflict
with the project's no-fabrication rule — no name, credential, stat, or
biographical detail is invented. It should still be swapped for Walid's
real logo/wordmark artwork whenever that's available; tracked in
docs/BLOCKED-USER-INPUT.md.

Regenerate with:  python3 scripts/generate-placeholder-logo.py
Output:           public/assets/walidhasan-logo.png (square, 512x512, transparent bg)
"""

from PIL import Image, ImageDraw, ImageFont
import os

SIZE = 512

BRAND = (59, 130, 246)      # --brand-500
BRAND_DEEP = (29, 78, 216)  # --brand-700
TEXT = (238, 240, 246)      # --text-primary

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
BOLD = os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")


def main():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img, "RGBA")

    # Rounded-square brand gradient background (diagonal blend).
    for y in range(SIZE):
        t = y / SIZE
        c = tuple(int(BRAND[i] + (BRAND_DEEP[i] - BRAND[i]) * t) for i in range(3))
        d.line([(0, y), (SIZE, y)], fill=c + (255,))

    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=104, fill=255)
    bg = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    bg.paste(img, (0, 0), mask)
    img = bg
    d = ImageDraw.Draw(img, "RGBA")

    # "WH" monogram, centered.
    f = ImageFont.truetype(BOLD, 220)
    text = "WH"
    bbox = d.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((SIZE - tw) / 2 - bbox[0], (SIZE - th) / 2 - bbox[1] - 8), text, font=f, fill=TEXT)

    # Thin accent underline echoing the OG card's accent rule.
    bar_w = 120
    d.rounded_rectangle(
        [(SIZE - bar_w) / 2, SIZE / 2 + th / 2 + 26, (SIZE + bar_w) / 2, SIZE / 2 + th / 2 + 34],
        radius=4, fill=(255, 255, 255, 210),
    )

    out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, "walidhasan-logo.png")
    img.save(out, "PNG", optimize=True)
    print("wrote", os.path.relpath(out), os.path.getsize(out), "bytes")


if __name__ == "__main__":
    main()
