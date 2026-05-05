#!/usr/bin/env python3
"""
Compress website images in-place or preview savings first.

Examples:
  python scripts/compress_images.py
  python scripts/compress_images.py --apply
  python scripts/compress_images.py --path public --apply
  python scripts/compress_images.py --apply --max-width 1920 --max-height 1920 --jpeg-quality 82
"""

from __future__ import annotations

import argparse
import io
import sys
from pathlib import Path
from tempfile import NamedTemporaryFile

try:
    from PIL import Image, ImageOps
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Pillow is required. Install it with: pip install pillow"
    ) from exc


DEFAULT_PATHS = ("public",)
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
SKIP_DIRECTORIES = {".git", "node_modules", "dist", "build", ".cache"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Compress images for the website's public assets."
    )
    parser.add_argument(
        "--path",
        dest="paths",
        action="append",
        default=[],
        help="Folder to scan. Can be passed multiple times.",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Write optimized files back to disk. Without this flag, only a dry run is performed.",
    )
    parser.add_argument(
        "--max-width",
        type=int,
        default=1920,
        help="Maximum output width in pixels.",
    )
    parser.add_argument(
        "--max-height",
        type=int,
        default=1920,
        help="Maximum output height in pixels.",
    )
    parser.add_argument(
        "--jpeg-quality",
        type=int,
        default=82,
        help="JPEG/WEBP quality from 1 to 100.",
    )
    parser.add_argument(
        "--min-savings-kb",
        type=int,
        default=8,
        help="Only rewrite files when savings are at least this many KB.",
    )
    return parser.parse_args()


def iter_image_files(paths: list[str]) -> list[Path]:
    files: list[Path] = []
    roots = paths or list(DEFAULT_PATHS)

    for raw_path in roots:
        root = Path(raw_path)
        if not root.exists():
            continue

        for path in root.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
                continue
            if any(part in SKIP_DIRECTORIES for part in path.parts):
                continue
            files.append(path)

    return files


def resize_image(image: Image.Image, max_width: int, max_height: int) -> Image.Image:
    working = ImageOps.exif_transpose(image)
    working.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
    return working


def render_image_bytes(
    path: Path,
    max_width: int,
    max_height: int,
    jpeg_quality: int,
) -> bytes:
    with Image.open(path) as image:
        optimized = resize_image(image, max_width=max_width, max_height=max_height)

        if optimized.mode not in ("RGB", "RGBA", "L", "P"):
            optimized = optimized.convert("RGB")

        output = io.BytesIO()
        suffix = path.suffix.lower()

        if suffix in {".jpg", ".jpeg"}:
            if optimized.mode in ("RGBA", "P"):
                optimized = optimized.convert("RGB")
            optimized.save(
                output,
                format="JPEG",
                optimize=True,
                quality=jpeg_quality,
                progressive=True,
            )
        elif suffix == ".png":
            png_image = optimized
            if png_image.mode == "RGBA":
                # Palette PNGs are often much smaller for website graphics.
                png_image = png_image.convert("P", palette=Image.Palette.ADAPTIVE)
            png_image.save(output, format="PNG", optimize=True)
        elif suffix == ".webp":
            optimized.save(
                output,
                format="WEBP",
                quality=jpeg_quality,
                optimize=True,
                method=6,
            )
        else:
            raise ValueError(f"Unsupported file type: {path.suffix}")

        return output.getvalue()


def write_bytes(path: Path, data: bytes) -> None:
    with NamedTemporaryFile(delete=False, dir=path.parent, suffix=path.suffix) as temp_file:
        temp_file.write(data)
        temp_path = Path(temp_file.name)

    temp_path.replace(path)


def format_mb(byte_count: int) -> str:
    return f"{byte_count / (1024 * 1024):.2f} MB"


def main() -> int:
    args = parse_args()
    files = iter_image_files(args.paths)

    if not files:
        print("No supported images found.")
        return 0

    total_before = 0
    total_after = 0
    changed = 0
    skipped = 0
    min_savings_bytes = args.min_savings_kb * 1024

    for path in files:
        try:
            before_size = path.stat().st_size
            after_bytes = render_image_bytes(
                path,
                max_width=args.max_width,
                max_height=args.max_height,
                jpeg_quality=args.jpeg_quality,
            )
            after_size = len(after_bytes)

            total_before += before_size
            total_after += min(before_size, after_size) if after_size < before_size else before_size

            savings = before_size - after_size
            if savings < min_savings_bytes:
                skipped += 1
                continue

            if args.apply:
                write_bytes(path, after_bytes)

            changed += 1
            print(
                f"{'APPLY' if args.apply else 'DRY'} {path} | "
                f"{format_mb(before_size)} -> {format_mb(after_size)}"
            )
        except Exception as exc:  # pragma: no cover
            skipped += 1
            total_after += path.stat().st_size
            print(f"SKIP {path}: {exc}", file=sys.stderr)

    saved = total_before - total_after
    mode = "Applied" if args.apply else "Dry run"
    print()
    print(f"{mode} complete")
    print(f"Images scanned: {len(files)}")
    print(f"Images changed: {changed}")
    print(f"Images skipped: {skipped}")
    print(f"Before: {format_mb(total_before)}")
    print(f"After:  {format_mb(total_after)}")
    print(f"Saved:  {format_mb(saved)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
