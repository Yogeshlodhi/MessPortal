# Mess Portal

This project is a **Mess Portal** built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows students to apply for leave, post feedback, raise complaints, check their rebate status, and easily access the mess menu. The **Admin Panel** provides corresponding features for students, along with additional administrative tools.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

### Student Features
- **Leave Application**: Students can apply for leave and track their leave status.
- **Post Feedback**: Students can provide feedback for the mess services.
- **Raise Complaints**: Students can raise complaints regarding mess services.
- **Check Rebate Status**: Students can check their rebate status related to the mess.
- **Mess Menu**: Students can easily view the mess menu for each day.

### Admin Features
- **Manage Leave Applications**: Admin can view and approve or reject student leave applications.
- **View Feedback**: Admin can view all student feedback to improve services.
- **Manage Complaints**: Admin can view, respond to, and resolve student complaints.
- **Rebate Management**: Admin can view and manage rebate statuses for students.
- **Mess Menu Management**: Admin can add, modify, or delete items in the mess menu.
- **Student Management**: Admin can manage student profiles and their respective data.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Yogeshlodhi/MessPortal.git
    cd MessPortal
    ```

2. **Set up the server (Backend):**
    - Navigate to the server directory and install dependencies:

    ```bash
    cd server
    npm install
    ```

    - Configure environment variables by creating a `.env` file in the `server` folder with the following keys:

    ```bash
    MONGO_URI=<your_mongo_db_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PORT=<your_preferred_port>
    ```

    - Start the server:

    ```bash
    npm start
    ```

3. **Set up the client (Frontend):**
    - Navigate to the client directory and install dependencies:

    ```bash
    cd client
    npm install
    ```

    - Start the client:

    ```bash
    npm start
    ```

## Usage

After setting up the project, you can access the application:

- **Students**: Visit the student portal to apply for leave, provide feedback, raise complaints, check rebate status, and view the mess menu.
- **Admin**: Access the admin panel to manage student data, leave applications, complaints, feedback, rebates, and mess menu.

### API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login an existing user.
- **GET /api/leave**: Get all leave requests (Admin only).
- **POST /api/leave**: Apply for leave (Student only).
- **GET /api/feedback**: Get all feedback (Admin only).
- **POST /api/feedback**: Post feedback (Student only).
- **GET /api/complaints**: Get all complaints (Admin only).
- **POST /api/complaints**: Raise a complaint (Student only).
- **GET /api/rebates**: Check rebate status (Student only).
- **GET /api/menu**: Get the mess menu.

## Contributing

Contributions are always welcome! Feel free to fork the repository, create a new branch, and submit a pull request with your changes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
