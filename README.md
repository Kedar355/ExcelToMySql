# Excel to Database Transaction Manager

This project reads transaction data from an Excel file and inserts it into a MySQL database. The frontend, built with React and Material UI, displays the transactions in a user-friendly table with filtering options.

## Features

- **Backend (Java + Apache POI + MySQL)**:
  - Reads an Excel file and extracts transaction data.
  - Inserts data into a MySQL database.
  - Handles different data types safely.

- **Frontend (React + Material UI)**:
  - Displays transactions in a table.
  - Provides search and filter options (store, category, title, price range).
  - Allows clearing filters with a reset button.

## Technologies Used

- **Backend**: Java, Apache POI, MySQL, JDBC
- **Frontend**: React, Material UI
- **Database**: MySQL

## Setup Instructions

### Backend

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/excel-to-database.git
   cd excel-to-database
Configure MySQL Database:

Create a database named amazon_db.
Run the following SQL command to create the transactions table:
sql
```CREATE DATABASE amazon_db;
USE amazon_db;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    txid VARCHAR(50),
    store VARCHAR(50),
    productid VARCHAR(50),
    title TEXT,
    category_id INT,
    category VARCHAR(100),
    sales DECIMAL(10,2),
    price DECIMAL(10,2),
    commission DECIMAL(10,2),
    order_date DATE,
    pid VARCHAR(50),
    affid1 VARCHAR(50),
    status VARCHAR(50),
    added_at DATETIME,
    last_updated DATETIME
);
```
Update Database Credentials: Modify DB_URL, USER, and PASSWORD in ExcelToDatabase.java to match your MySQL settings.

Run the Java Backend: Compile and execute the Java program:

javac ExcelToDatabase.java
java ExcelToDatabase

# Frontend
Navigate to the frontend directory:


```cd frontend```
```Install dependencies:```

```npm install```

Start the frontend:

```npm run dev```
