# Chrysalis Development Guidelines

## Build Commands
- Start dev server: `yarn start` 
- Build production: `yarn build` 
- Lint JS: `yarn lint:js` 
- Lint CSS: `yarn lint:css` 
- Lint all: `yarn lint:all` 
- Format code: `yarn prettier` 
- Clean code (format + lint): `yarn clean:code` 

## Code Style
- React functional components with hooks (avoid class components)
- Use ES6+ features (arrow functions, destructuring, etc.)
- Prefer `const` over `let`, avoid `var`
- Use JSX for React components
- Import order: React, libraries, local components, styles
- Error handling: use try/catch blocks with proper error reporting
- Use Material-UI components for UI consistency
- Follow ESLint rules (Prettier for formatting)
- Prefer named exports over default exports
- Use camelCase for variables/functions, PascalCase for components
