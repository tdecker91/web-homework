# Divvy Homework Assignment

This repository provides a starting point for a basic React + GraphQL application.
All of the configuration boilerplate is complete so you can start by writing the code that you want us to see.

Please **fork** this repo a **private repo** on your GitHub account.

Please share your finished project repo with @thawk55 and @lwintch as part of your submission.

<br />

## Running my code

> Versions used
> - Node: 14.15.4
> - docker: 20.10.7
> - yarn: 1.22.11

- run elixir app tests. From `/elixir` run `docker compose up test`
- run elixir backend. From `/elixir` run `docker compose up web`
- run the ui. From `/webapp` run `yarn` then `yarn start`
- visit [http://localhost:3000](http://localhost:3000)

Objectives Completed
- Frontent
  - [x] Write a basic user interface that allows users to enter, edit, and remove transactions.
  - [x] Provide a pie chart or histogram of the spend per category or spend per day, respectively.
  - [x] Add a user experience
- Backend
  - [x] Seed the database.
  - [x] Write filtering options for transactions, users, and/or merchants. This could include:
    - [x] fuzzy searching for a user by first and last name
    - [x] fuzzy searching for a merchant by name
    - [x] getting back transactions with an amount between `min` and `max` arguments
  - [x] Write a new schema, queries, and mutations to add companies to the app
  - [x] Add a pagination layer to the queries
  - [x] fixed bug in transactions?
  - [x] added test cases for added company functionality

## Project Setup

This repository is split into a web app directory (eg `/webapp`) and two server directories (eg `/webserver` and `/elixir`).

The `/webserver` one includes a functional GraphQL server in NodeJS with MongoDB backing it.

The `/elixir` one includes a functional GraphQL server in Elixir with Postgresql backing it.

If you are applying for backend, you should use the elixir code.
If you are applying for frontend, feel free to use either.

This project is _intentionally not utilizing 3rd party services or create-react-app_ to give you the opportunity to showcase your talents wherever they are, be it the front end or the back end.

## Instructions

If you are pursuing a full stack or backend position, please include elixir code changes in your homework.

See the [Frontend instructions](webapp/README.md) for frontend focused instructions.  If front end only, use the node server in `/webserver`.

See the [Backend instructions](backend.md) for backend focused instructions.