# Project Documentation

## Overview
This project is a React application using TypeScript and Vite. It includes a credit card comparison table with data fetched from an API. The project uses various libraries and tools for development, testing, and styling.

## Key Technologies
- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching
- **React Window**: Virtualized lists
- **Zod**: Schema validation
- **Vitest**: Testing framework

## Project Structure
- **src/**: Contains the main application code.
  - **App.tsx**: Main application component.
  - **main.tsx**: Entry point of the application.
  - **index.css**: Global styles.
  - **creditCard/**: Contains components, services, and types related to credit cards.
    - **CreditCardTable.tsx**: Component for displaying the credit card table.
    - **services/**: API and utility functions.
    - **types/**: Type definitions and schemas.
    - **constants/**: Constants used in the credit card components.
- **public/**: Static assets.
- **tests/**: Test files.

## Scripts
Defined in `package.json`:
- **dev**: Starts the development server.
- **build**: Builds the application for production.
- **test**: Runs the test suite.
- **lint**: Runs the linter.

## Running the Project
1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Build for production**: `npm run build`
4. **Run tests**: `npm run test`

