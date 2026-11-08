# Lab 3: Advanced REST API Operations Using Express.js

## Live Deployment Link:
Not deployed yet.

## Course Information

| Field      | Details                          |
|------------|----------------------------------|
| Course     | Backend Development Fundamentals |
| Year/Term  | Year II, Term II                 |
| University | Aurora Deemed to be University   |
| Faculty    | Mr. Joel Prashanth D             |

## Student Details

| Field               | Details              |
|---------------------|----------------------|
| Name                | Darapu Siva Reddy    |
| Registration Number |    252U1R9128        |
| Section             |      S-26            |

## Project Overview

This project implements an advanced REST API using Node.js and Express.js for managing book records. It provides CRUD operations along with additional features such as searching books by title, sorting records, pagination, price-range filtering, input validation, and error handling.

The application uses HTTP methods such as GET, POST, PUT, and DELETE to perform operations on book records.

## Project Objective

To develop a RESTful API using Node.js and Express.js that supports book management operations, advanced searching, sorting, pagination, price filtering, request validation, and appropriate HTTP status codes.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- SQLite (installed dependency; database integration not yet implemented in the shared server.js)
- sqlite3
- sqlite
- VS Code
- REST Client Extension
- npm

## Features

- Creates an Express.js server.
- Implements a home API route.
- Retrieves all books.
- Retrieves an individual book using its ID.
- Creates new book records.
- Updates existing book records.
- Deletes book records.
- Searches books by title using the `search_q` parameter.
- Sorts books by ID, title, author, or price.
- Supports ascending (ASC) and descending (DESC) sorting.
- Implements pagination using limit and offset.
- Filters books using minimum and maximum price.
- Supports combined search, sorting, and pagination.
- Validates request data before creating or updating books.
- Handles invalid sorting fields and sorting orders.
- Validates limit and offset values.
- Handles invalid price filters and non-existing book IDs.
- Returns appropriate HTTP status codes and JSON responses.
- Tests API endpoints using the VS Code REST Client extension.

## Initial Book Records

The application starts with five sample book records stored in a JavaScript array.

| ID | Title | Author | Price |
|---|---|---|---|
| 1 | Harry Potter | J.K. Rowling | 500 |
| 2 | Wings of Fire | A.P.J. Abdul Kalam | 300 |
| 3 | The Alchemist | Paulo Coelho | 400 |
| 4 | Rich Dad Poor Dad | Robert Kiyosaki | 600 |
| 5 | Atomic Habits | James Clear | 450 |

**Note:** The current implementation stores records in memory. Changes are lost when the server restarts.

## API Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/` | Home API | 200 |
| GET | `/books` | Retrieve all books | 200 |
| GET | `/books/:id` | Retrieve a book by ID | 200 |
| POST | `/books` | Create a new book | 201 |
| PUT | `/books/:id` | Update an existing book | 200 |
| DELETE | `/books/:id` | Delete a book | 200 |

## Advanced Query Parameters

The GET `/books` endpoint supports the following query parameters.

| Parameter | Description | Example |
|---|---|---|
| search_q | Search books by title | `?search_q=Harry` |
| order_by | Select sorting field | `?order_by=price` |
| order | Select sorting order | `?order=ASC` |
| limit | Maximum number of records | `?limit=2` |
| offset | Number of records to skip | `?offset=0` |
| min_price | Minimum book price | `?min_price=300` |
| max_price | Maximum book price | `?max_price=500` |

### Search Books

```http
GET /books?search_q=Harry
```

Searches book titles using a case-insensitive partial match.

### Sorting Ascending

```http
GET /books?order_by=price&order=ASC
```

Displays books from lowest to highest price.

### Sorting Descending

```http
GET /books?order_by=price&order=DESC
```

Displays books from highest to lowest price.

### Pagination

```http
GET /books?limit=2&offset=0
```

Returns the first two books.

```http
GET /books?limit=2&offset=2
```

Returns the next two books.

### Price-Range Filtering

```http
GET /books?min_price=300&max_price=500
```

Returns books with prices between 300 and 500, inclusive.

### Combined Search, Sorting and Pagination

```http
GET /books?search_q=The&order_by=price&order=ASC&limit=5&offset=0
```

Searches for books containing the word "The", sorts matching results by price in ascending order, and applies pagination.

## Request Body

POST `/books` and PUT `/books/:id` require a JSON request body.

Example:

```json
{
    "title": "JavaScript Basics",
    "author": "John Smith",
    "price": 350
}
```

### Input Validation

The application validates the following fields:

- Title must be a non-empty string.
- Author must be a non-empty string.
- Price must be a valid finite JavaScript number.

Invalid input returns `400 Bad Request`.

## Response and Error Status Codes

| Situation | Status Code |
|---|---|
| Successful home request | 200 OK |
| Successful GET request | 200 OK |
| Successful POST request | 201 Created |
| Successful PUT request | 200 OK |
| Successful DELETE request | 200 OK |
| Invalid input | 400 Bad Request |
| Invalid sorting field | 400 Bad Request |
| Invalid sorting order | 400 Bad Request |
| Invalid limit or offset | 400 Bad Request |
| Book not found | 404 Not Found |
| Invalid route | 404 Not Found |

