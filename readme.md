# Full-Stack User Authentication Module

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Repository Pattern](#repository-pattern)
- [Security Best Practices](#security-best-practices)

## Introduction
This project implements a user authentication module with both front-end and back-end components. The goal is to provide a clean and scalable solution for user registration and login, built with best practices in mind. The module can be used as a starting point for applications requiring secure user authentication.

## Features
- **User Registration:** Users can sign up with email, name, and password.
- **User Login:** Users can sign in using their email and password.
- **JWT Authentication:** Secure authentication using JSON Web Tokens (JWT).
- **Logging:** Integrated logging for API requests and errors.
- **Repository Pattern:** Separation of data access logic using the Repository Pattern.
- **Security Best Practices:** Password hashing, environment validation, and more.

## Tech Stack
- **Frontend:** React
- **Backend:** NestJS (TypeScript)
- **Database:** MongoDB
- **ORM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)

## Architecture Overview
The application is structured into distinct layers to ensure separation of concerns:

- **Frontend:** Responsible for user interface and interaction. Communicates with the backend via REST APIs.
- **Backend:** Handles business logic, data processing, and database interactions. Includes services, controllers, and repositories.
- **Database:** MongoDB is used for persistent data storage.
- **Repository Pattern:** Provides a clean abstraction for data access, making the application easier to maintain and test.
- **Interceptors:** Transform outgoing responses and handle errors uniformly.

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js:** Version 20.x or later
- **npm:** Version 7.x or later
- **MongoDB:** Running instance of MongoDB

### Installation
Clone the repository:

```bash
git clone https://github.com/SaadUrRehmanBaig/easy-generator-assignment
cd easy-generator-assignment
npm run install:all
```
### Environment Variables
Create a `.env` file in the backend directory of the project with the following variables:

```bash
# .env
MONGO_URI=mongodb://localhost:27017/easy-generator
JWT_SECRET= jwt-secret
JWT_EXPIRY= 60m
PORT=3000

# cors settings
FE_URL= http://localhost:3200
ALLOWED_METHODS = GET,HEAD,PUT,PATCH,POST,DELETE
ALLOWED_HEADERS = Content-Type, Authorization


```

### Running the Application

Run following commands in terminal
```bash
npm run start:backend
npm run start:frontend
```

## Repository Pattern
The data access layer is implemented using the Repository Pattern, providing a clear separation between business logic and database operations. The base repository contains common CRUD operations, while specific repositories extend this base to add custom functionality.

## Security Best Practices

This application is built with several security measures to ensure the safety and integrity of user data. Below are the key practices implemented:

### 1. Password Hashing
User passwords are never stored in plain text. Instead, they are securely hashed using `bcrypt` before being stored in the database. `bcrypt` is a widely used hashing algorithm that includes a salt to ensure that even if two users have the same password, their hashed values will differ.

### 2. JWT Authentication
JSON Web Tokens (JWT) are used for authenticating users. The tokens are signed with a secure, private key and include an expiration time to prevent misuse. This ensures that even if a token is intercepted, it cannot be used indefinitely.

### 3. Environment Validation
The application performs environment validation at startup. It checks for the presence and validity of critical environment variables, such as secret keys and database URIs. If any required environment variable is missing or invalid, the application will not start, preventing it from running in an insecure state.
