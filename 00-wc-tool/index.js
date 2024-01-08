const fs = require("fs");
const commands = ["-c", "-w", "-l"];
console.log(process.argv[2]);
// read and assign the command name
const command = process.argv[2];
// read adn assign the file name
const fileName = process.argv[3];
// check if command was provided
if (!commands.includes(command)) {
	console.log(
		`\x1b[1mCommand not found. 
Second argument must be a command option!\x1b[0m
Aviable commands: 
-c - count bytes, 
-l - outputs number of lines,
-w - outputs number of words`
	);
	process.exit();
}
// create file content constant
const fileContent = fs.readFileSync(fileName, "utf-8");
if (command === "-c") {
	// create a function that count byteLength of the file
	const byteLength = Buffer.byteLength(fileContent);

	// console the thing
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
	// console the thing
	console.log(lines);
} else if (command === "-w") {
	// Replace website names with a placeholder word
	let fileContents = fileContent.replace(/(https?:\/\/[^\s]+)/g, "WEBSITE");

	// Split file for words
	let words = fileContents.match(/[\w']+/g);
	const wordCount = words.filter((word) => word !== "");
	console.log(words);
}
