# POS System API

## Introduction

This document provides instructions on how to use the POS System API, including how to run the playground, access the Swagger documentation, and start the project.

## Table of Contents

- [Playground](#playground)
- [Swagger Documentation](#swagger-documentation)
- [Starting the Project](#starting-the-project)

## Playground

The playground is a tool for testing and experimenting with the API endpoints directly.

### How to use the Playground

1.  **Run the Playground script:**
    Execute the following command in your terminal from the project root to start the playground:

    ```bash
    npm run playground <filename>.ts
    ```
    To run a specific file in the playground, use the command `npm run playground <filename>.ts`. To run the default playground script (index.ts), use `npm run playground`.

## Swagger Documentation

Swagger is used to generate interactive API documentation, making it easy to understand and test the API endpoints.

### How to use Swagger

1.  **Start the Project:**
    Ensure the project is running. Refer to the [Starting the Project](#starting-the-project) section for instructions.

2.  **Access Swagger UI:**
    Once the project is running, open your browser and navigate to the Swagger UI endpoint. The default path is usually `/api-docs` or `/swagger`. Check your project's configuration (e.g., `src/config/swagger-config.ts`) for the exact path. For example, it might be:

    ```
    http://localhost:3000/api-docs
    ```

3.  **Explore API Endpoints:**
    In the Swagger UI, you will see a list of available API endpoints, their descriptions, parameters, and request/response examples. You can expand each endpoint to get more details and try out the API directly from the browser.

## Starting the Project

Follow these steps to start the POS System API project:

1.  **Install Dependencies:**
    Navigate to the project root directory in your terminal and run:

    ```bash
    npm install
    ```
    This command installs all the necessary dependencies listed in `package.json`.

2.  **Set up Environment Variables:**
    Create a `.env` file in the project root directory if it doesn't exist. Copy the contents from `.env.example` and modify the variables as needed, such as database connection details, API keys, etc.

3.  **Run Database Migrations (if necessary):**
    If your project uses Prisma and requires database migrations, run the following commands to push the schema to the database:

    ```bash
    npm run prisma:push
    ```
    Or to reset the database and push:
    ```bash
    npm run prisma:reset-db
    ```
    Refer to the Prisma documentation and your project's setup for specific migration instructions.

4.  **Build the Project (for production):**
    If you are running the project in a production environment or need to build the TypeScript code, run:

    ```bash
    npm run build
    ```
    This command compiles the TypeScript code into JavaScript files in the `dist` directory.

5.  **Start the Server:**
    Choose one of the following commands to start the server based on your environment:

    - **For Development:**
      Use `nodemon` to start the server with automatic restarts on file changes:
      ```bash
      npm run dev
      ```

    - **For Production (after building):**
      Start the server using the built JavaScript files:
      ```bash
      npm start
      ```
      or
      ```bash
      node dist/server.js
      ```

6.  **Access the API:**
    Once the server is running, you can access the API endpoints using tools like Postman, curl, or directly from your application. The base URL is typically `http://localhost:3000`, but it might be different based on your configuration.

---

**Note:** This README provides general instructions. Refer to the project's specific documentation and configuration files for detailed setup and usage information.
