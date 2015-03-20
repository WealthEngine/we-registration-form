# WE Registration Form

A Simple Node/Express App - Know the Wealth of People that Sign Up Online

This app grabs a person's name and address from a form POST and sends it to the WE API. The WE API then responds with wealth data about that person.

## Quick Start

  npm install
  node start

## WE recommend Nodemon

  npm install -g nodemon
  nodemon index.js

## Folder Structure
  .
  ├── README.markdown
  ├── index.js
  ├── node_modules
  │   ├── body-parser
  │   ├── express
  │   ├── jade
  │   └── request
  ├── package.json
  └── public
      └── views
          ├── error.jade
          ├── index.jade
          └── profile.jade
