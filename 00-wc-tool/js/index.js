import fs from "fs";
// Create arrays for commands and process arguments
const commands = ["-c", "-l", "-w", "-m"];
let processArguments = process.argv;

// create variable for command, file name and file content
let fileName;
let command;
let fileContent;

// create variables for command results
let byteLength;
let lines;
let words;
let characters;

// create a function that defines variables from arguments
function defineVariablesFromArguments(processArguments) {
	// remove first two arguments from processArguments, it is not needeed
	processArguments.splice(0, 2);

	// check if command exists in processArguments
	processArguments.filter((argument) => {
		if (commands.includes(argument)) {
			command = argument;
		}
		if (!argument.includes("-") && argument.includes(".txt")) {
			fileName = argument;
			fileContent = fs.readFileSync(fileName, "utf8");
		}
		return;
	});
}
function getByteLength(fileContent) {
	return Buffer.byteLength(fileContent);
}
function getLines(fileContent) {
	lines = fileContent.split("\n");
	// check if there is no new line at the end of the file
	if (lines[lines.length - 1] === "") {
		lines = lines.length - 1;
	} else {
		lines = lines.length;
	}
	return lines;
}
function getWords(fileContent) {
	// create words array
	let filteredWords = fileContent.split(/\s+/);

	// filter empty stringss
	words = filteredWords.filter((word) => word !== "");
	return words;
}
function getCharacters(fileContent) {
	// create characters array
	let filteredCharacters = fileContent.split("");
	// filter out empty characters
	characters = filteredCharacters.filter(
		(character) => character !== "" || character !== " "
	);
	return characters;
}
// create a function that provide command results
function commandResults(command, fileContent, processArguments) {
	// command -c
	byteLength = getByteLength(fileContent);
	// command -l
	lines = getLines(fileContent);
	// command -w
	words = getWords(fileContent);
	// command -m
	characters = getCharacters(fileContent);

	if (fileContent && processArguments[0] === fileName) {
		console.log(byteLength, lines, words.length, fileName);
	} else {
		switch (command) {
			case "-c":
				console.log(byteLength);
				break;
			case "-l":
				console.log(lines);
				break;
			case "-w":
				console.log(words.length);
				break;
			case "-m":
				console.log(characters.length);
				break;
		}
	}
}
// check if command was provided
function checkIfArgumentsAreValid(command, fileName) {
	if (
		!commands.includes(processArguments[0]) &&
		processArguments.length === 2
	) {
		console.log(`
\x1b[1;31mCommand not found. Either you didn't provide a command or you provided a wrong command. 

\x1b[32mAviable commands:
	\x1b[0m
    \x1b[1m-c - count bytes,\x1b[0m
    \x1b[1m-l - outputs number of lines,\x1b[0m
    \x1b[1m-w - outputs number of words\x1b[0m
    \x1b[1m-m - outputs number of characters\x1b[0m
`);
	}
	if (!fileName) {
		console.log(
			"\x1b[1;31mFile name is not valid. You might be missing dot snotation\x1b[0m"
		);
		process.exit();
	}
}

// execute functions
defineVariablesFromArguments(processArguments);
checkIfArgumentsAreValid(command, fileName);
commandResults(command, fileContent, processArguments);
