Chrysalis
=========

A heavy work in progress. Don't expect anything fancy. Or friendly. Yet.

To launch the development environment, simply type `yarn && yarn start`.

## Helpful scripts

There are many helpful scripts in `package.json` you can use when working within Chrysalis. You can activate any of these by running `yarn <script name>` on your command line.

- `rebuild`: Rebuilds native Node.js modules against the version of Node.js that your Electron project is using
- `start`: Starts the development server and application.
- `compile`: Runs the `rebuild` script, compiles the application through Webpack, and outputs into the `dist` folder
- `build:all`: Creates builds for all operating systems
- `build:mac`: Creates a macOS build
- `build:win`: Creates a Windows build
- `build:linux`: Creates a Linux build
- `prettier`: Runs [Prettier](https://prettier.io/) (an opinionated code formatter) on all the code. Most editors also have plugins to run this while working in the application.
- `lint:all`: Runs both linters on JS and CSS
- `lint:js`: Runs eslint on all JS
- `lint:css`: Runs stylelint on all CSS
- `clean:code`: Runs Prettier and all linters
- `test`: Runs all of the tests
- `test:watch`: Starts Jest test runner in watch mode
