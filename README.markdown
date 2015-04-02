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
    ├── index.js         #main service
    ├── node_modules     #add modules: npm i {module} --save
    │   ├── body-parser
    │   ├── express
    │   ├── jade
    │   └── request
    ├── package.json
    └── public          #all client-side code
      └── views
          ├── error.jade
          ├── index.jade
          └── profile.jade
