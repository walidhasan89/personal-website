#!/usr/bin/env python3
"""
Generates the default Open Graph / Twitter share image for walidhasan.com.

Why this exists: the site declared `twitter:card = summary_large_image` but
shipped no `og:image`, so every share on LinkedIn/X/Facebook/Slack rendered
as a bare text link. This script produces a clean, on-brand 1200x630 card
using only factual identity text (name + role + domain) — no claims, stats,
or numbers that would need verification.

Regenerate with:  python3 scripts/generate-og-image.py
Output:           public/assets/og-default.png

NOTE: This is a typographic fallback. If/when a professional headshot is
available, replacing this with a photo-based card will perform better for
both click-through and Knowledge Graph / entity recognition purposes.
See docs/BLOCKED-USER-INPUT.md.
"""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

# Brand colors read from src/styles/global.css (dark theme :root)
BG = (6, 6, 17)            # --bg-primary
BRAND = (59, 130, 246)     # --brand-500
BRAND_DEEP = (29, 78, 216) # --brand-700
TEXT = (238, 240, 246)     # --text-primary
MUTED = (148, 163, 192)    # --text-secondary

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
BOLD = os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")
REG = os.path.join(FONT_DIR, "DejaVuSans.ttf")


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")

    # Soft brand glow in the upper-left, echoing the site's hero mesh.
    for r in range(520, 0, -12):
        alpha = int(16 * (1 - r / 520))
        d.ellipse([-160 - r // 3, -220 - r // 3, 420 + r, 300 + r],
                  fill=(37, 99, 235, max(alpha, 0)))

    # Subtle grid, matching the site's hero-grid motif.
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=(59, 130, 246, 10), width=1)
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=(59, 130, 246, 10), width=1)

    f_name = ImageFont.truetype(BOLD, 84)
    f_role = ImageFont.truetype(BOLD, 38)
    f_sub = ImageFont.truetype(REG, 27)
    f_dom = ImageFont.truetype(REG, 25)

    x = 86

    # Accent rule
    d.rounded_rectangle([x, 150, x + 96, 158], radius=4, fill=BRAND)

    d.text((x, 196), "Walid Hasan", font=f_name, fill=TEXT)
    d.text((x, 310), "Digital Growth Consultant", font=f_role, fill=BRAND)
    d.text((x, 372), "Web Design  ·  SEO  ·  Analytics  ·  Conversion",
           font=f_sub, fill=MUTED)
    d.text((x, 424), "Founder of Inoviqa LLC", font=f_sub, fill=MUTED)

    # Footer domain, with a small brand dot.
    d.ellipse([x, 546, x + 13, 559], fill=BRAND)
    d.text((x + 26, 540), "walidhasan.com", font=f_dom, fill=MUTED)

    # Right-edge brand gradient bar.
    for i in range(10):
        t = i / 10
        c = tuple(int(BRAND[j] + (BRAND_DEEP[j] - BRAND[j]) * t) for j in range(3))
        d.rectangle([W - 10 + i, 0, W - 9 + i, H], fill=c)

    out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, "og-default.png")
    img.save(out, "PNG", optimize=True)
    print("wrote", os.path.relpath(out), os.path.getsize(out), "bytes")


if __name__ == "__main__":
    main()
