---
id: 2
featured: true
title: Great Quotes
metaTitle: Great Quotes - Next JS Quotes App
description: Storage for my friends quotes from highschool and university.
metaDescription: Fullstack quote sharing web app built using Next JS, TailwindCSS, Prisma & Drizzle and Postgres (Neon) with the frontend and backend hosted on Vercel.
createdAt: 2023-12-25T00:00:00+12:00
updatedAt: 2024-07-17T00:00:00+12:00
repo: https://github.com/anav5704/great-quotes
site: https://quotes.anav.dev
---

## Project Overview

---

[![Great Quotes Demo](./images/great-quotes-demo.webp)](https://quotes.anav.dev)

This is a simple web app that hosts some great quotes my friends and I have said throughout high school and university. Users can create, update and delete their own quotes after logging in. This project Next JS on the front-end with Prisma and Drizzle connected to a PostgreSQL database hosted on Neon. This was my first go at testing, so I've used Jest for unit testing, Cypress for end-to-end testing and Storybook for component testing.

## Technologies Used

---

-   Next JS 14
-   TailwindCSS
-   Next UI
-   Jest
-   Cypress
-   Storybook
-   Next Auth
-   Prisma
-   Drizzle
-   Neon PostgreSQL

## Getting Started

---

First fork and clone the repo. Then, run `npm install` to download all the dependencies. Now, set up your environmental variables. Make a `.env` file in the root of your project with the following variables:

```sh
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="secret"
GOOGLE_CLIENT_ID="client-id"
GOOGLE_CLIENT_SECRET="client-secret"
DATABASE_URL="postgres://user:password@hostname:port/database"
```

Once that is done, run `npm run dev` to view it on
localhost.

## Running Tests

---

To run unit tests, run `npm run test:unit:run`. For end-to-end, you will need to spin up a local dev server first. After that, to run `npm run test:e2e:run`. And finally, for component tests, start Storybook by running `npm run storybook` then run `npm run test:component:run` to run the tests.

## Learning Resources

---

-   [Use Prisma and Drizzle in same project](https://www.anav.dev/blogs/how-to-use-prisma-for-data-modeling-and-drizzle-for-queries)
-   [Storybook Docs](https://storybook.js.org)
-   [Cypress Docs](https://www.cypress.io)
