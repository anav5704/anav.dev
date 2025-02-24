---
featured: false
title: Links Dashboard
metaTitle: Link Management System | SvelteKit 5 and Prisma ORM
description: Personal link management system for URL shortening amd redirecting.
metaDescription: mock
createdAt: 2025-01-09T00:00:00+12:00
repo: https://github.com/anav5704/links.anav.dev
site: https://links.anav.dev
---

## Project Overview

---

This is a link management webapp I built for myself. The user-facing site (homepage) looks like a links in bio page similar to LinkTree, while the admin dashboard lets me organize my links by shortening and rerouting them.

<iframe allowfullscreen src="https://www.youtube.com/embed/pXo4qvzqR3k"></iframe>

## Project Motivation

---

Being a University student and a peer mentor, I end up having to share links very regularly. This includes links for online documents, links for surveys, invite links for Viber communities, and more. The issue is that these links are used to identify unique resources, which makes them very long as they have some sort of Id in the URL (like a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)). 

I tried using [Dub](https://dub.co) to shorten these links but I didn't like the fact that all the  links started Dubs own domain. I then tried setting up[ subdomain to external URL redirects on Vercel](http://anav.dev/blogs/how-to-setup-subdomain-to-external-url-redirects-on-vercel). This approach was better as the links started my owm domain. Unfortunately, I had to edit a file and push it to GitHub every time I wanted to update a link.

Then came our University summer break. I tend to work on personal projects during my breaks, and this time, I decided to try out a new meta framework. After a bit of research, I decided to go with [SvelteKit](https://svelte.dev). With the issue of me sharing messy links not solved, I decided to work on a link management system as my first project.

## Project Details

---

The website has 2 main parts. The first is the user facing landing page which lists all my links. When a user clicks on a link, client side logic will track the click event for analytics (I'm using [Umami](https://umami.is) for this). Then, the server sid logic will fetch the full link based on the short link and redirect the user. If the short link was invalid, the user is sent to a link not found page.

```d2
    A: User visits website
    B: User clicks on link
    B.shape: parallelogram
    C: Server looks for full link
    D: Full link \n exists?
    D.shape: diamond
    E: Redirect to error page
    F: Redirect to full link
    G: Click event is tracked
    
    A --> B {style: { animated: true }}
    B --> C {style: { animated: true }}
    B --> G {style: { animated: true }}
    C --> D {style: { animated: true }}
    D --> E: Nah {style: { animated: true }}
    D --> F: Yup {style: { animated: true }}
```
 The second is a admin dashboard which lets me manage all my links. This page can  only be accessed after logging in with a password. I was very lazy so my auth flow is just the server checking if the entered password matches with an environment variable. Core admin features include:

 **Create, update and delete links** - these are the basic operations used to manage the links. A modal opens for each operation which uses [SvelteKit form actions](https://svelte.dev/docs/kit/form-actions) to talk to the database. With these features, I don't have to edit a file and push to GitHUb to make changes like before.

 **Search and filter links** - this just shows all links that match my query. I went for a server side search implementation using [query strings](https://en.wikipedia.org/wiki/Query_string). The cool thing about this is that searching for "anav5704 hub" will show links that have both "anav5704" and "hub" anywhere in their title, subtitle, or URL.

 **Reorder and hide links** - these are some quality of life features I really wanted. I can reorder the links using [drag and drop](https://www.npmjs.com/package/svelte-dnd-action) which will update the order on the homepage. And hiding links will remove them from the homepage but keeps it active so I can use them elsewhere.


## Project Outcomes

---

After ~100 commits, I had successfully built this webapp. It turned out to be a very minimal project that has made it easier for me to deal with links. I previously had my main website,[ anav.dev](https://anav.dev), be the only link on my social profiles. While this  promoted my projects and blogs, it didn't have important information like my email. Now, [links.anav.dev](https://links.anav.dev), is the only link as it acts as a gateway between all my online content. 
 

 As for the admin dashboard, I plan to heavily abuse that in my upcoming semesters. [Neon](https://neon.tech/pricing) offers 500MB free storage, and I ended up with only 1 database table. Alongside this, the webapp is hosted on Vercel and well within their free tier limits. That means I'll be enjoying a custom and self branded link management service for a long time. And if you are wondering what some of the redirects look like, here you go:

| Source | Destination |
|--------|-------------|
| links.anav.dev/github | github.com/anav5704 |
| links.anav.dev/linkedin | linkedin.com/in/aanaav |
| links.anav.dev/resume | drive.google.com/drive/folders/[Id] |


## Future Plans

---

Currently, the link management system has the exact same styles as my personal website. This was done by choice to make both the projects feel like a single website. However, these projects live in separate repos. This means I'd have to change the styling in both codebases if I want to keep them consistent. That would be annoying even if I did so rarely.

I am considering moving both of these projects into a single [Turborepo monorepo](https://turbo.build/repo/docs). That way, I can have shared components and styles. Sadly, this clashes with my plans for the personal website repo. Since that website is self-hosted on Oracle Cloud, it contains infrastructure code. Migrating to a monorepo might be tricky, but I bet it's gonna be a great learning experience.
