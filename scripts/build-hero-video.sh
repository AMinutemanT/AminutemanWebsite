#!/usr/bin/env bash
#
# Derives the homepage hero loop from the master Kamikaze render.
#
# The master is 1920x1080, 28s and 35 MB — three orders of magnitude too heavy to
# sit behind a hero. This cuts the one window that belongs under the palette: the
# hangar reveal at 8.5s, where the airframe is lit against a dark interior and the
# frame stays essentially monochrome, so the orange accent is still the only
# chromatic note on the page. Everything after ~16s cuts to bright daylit cloud,
# which fights white display type and drags colour into the frame.
#
# Head and tail fade to black so the loop seam is invisible without needing a
# crossfade the browser cannot do on a looping <video>.
#
# Run from the repo root:  bash scripts/build-hero-video.sh
set -euo pipefail

SRC="public/videos/Kamikaze.mp4"
OUT="public/videos"
START=8.5     # hangar reveal, full airframe on the stand
DUR=7.0       # long enough to read, short enough to stay under budget
FADE=0.4

[ -f "$SRC" ] || { echo "missing $SRC — run from the repo root" >&2; exit 1; }

# Shared filter chain. 720p is ample for a scrimmed background; the source is
# already near-monochrome, so the slight desaturation only keeps the hangar
# lighting from drifting warm against the accent.
VF="scale=1280:-2,fps=24,eq=saturation=0.85:contrast=1.06"
FADES="fade=t=in:st=0:d=${FADE},fade=t=out:st=$(echo "$DUR - $FADE" | bc):d=${FADE}"

echo "→ hero-loop.mp4"
ffmpeg -v error -y -ss "$START" -t "$DUR" -i "$SRC" \
  -vf "${VF},${FADES}" \
  -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p \
  -movflags +faststart "$OUT/hero-loop.mp4"

echo "→ hero-loop.webm"
ffmpeg -v error -y -ss "$START" -t "$DUR" -i "$SRC" \
  -vf "${VF},${FADES}" \
  -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good \
  "$OUT/hero-loop.webm"

# Poster is sampled just past the fade-in so it matches the video's first visible
# frame rather than cutting to a different shot when playback starts.
echo "→ hero-loop.jpg / .webp"
POSTER_AT=$(echo "$START + $FADE" | bc)
ffmpeg -v error -y -ss "$POSTER_AT" -i "$SRC" -frames:v 1 \
  -vf "scale=1280:-2,eq=saturation=0.85:contrast=1.06" \
  -q:v 6 "$OUT/hero-loop.jpg"
# Homebrew's ffmpeg ships without a webp encoder, so the sibling comes off the
# jpg via cwebp — the same tool the rest of the imagery in public/images was
# derived with.
cwebp -quiet -q 72 "$OUT/hero-loop.jpg" -o "$OUT/hero-loop.webp"

ls -lh "$OUT"/hero-loop.*
