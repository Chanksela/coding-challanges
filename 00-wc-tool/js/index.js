import fs from "fs";
// Create arrays for commands and process arguments
const commands = ["-c", "-l", "-w", "-m"];
let processArguments = process.argv;

// create variable for file name and command
let fileName;
let command;

function defineVariablesFromArguments(argument) {
	// remove first two arguments from processArguments, it is not needeed
	processArguments.splice(0, 2);

	// check if command exists in processArguments
	processArguments.filter((argument) => {
		if (commands.includes(argument)) {
			command = argument;
		}
		if (!argument.includes("-") && argument.includes(".txt")) {
			fileName = argument;
		}
		return;
	});
}

// check if command was provided
function checkIfArgumentsAreValid(command, fileName) {
	if (!command) {
		console.log(
			`\x1b[1mCommand not found. Either you didn't provide a command or you provided a wrong command. 
Second argument must be a command option!
Aviable commands:\x1b[0m 
-c - count bytes, 
-l - outputs number of lines,
-w - outputs number of words
-m - outputs number of characters
`
		);
	}
	if (!fileName) {
		console.log(
			"\x1b[1mFile name is not valid. You might be missing . notation\x1b[0m"
		);
		process.exit();
	}
}
defineVariablesFromArguments(processArguments);
checkIfArgumentsAreValid(command, fileName);
const fileContent = fileName && fs.readFileSync(fileName, "utf-8");

// create file content constant
if (command === "-c") {
	// create a function that count byteLength of the file
	const byteLength = Buffer.byteLength(fileContent);

	// console bytes length
	console.log(byteLength);
}
// create a function for commanw -l
else if (command === "-l") {
	// split text by new line
	let lines = fileContent.split("\n");
	// check if there is no new line at the end of the file
	if (lines[lines.length - 1] === "") {
		lines = lines.length - 1;
	} else {
		lines = lines.length;
	}
	// console lines
	console.log(lines);
} else if (command === "-w") {
	// create words array
	let words = fileContent.split(/\s+/);

	// filter empty stringss
	const filteredWords = words.filter((word) => word !== "");

	// console words
	console.log(filteredWords.length);
} else if (command === "-m") {
	// create characters array
	let characters = fileContent.split("");

	// filter out empty characters
	const filteredWords = characters.filter(
		(character) => character !== "" || character !== " "
	);

	console.log(filteredWords.length);
}
