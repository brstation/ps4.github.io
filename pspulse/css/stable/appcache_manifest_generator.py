import argparse
import hashlib
from pathlib import Path


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def generate(root: Path, output_name: str) -> list[str]:
    excluded = {output_name, "appcache_manifest_generator.py"}
    entries: list[str] = []
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.name in excluded or ".git" in path.parts:
            continue
        relative = path.relative_to(root).as_posix()
        entries.append(f"{relative} #{sha256(path)}")
    return [
        "CACHE MANIFEST",
        "# generated; do not edit by hand",
        *entries,
        "",
        "NETWORK:",
        "*",
        "",
    ]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate the cache.manifest used by a static host."
    )
    parser.add_argument("directory", nargs="?", default=".")
    parser.add_argument("-o", "--output", default="cache.manifest")
    args = parser.parse_args()

    root = Path(args.directory).resolve()
    if not root.is_dir():
        parser.error(f"directory does not exist: {root}")

    output = root / args.output
    output.write_text(
        "\n".join(generate(root, output.name)),
        encoding="utf-8",
        newline="\n",
    )
    print(f"Cache manifest generated: {output}")


if __name__ == "__main__":
    main()