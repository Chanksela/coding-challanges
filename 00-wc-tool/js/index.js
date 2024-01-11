import fs from "fs";
// Create arrays for commands and process arguments
const commands = ["-c", "-l", "-w", "-m"];
let processArguments = process.argv;

// create variable for command, file name and file content
let fileName;
let command;
let fileContent;

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
// create a function that provide command results
function commandResults(command, fileContent, processArguments) {
	// command -c
	const byteLength = Buffer.byteLength(fileContent);
	// command -l
	let lines = fileContent.split("\n");
	// check if there is no new line at the end of the file
	if (lines[lines.length - 1] === "") {
		lines = lines.length - 1;
	} else {
		lines = lines.length;
	}
	// command -w
	// create words array
	const words = fileContent.split(/\s+/);

	// filter empty stringss
	const filteredWords = words.filter((word) => word !== "");

	// command -m

	// create characters array
	let characters = fileContent.split("");
	// filter out empty characters
	const filteredCharacters = characters.filter(
		(character) => character !== "" || character !== " "
	);
	if (fileContent && processArguments[0] === fileName) {
		console.log(
			Buffer.byteLength(fileContent),
			lines,
			filteredWords.length,
			fileName
		);
	} else {
		switch (command) {
			case "-c":
				console.log(byteLength);
				break;
			case "-l":
				console.log(lines);
				break;
			case "-w":
				console.log(filteredWords.length);
				break;
			case "-m":
				console.log(filteredCharacters.length);
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
