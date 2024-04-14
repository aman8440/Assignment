# Assignment

## Question 1 [Easy]
https://gist.github.com/realchoubey/db23ab8b1fa8dc88c7e05294bb6a88fb
## Problem Statement:
In the realm of Puzzlaria, two mysterious arrays, Array X and Array Y, held the secret to a hidden treasure. The enigmatic guardians of Puzzlaria set forth a challenge for the aspiring wizards. Their quest began with Array X, where the wizards needed to discern the most significant element – the one with the highest "magic count." Armed with their wits and keen observation, the wizards had to identify this mystical element.

Having discovered the magical element in Array X, the wizards faced the second part of the challenge. Array Y, a mystical counterpart, awaited exploration. Here, the wizards needed to ascertain whether the magical element from Array X existed within the enchanting Array Y. The guardians emphasized creativity and problem-solving, urging the wizards to devise a clever strategy without delving into complex algorithms.

Considering yourself as wizard and looking for treasure write an algorithm to solve the puzzle to check if getting treasure is possible or not.

Sample 1:
''' Array X: 1  2  3  5  5
Array Y: 5  4  3  2  1
As 5 is the most significant element in Array X and also present in Array Y. Then output will be true '''
Sample 1:
''' Array X: 1  2  3  5  5
Array Y: 4  3  2  1
As 5 is the most significant element in Array X and it is not present in Array Y. Then output will be false '''

## Problem_1

## Question 2 [Medium]
https://gist.github.com/realchoubey/b495f5abe56b1347005c2f5456b1e22f

## Problem statement:
In the town of ArrayVille, ordinary citizens faced a peculiar puzzle in their daily lives. The friendly neighbourhood programmer, armed with algorithms, helped them navigate a array maze. Together, they erased segments whose sums equaled zero. The townsfolk, relieved of the burdensome nodes, rejoiced as their ArrayVille list transformed. Grateful, they bid farewell to the programmer, carrying the final head of the list—a testament to the power of community and algorithms in the heart of ArrayVille.

Considering you are the programmer, please write a program to solve the problem.

Sample Input/Ouptut:
''' Input: [1, 2, -3, 3, 1]
Output: [1, 2, 1] or [3, 1]

In Array [1,2,-3,3,1], (-3 and 3) and (1, 2, -3) are subsquence making sum as 0 so that is removed resulting output as [1,2,1] or [3, 1] '''

## Problem_2

## Question 3 [ETL App]
https://gist.github.com/realchoubey/4db903f480d59656ab267275a82dc0a4

## Problem statement:
Write a web application backend with following REST APIs to perform task mentioned:

JSON Source: https://gist.github.com/realchoubey/25132ad140df2fffd683db85650e0847

Write an GET API to get all table from JSON structure. Read the JSON structure carefully from JSON source, a schema type will be a valid table if below conditions will met for ''' __schema.types[x]: '''
''' entityDefinition.fields !== null &&
    entityDefinition.fields !== "" &&
    entityDefinition.fields !== undefined &&
    entityDefinition.fields.length > 0 &&
    !this.entitiesToExclude.includes(entityDefinition.name.toLowerCase()) &&
    !entityDefinition.name.startsWith("_") '''
Data url: https://api.dapplooker.com/chart/87596cde-e5df-4a5d-9e72-7592d4861513?api_key=4721550ec26a47cabbf1aa0609ab7de3&output_format=json

Above given data url will be used in following operations.

'''GET API to return average gas price of day
  GET API to get number of transactions per block
  PUT API to transform current structure, we need to remove following from array and return recent 10 transactions:
  Max Priority Fee Per Gas
  Status
  Max Fee Per Gas
  Nonce
  Gas Used
  GET API to get the block details, block should contain following:
  Timestamp
  Average gas price of block
  Number of transaction
  GET API to take the input as block number and return its timestamp and number of transactions '''

  To create a web application backend with the specified REST APIs, you can follow these steps:

Set Up Your Environment: Ensure you have Node.js installed on your system. You'll also need a text editor or IDE for writing code.

Initialize a Node.js Project: Create a new directory for your project and run npm init to initialize a new Node.js project. Follow the prompts to set up your package.json file.

Install Required Packages: You'll need to install some packages to work with Express.js and make HTTP requests. Install them using npm:

''' npm install express axios '''
Create Your Express Application: Create a new JavaScript file (e.g., app.js) where you'll define your Express application.

Set Up Express Routes: Define routes for each of the required REST APIs. Use Express's routing capabilities to handle different HTTP methods and paths.

Fetch Data from JSON Source: Use the axios library to make HTTP requests to the JSON source URL and fetch the required data.

Implement Each API Endpoint: Write the logic for each API endpoint based on the provided requirements. Use the fetched data to generate the responses.

Run Your Application: Start your Express server and test your APIs using a tool like Postman or curl.
