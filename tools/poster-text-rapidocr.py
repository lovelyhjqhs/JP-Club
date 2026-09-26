"""
Poster OCR for the garden-party page, using RapidOCR (PP-OCR models, ONNX runtime).

Reads every poster image under --root and writes a TSV for tools/build-poster-text.js:
    <relative path> <tab> rapidocr <tab> recognised text

Usage:
    python tools/poster-text-rapidocr.py --root "海报(1)" --out .tmp-poster-text.txt

Requires: rapidocr-onnxruntime, onnxruntime, opencv-python-headless, pyclipper, shapely
"""
import argparse
import sys
from pathlib import Path

from rapidocr_onnxruntime import RapidOCR

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, help="folder that contains the posters")
    parser.add_argument("--out", required=True, help="TSV file to write")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    files = sorted(p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in IMAGE_SUFFIXES)
    if not files:
        print(f"no images under {root}", file=sys.stderr)
        return 1

    engine = RapidOCR()
    rows = []
    for path in files:
        rel = path.relative_to(root).as_posix()
        result, _ = engine(str(path))
        text = " ".join(item[1] for item in result) if result else ""
        rows.append(f"{rel}\trapidocr\t{text}")
        print(f"{rel} -> {len(text)} chars")

    Path(args.out).write_text("\n".join(rows) + "\n", encoding="utf-8")
    print(f"done -> {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
