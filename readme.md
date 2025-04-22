# Library Management System

A web-based Library Management System built with Node.js, Express, MongoDB, and EJS. This application allows users to manage books, borrow and return books, and handle user authentication and authorization.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Role-Based Access Control**: Admin users can add books, while members can borrow and return books.
- **Book Management**: Add, view, and filter books by availability or borrowing status.
- **Borrowing System**: Users can borrow books with due dates and return them.
- **Fine Calculation**: Automatically calculates fines for overdue books.
- **Responsive Design**: Styled with SCSS and compiled to CSS for a clean and user-friendly interface.

## Project Structure

# 📁 Library-Management-System

- controllers/ — Handles application logic  
- db/ — Database connection setup  
- middleware/ — Middleware for authentication and authorization  
- model/ — Mongoose models for database schemas  
- public/ — Static assets (CSS, uploads, etc.)  
- router/ — Express routers for different routes  
- scss/ — SCSS files for styling  
- services/ — Utility services (e.g., token generation)  
- views/ — EJS templates for rendering pages  
- .env — Environment variables  
- .gitignore — Files to ignore in version control  
- index.js — Main entry point of the application  
- package.json — Project dependencies and scripts  


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```

2. Install Dependencies: 
    ```
    npm install
    ```

3. Set up environment variables: Create a .env file in the root directory and add the following:
    ```
    CONNECTION_STRING=<-mongodb-connection-string>
    SECRET_KEY=<your-secret-key>
    ```

4. Compile SCSS to CSS:
    ```
    npm run sass
    ```

5. Start the server: 
    ```
    npm start
    ```

6. Open your Browser and navigate to:
http://localhost:5000


## Usage

### Admin Features
- Log in as an admin to add books to the library.
- Use the /add route to add books with details like title, category, author, published date, and an image.

### Member Features
- Sign up or log in as a member to borrow and return books.
- View all books on the home page and filter them by availability or borrowing status.
- Borrow books by clicking the "Borrow" button and return them via the "Return" button.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), Cookies
- **Templating**: EJS
- **Styling**: SCSS(compiled to CSS)
- **File Uploads**: Multer

## Developed By
**Vivek Anand**