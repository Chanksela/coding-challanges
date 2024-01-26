<?php

$filePath = "./test.txt";
$fileContents = file_get_contents($filePath);
print_r($argv);
print_r(count(file($filePath)));
// echo byte length;
echo strlen($fileContents);

echo "\n";

// echo line count
echo substr_count($fileContents, "\n");
// echo word count

// echo character count
echo "\n";
