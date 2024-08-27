# CollegeDunia-Backend-Assessment

## Overview 

This project is a Book Management RestAPI built with Node.js and MongoDB using Mongoose. It provides endpoints to register, retrieve, update, and delete books, as well as features for pagination, search, and sorting.

## Technologies Used
-	Node.js
-	Express.js
-	MongoDB

## Instructions for setting up the project locally
- Install all the requirements
- Clone the project using github repo link
- Then in package.json add nodemon like this:
  "dev": "nodemon index.js"
- The application will be available at http://localhost:3000 by default. You can change the port by modifying the PORT variable in the .env file.
- Add your own MongoDB URI in .env file
- Use ‘npm run dev’ to start the project

## API endpoints

### Register Books
  -  POST /api/books
  -  Request body should be an array of book objects.

### Retrieve Books
  - GET /api/books
  - Supports pagination, search, and sorting via query parameters.

### Retrieve Book by ID
  - GET /api/books/:id

### Update Book by ID
  - PUT /api/books/:id
  - Request body should include fields to update.

### Delete Book by ID
  - DELETE /api/books/:id

# Postman API Test
    https://api.postman.com/collections/37890183-f2035d3a-d996-4c47-9c0d-bf67eda2e457?access_key=PMAT-01J69SHPPQS9VVN79V00416SEG
