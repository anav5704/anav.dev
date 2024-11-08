---
id: 17
featured: true
title: Great Quotes
metaTitle: Great Quotes | Next.js Quotes App
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

## Architecture

---

This web application uses a MVC architecture, short for Model-View-Controller. As the name suggests, the system is broken into 3 main components that tightly coupled and frequently communicate with each together. The web server, application server and database server are all hosted on serverless platforms.

### Models

---

The model layer deals with data logic and business logic. It helps the controller talk to the database. PostgreSQL is used to store the data and Prisma ORM is used to create the schemas while Drizzle ORM is used to communicate with teh database. Here is what the user and quote models look like:

![Class diagram](./images/great-quotes-class-diagram.webp)

The relationship shown above is a simple one to may relationship between the user and quote. A user can create multiple quotes sand a quote can belong to one and only one user. These were created using the [Prisma Schema Language](https://www.prisma.io/docs/orm/prisma-schema/overview).

```prisma
model User {
    id     String  @id @default(uuid())
    name   String
    email  String
    quotes Quote[]

    createAt DateTime @default(now())
}

model Quote {
    id      String @id @default(uuid())
    content String
    userId  String
    user    User   @relation(fields: [userId], references: [id])

    createdAt DateTime @default(now())
    updatedAt DateTime @default(now())

    @@index([userId])
}
```

### Views

---

The view layer handles the UI logic and generates UI components. React JS is used to create interactive UI components. Next UI is used as the primary component library for things like buttons and modals. Internal state is used to keep track of which models visible on the screen. Zod is used to validate user inputs for the modals. The quotes and their authors are fetched on each request and the webpage is rendered on the server.

### Controllers

---

Controllers are the functions that act as a link between the model and view. They act as a middleman between the internal (web app) and external (database) parts of the system. This app uses Next JS API endpoints as its controllers, which are mostly database queries written in Drizzle. Here is an example of a controller that is responsible for creating quotes:

```ts
export async function POST(req: Request) {
    const user = await currentUser();
    const { quote } = await req.json();

    try {
        const quote = await db.insert(Quote).values({
            userId: user.id,
            content: quote,
            id: uuid()
        });

        return NextResponse.json(quote);
    } catch (error) {
        console.log("Create quote error", error);
        return new NextResponse("Create quote error", { status: 500 });
    }
}
```

This app has a controller for each of the primary interactions between the user and the system. These interactions are also called "use cases" and here is what the use-case diagram for this app looks like:

![Use case diagram](./images/great-quotes-usecase-digram.webp)

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