## Project Structure

```text
lab_3/
│
├── node_modules/
├── server.js
├── app.http
├── package.json
├── package-lock.json
├── README.md
└── screenshots/
    ├── home-api.png
    ├── get-all-books.png
    ├── get-book-by-id.png
    ├── search-books.png
    ├── sort-ascending.png
    ├── sort-descending.png
    ├── pagination.png
    ├── price-range-filter.png
    ├── combined-search-sort.png
    ├── create-book.png
    ├── invalid-book-data.png
    ├── update-book.png
    ├── update-non-existing-book.png
    ├── delete-book.png
    ├── delete-non-existing-book.png
    ├── get-non-existing-book.png
    └── invalid-requests.png
```

## Installation and Running

### Prerequisites

- Node.js installed.
- npm installed.
- Visual Studio Code installed.
- REST Client extension installed in VS Code.

### Step 1: Install Dependencies

Open the terminal inside the `lab_3` directory.

Execute:

```bash
npm install
```

### Step 2: Start the Server

Execute:

```bash
node server.js
```

Expected output:

```text
Server running at http://localhost:3000
```

### Step 3: Access the Application

Open the browser or REST Client and use:

```text
http://localhost:3000
```

The server listens on port 3000.

## REST Client Testing

This project uses the `app.http` file to test all API endpoints using the VS Code REST Client extension.

### How to Execute Requests

1. Open the `lab_3` project folder in VS Code.
2. Open the integrated terminal.
3. Start the server using `node server.js`.
4. Open `app.http`.
5. Click Send Request above the required HTTP request.
6. Check the response status and JSON output.

### API Testing

The `app.http` file contains 21 test cases.

| No. | Test Case | Expected Result |
|---|---|---|
| 1 | Home API | 200 OK |
| 2 | Get all books | 200 OK |
| 3 | Get book by ID | 200 OK |
| 4 | Search books by title | 200 OK |
| 5 | Sort ascending | 200 OK |
| 6 | Sort descending | 200 OK |
| 7 | Pagination | 200 OK |
| 8 | Price-range filtering | 200 OK |
| 9 | Combined search and sorting | 200 OK |
| 10 | Create a new book | 201 Created |
| 11 | Create book with invalid data | 400 Bad Request |
| 12 | Update book | 200 OK |
| 13 | Update non-existing book | 404 Not Found |
| 14 | Delete book | 200 OK |
| 15 | Delete non-existing book | 404 Not Found |
| 16 | Get non-existing book | 404 Not Found |
| 17 | Invalid sorting field | 400 Bad Request |
| 18 | Invalid sorting order | 400 Bad Request |
| 19 | Invalid limit and offset | 400 Bad Request |
| 20 | Invalid price filter | 400 Bad Request |
| 21 | Invalid route | 404 Not Found |

## Screenshots

The following screenshots should be captured from the running project and saved in the `screenshots/` directory.

1. Home API response.
2. Get all books response.
3. Get book by ID response.
4. Search books response.
5. Ascending sorting response.
6. Descending sorting response.
7. Pagination response.
8. Price-range filtering response.
9. Combined search and sorting response.
10. Create book response.
11. Invalid book data response.
12. Update book response.
13. Update non-existing book response.
14. Delete book response.
15. Delete non-existing book response.
16. Get non-existing book response.
17. Invalid query and route responses.

Screenshots should show the request, response status, and response body clearly.

## Problems Faced and Solutions

| Problem Faced | Solution |
|---|---|
| Difficulty setting up the Express server. | Installed Express.js and configured the server correctly. |
| Problems implementing CRUD routes. | Corrected route definitions and HTTP methods. |
| Searching books by title. | Used JavaScript string filtering with `includes()` and `toLowerCase()`. |
| Sorting books incorrectly. | Implemented comparison logic for ascending and descending order. |
| Pagination errors. | Used array `slice()` with validated limit and offset values. |
| Invalid sorting parameters. | Added allowed sorting fields and sorting order validation. |
| Invalid book data. | Added request-body validation for title, author, and price. |
| Updating or deleting non-existing books. | Added book ID checks and returned 404 status codes. |
| Testing multiple API requests. | Used the VS Code REST Client extension with app.http. |

## Learning Outcomes

- Understood how to create an Express.js server using Node.js.
- Learned how to implement REST API endpoints.
- Gained practical experience with GET, POST, PUT, and DELETE methods.
- Learned how to retrieve individual records using route parameters.
- Understood searching and filtering data using query parameters.
- Learned ascending and descending sorting techniques.
- Gained experience implementing pagination using limit and offset.
- Learned price-range filtering.
- Understood how to combine multiple query parameters.
- Practised input validation and error handling.
- Learned to return appropriate HTTP status codes.
- Gained experience testing APIs using VS Code REST Client.
- Improved backend development and debugging skills.

## Conclusion

Lab 3 provided practical experience in developing REST APIs using Node.js and Express.js. The project demonstrates CRUD operations, searching, sorting, pagination, price-range filtering, input validation, and error handling.

Through this lab, practical knowledge of backend development, REST API design, HTTP methods, query parameters, and API testing was improved.