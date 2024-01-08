const fs = require("fs");

console.log(process.argv[2]);

const fileName = process.argv[2];

fs.readFile(fileName, "utf8", (err, data) => {
	console.log(data);
});
