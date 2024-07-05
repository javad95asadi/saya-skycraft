Pre-Interview Assignment Building a RESTful API with Node.js
Objective: Build a RESTful API using Node.js that allows users to perform CRUD (Create, Read, Update, Delete) operations on a resource, such as "users".

############################################ thing that done yet ############################################

Setup and Configuration:
• Initialize a new Node.js project.
• Use Express.js as the web server framework.
• Set up a MongoDB database to store the data. You can use 
an ORM like Mongoose or the native MongoDB driver.

Implement CRUD operations for the chosen resource. For 
example:
• GET /users - Retrieve all users.
• POST /users - Create a new user.
• GET /users/:id - Retrieve a specific user by ID.
• PUT /users/:id - Update a specific user by ID.
• DELETE /users/:id - Delete a specific user by ID.

• Implement validation for input data (e.g., required fields, 
data type validation).
• Return appropriate error responses for invalid requests.

• Implement centralized error handling to handle 
unexpected errors gracefully.
• Return meaningful error messages in the API responses.

• Write unit tests to ensure the API endpoints behave as 
expected.
• Use a testing framework like Mocha or Jest.

• Document the API endpoints using tools like Swagger or Postman.
• Provide clear instructions on how to use the API

• Implement basic security measures such as input sanitization and 
preventing common vulnerabilities like SQL injection and XSS attacks.

• Implement authentication and authorization using JWT (JSON Web 
Tokens).
• Add pagination, sorting, and filtering options for retrieving resources.

############################################ how to start ############################################

Install Dependencies
Navigate to the back-end directory and run:

npm i

Using Postman
To interact with the API, use Postman to send requests to the specified endpoints.

Authentication
The API uses JWT for authentication. To use the API, you must first create a user account.

Endpoints

1. Signup
Method: POST Endpoint: http://localhost:8080/auth/signup Request Body:

{
  "email": "example@gmail.com",
  "password": "11223344",
  "name": "example"
}

2. Login
Method: POST Endpoint: http://localhost:8080/auth/login Request Body:

{
  "email": "example@gmail.com",
  "password": "11223344"
}

3. Get All Users
Method: GET Endpoint: http://localhost:8080/users/

4. Get User by ID
Method: GET Endpoint: http://localhost:8080/users/:example_id Replace :example_id with the actual user ID obtained from step 3.

5. Update User Data
Method: PUT Endpoint: http://localhost:8080/users/:example_id Request Body:

{
  "email": "exampleee@gmail.com",
  "password": "11223344",
  "name": "exampleee"
}

7. Sorting
Method: GET Endpoint: http://localhost:8080/users?sortBy=createdAt

8. Pagination
Method: GET Endpoint: http://localhost:8080/users?page=2

9. PageSize
Method: GET Endpoint: http://localhost:8080/users?pageSize=2

10. Logout
Method: POST Endpoint: http://localhost:8080/auth/logout

Note: Make sure to replace example@gmail.com and example_id with actual values.
