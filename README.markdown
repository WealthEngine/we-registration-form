# WE Registration Form

A Simple Node/Express App - Know the Wealth of People that Sign Up Online

This app reads a person's name and address from a form POST and sends it to the WE API.
The WE API then responds with wealth data about that person.

## Quick Start

    npm install
    npm start

## WE recommend Nodemon

    npm install -g nodemon
    nodemon index.js

## Folder Structure
    .
    ├── README.markdown
    ├── index.js            # main service
    ├── node_modules
    │   ├── body-parser
    │   ├── express
    │   ├── jade
    │   └── request
    ├── package.json
    └── public              # all client-side code
      └── views
          ├── index.jade      # main input form
          ├── profile.jade    # shown on success result
          └── error.jade      # shown on error result
