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

# Positional arguments
parser.add_argument("file", help="File to process")

args = parser.parse_args()

if args.count:
    try:
        with open(args.file, "rb") as f:
            byte_count = len(f.read())
            print(byte_count, args.file)
    except FileNotFoundError:
        print(f"No file with name {args.file}")

if args.line:
    try:
        with open(args.file, "r") as f:
            line_count = len(f.readlines())
            print(line_count, args.file)
    except FileNotFoundError:
        print(f"No file with name {args.file}")

if args.word:
    try:
        with open(args.file, "r") as f:
            word_count = len(f.read().split())
            print(word_count, args.file)
    except FileNotFoundError:
        print(print(f"No file with name {args.file}"))
