# Tech Challenge for Homespring

This app uses Typescript, NodeJS, Nodemon and Google books API to allow
the [FE app](https://github.com/garusis/homespring-tech-challenge) to search and display list of books in a friendly
way.

## Requirements

:warning:  Is important to use these specific versions to avoid non-functional issues. This repository contains
an `.nvmrc` file that automatically switch to the required versions if you use NVM.

* NodeJS 14.19.1, you can install using [NVM](https://github.com/nvm-sh/nvm) (Recommended) or downloading from
  the [NodeJS](https://nodejs.org/en/download/) web page.

* Clone the repositories for [Backend](https://github.com/garusis/homespring-tech-challenge-be).

## Installation and Setup

Before anything, install dependencies and checkout main branch

```bash
$ npm i  #This will also automatically setup Husky and some git hooks to lint your staged changes in every commit.
$ git checkout main
```

Then create a `.env` file based on `.env.example`.

## Run

There are multiple scripts that will help you to run an debug the app.

* `npm start` Runs the app in watch mode using Nodemon.
* `npm run inspect` Runs the app using the --inspect flag for nodejs allowing you to use your prefer debug tool.
  Debugger is listening at port 9229
* `npm run inspect-brk` Same as the previous option but stops the app in the first line until a debugger tool is attached.

## Tests

To run the test you just need to type `npm run test`

