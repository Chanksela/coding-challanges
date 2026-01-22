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
parser.add_argument("file", help="File to process")

args = parser.parse_args()


def countBytes():
    try:
        with open(args.file, "rb") as f:
            byte_count = len(f.read())
    except FileNotFoundError:
        print(f"No file with name {args.file}")

    return byte_count


def countLines():
    try:
        with open(args.file, "r") as f:
            line_count = len(f.readlines())
    except FileNotFoundError:
        print(f"No file with name {args.file}")
    return line_count


def countWords():
    try:
        with open(args.file, "r") as f:
            word_count = len(f.read().split())
    except FileNotFoundError:
        print(print(f"No file with name {args.file}"))
    return word_count


def countCharacters():
    try:
        with open(args.file, "rb") as f:
            character_count = len(f.read().decode("utf-8"))
    except FileNotFoundError:
        print(f"No file with name {args.file}")
    except UnicodeDecodeError:
        print(f"Error decoding {args.file}")
    return character_count


if args.count or args.line or args.word:
    if args.count:

        print(countBytes(), args.file)
    if args.line:
        print(countLines(), args.file)
    if args.word:
        print(countWords(), args.file)
    if args.character:
        print(countCharacters(), args.file)
else:
    print(countBytes(), countLines(), countWords(), args.file)
