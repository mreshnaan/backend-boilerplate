# 🚀 Express TypeScript Boilerplate

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.8-2D3748?logo=prisma&logoColor=white)

A production-ready, scalable, and type-safe backend boilerplate built with Node.js, Express, and TypeScript. Designed for developer experience with pre-configured tools for testing, linting, and formatting.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Installation](#1-installation)
  - [Configuration](#2-configuration)
  - [Database Setup](#3-database-setup)
- [Scripts](#-scripts)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Type-Safe**: Full TypeScript support with strict mode enabled.
- **Database ORM**: Prisma Client for safe and easy database access (PostgreSQL/MySQL/SQLite).
- **Validation**: Runtime request validation using Zod.
- **Security**: Pre-configured with Helmet for secure HTTP headers and CORS.
- **API Docs**: Auto-generated Swagger/OpenAPI documentation.
- **Testing**: Complete Jest setup for Unit and Integration tests.
- **Logging**: structured logging with Winston and HTTP logging with Morgan.
- **Code Quality**: ESLint, Prettier, and Husky git hooks for consistent code style.
- **Hot Reloading**: Fast development workflow with Nodemon.

---

## 🛠️ Tech Stack

- **Core**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/) (configurable)
- **Validation**: [Zod](https://zod.dev/)
- **Documentation**: [Swagger UI](https://swagger.io/tools/swagger-ui/)
- **Testing**: [Jest](https://jestjs.io/), [Supertest](https://github.com/ladjs/supertest)
- **Tooling**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/)

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd express-typescript-boilerplate
npm install
```

### 2. Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Open `.env` and configure your environment variables (Database URL, API keys, etc.):

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/myapp?schema=public"
```

### 3. Database Setup

Generate the Prisma Client and run migrations to create the database schema:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run Migrations
npm run prisma:migrate
```

---

## 📜 Scripts

Available `npm` scripts to streamline your workflow:

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start development server with hot-reloading |
| `npm run build` | Compile TypeScript to JavaScript in `dist/` |
| `npm start` | Run the compiled production server |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Check for linting errors |
| `npm run format` | Format code with Prettier |
| `npm run prisma:studio` | Open Prisma Studio GUI |

---

## 📂 Project Structure

```
src/
├── 📂 config/           # Environment config and setup
├── 📂 constants/        # Global constants & status codes
├── 📂 controllers/      # Route logic & request handling
├── 📂 errors/           # Custom error classes
├── 📂 middleware/       # Express middlewares
├── 📂 routes/           # API route definitions
├── 📂 schemas/          # Zod validation schemas
├── 📂 services/         # Business logic layer
├── 📂 types/            # TypeScript type definitions
├── 📂 utils/            # Shared utility functions
├── 📄 app.ts            # App entry point (middleware/routes)
└── 📄 server.ts         # Server startup script
```

---

## 📚 API Documentation

Interactive API documentation is generated using Swagger.

1.  Start the application: `npm run dev`
2.  Open your browser and visit: `http://localhost:3000/api-docs`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to wait for an issue or submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.
