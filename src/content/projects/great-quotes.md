---
id: 2
featured: true
title: Great Quotes
metaTitle: Great Quotes - Next JS Quotes App
description: Storage for my friends quotes from highschool and university.
metaDescription: Fullstack quote sharing web app built using Next JS, TailwindCSS, Prisma & Drizzle and Postgres (Neon) with the frontend and backend hosted on Vercel.
createdAt: 2023-12-25T00:00:00+12:00
updatedAt: 2023-12-25T00:00:00+12:00
repo: https://github.com/anav5704/great-quotes
site: https://quotes.anav.dev
---

## Project Overview

---

[![Great Quotes Demo](./images/great-quotes-demo.webp)](https://quotes.anav.dev)

This is a simple web app that hosts some great quotes my friends and I have said throughout highschool nad university. Users can create, update and delete their own quotes and like others quotes after logging in. This project uses the T3 stack and is hosted on [Render](https://render.com) - initial load may take some time as I am on a free tier.

## Technologies Used

---

-   Next JS 14
-   TailwindCSS
-   Next UI
-   Framer Motion
-   Next Auth
-   Prisma
-   Neon PostgreSQL
-   tRPC

## Getting Started

---

First fork and clone the repo. Then, run `npm install` to download all the dependencies. Now, set up your environmental variables. Make a `.env` file in the root of your project with the following variables:

```
NEXTAUTH_URL
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
DIRECT_URL
DATABASE_URL
```

This project also allows quotes to be encrypted (using Cryptr) but is disabled by default. If you want to enable it, uncomment the code for encryption in `src/server/api/routers/quote.ts` and add the following environment variables (also add these to `src/env.js`):

```
NEXT_PUBLIC_CRYPTR
NEXT_CRYPTR
```

Once that is done, run `npm run dev` to view it on localhost.

## Learning Resources

---

-   [Neon PostgreSQL](https://neon.tech/)
-   [Next UI docs](https://www.youtube.com/watch?v=Kz0srrlecRQ&t=719s)
-   [T3 docs](https://t3.gg/)
