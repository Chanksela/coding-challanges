const fs = require("fs");
const commands = ["-c", "-w", "-l"];
console.log(process.argv[2]);
// read and assign the command name
const command = process.argv[2];
// read adn assign the file name
const fileName = process.argv[3];
// check if command was provided
if (!commands.includes(command)) {
	console.log("Command not found.\nSecond argument must be a command option!");
	process.exit();
}
// create file content constant
const fileContent = fs.readFileSync(fileName, "utf-8");

// create a function that count byteLength of the file
const byteLength = Buffer.byteLength(fileContent);

// console the thing
console.log(byteLength);
