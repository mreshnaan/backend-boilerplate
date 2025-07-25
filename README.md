# backend boilerplate

## Introduction

This document provides instructions on how to use the backend API, including how to run the playground, access the Swagger documentation, and start the project.

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

Follow these steps to start the backend API project:

1.  **Install Dependencies:**
    Navigate to the project root directory in your terminal and run:

    ```bash
    npm install
    ```

    This command installs all the necessary dependencies listed in `package.json`.

2.  **Set up Environment Variables:**
    Create a `.env` file in the project root directory if it doesn't exist. Copy the contents from `.env.example` and modify the variables as needed, such as database connection details, API keys, etc.

3.  **Database Setup with Prisma:**
    This project uses Prisma as the ORM for database management. Follow these steps to set up your database:

    **a. Generate Prisma Client:**
    First, generate the Prisma client based on your schema:

    ```bash
    npm run prisma:generate
    ```

    **b. Database Migration Options:**
    Choose one of the following options based on your needs:

    - **Push Schema to Database (Development):**
      Use this for development when you want to sync your Prisma schema with the database:

      ```bash
      npm run prisma:push
      ```

    - **Reset Database (Fresh Start):**
      Use this to reset your database and apply the schema (⚠️ **Warning: This will delete all existing data**):

      ```bash
      npm run prisma:reset-db
      ```

    - **Pull Schema from Existing Database:**
      If you have an existing database and want to generate a Prisma schema from it:
      ```bash
      npm run prisma:pull
      ```

    **c. Optional - Prisma Studio (Database GUI):**
    You can use Prisma Studio to view and edit your database data through a web interface:

    ```bash
    npm run prisma:studio
    ```

    This will open Prisma Studio in your browser, typically at `http://localhost:5555`.

    **Database Setup Workflow:**

    - For new projects: `npm run prisma:generate` → `npm run prisma:push`
    - For existing databases: `npm run prisma:pull` → `npm run prisma:generate`
    - For development resets: `npm run prisma:reset-db` → `npm run prisma:generate`

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

## Testing

This project uses Jest as the testing framework with TypeScript support. The test configuration is set up to work with path aliases and follows standard testing patterns.

### Running Tests

- **Run all tests:**

  ```bash
  npm test
  ```

  This runs all test files matching the patterns `*.test.ts` and `*.spec.ts` in the `src` directory.

- **Run tests with debug information:**
  ```bash
  npm run test:debug
  ```
  Use this when you need to debug test issues, especially when dealing with open handles or async operations that don't close properly.

### Test Configuration

The project is configured with the following Jest settings:

- **Test Environment:** Node.js
- **Test Files:** `*.test.ts` and `*.spec.ts` files in the `src` directory
- **Path Aliases:** Supports `@/` alias pointing to `src/` directory
- **TypeScript Support:** Full TypeScript support with `ts-jest` preset

### Writing Tests

Place your test files alongside your source files or in a `__tests__` directory. Example test file structure:

```
src/
  controllers/
    user.controller.ts
    user.controller.test.ts
  services/
    user.service.ts
    user.service.spec.ts
```

## Additional Scripts

The project includes several additional utility scripts:

- **Code Quality:**

  ```bash
  npm run lint            # Check code for linting errors
  npm run lint:fix        # Automatically fix linting errors
  ```

- **Database Management:**

  ```bash
  npm run prisma:studio   # Open Prisma Studio (database GUI)
  npm run prisma:generate # Generate Prisma client
  npm run prisma:push     # Push schema changes to database
  npm run prisma:pull     # Pull schema from existing database
  npm run prisma:reset-db # Reset database (⚠️ Deletes all data)
  ```

- **Development Tools:**
  ```bash
  npm run playground      # Run playground scripts for testing API endpoints
  npm run build           # Compile TypeScript to JavaScript
  npm run dev             # Start development server with auto-reload
  npm start               # Start production server
  ```

---

**Note:** This README provides general instructions. Refer to the project's specific documentation and configuration files for detailed setup and usage information. Make sure your database connection string is properly configured in your `.env` file before running Prisma commands.
