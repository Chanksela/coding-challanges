import sys
import argparse

# Initilize parser
parser = argparse.ArgumentParser(
    prog="Coding Challange Word Coung (CCWC)",
    description='Custom python code that replicates cli command  "wc"',
)

# Flags
parser.add_argument("-c", "--count", action="store_true", help="byte count")
parser.add_argument("-l", "--line", action="store_true", help="line count")
parser.add_argument("-w", "--word", action="store_true", help="word count")
parser.add_argument("-m", "--character", action="store_true", help="character count")

# Positional arguments
parser.add_argument("file", nargs="?", default=None, help="File to process")

args = parser.parse_args()


def countBytes():
    try:
        if args.file:
            with open(args.file, "rb") as f:
                byte_count = len(f.read())
        else:
            byte_count = len(sys.stdin.buffer.read())
    except FileNotFoundError:
        print(f"No file with name {args.file}")
        return 0
    return byte_count


def countLines():
    try:
        if args.file:
            with open(args.file, "r") as f:
                line_count = len(f.readlines())
        else:
            line_count = len(sys.stdin.readlines())
    except FileNotFoundError:
        print(f"No file with name {args.file}")
        return 0
    return line_count


def countWords():
    try:
        if args.file:
            with open(args.file, "r") as f:
                word_count = len(f.read().split())
        else:
            word_count = len(sys.stdin.read().split())
    except FileNotFoundError:
        print(print(f"No file with name {args.file}"))
        return 0
    return word_count


def countCharacters():
    try:
        if args.file:
            with open(args.file, "rb") as f:
                character_count = len(f.read().decode("utf-8"))
        else:
            character_count = len(sys.stdin.read())
    except FileNotFoundError:
        print(f"No file with name {args.file}")
        return 0
    except UnicodeDecodeError:
        print(f"Error decoding {args.file}")
        return 0
    return character_count


if args.count or args.line or args.word or args.character:
    if args.count:

        print(countBytes(), args.file if args.file else "")
    if args.line:
        print(countLines(), args.file if args.file else "")
    if args.word:
        print(countWords(), args.file if args.file else "")
    if args.character:
        print(countCharacters(), args.file if args.file else "")
else:
    if args.file:
        print(countBytes(), countLines(), countWords(), args.file if args.file else "")
    else:
        print("Can't do it for now")

print(sys.stdin.read())
