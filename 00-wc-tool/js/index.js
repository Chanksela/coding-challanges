import fs from "fs";
import {
	processArguments,
	commands,
	command,
	fileName,
	fileContent,
	defineVariablesFromArguments,
	checkIfArgumentsAreValid,
	commandResults,
} from "./functions.js";
// execute functions
defineVariablesFromArguments(
	processArguments,
	commands,
	command,
	fileName,
	fileContent
);
checkIfArgumentsAreValid(command, fileName, processArguments);
commandResults(command, fileContent, processArguments);
