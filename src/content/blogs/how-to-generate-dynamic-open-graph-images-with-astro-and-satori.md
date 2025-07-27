---
title: How To Generate Dynamic Open Graph Images With Astro And Satori.
description: "Learn how to easily generate dynamic Open Graph (OG) images with Astro, Satori and ReSVG during runtime."
createdAt: 2025-07-27T00:00:00+12:00
updatedAt: 2025-07-27T00:00:00+12:00
---

## Introduction

---

Open Graph (OG) images are pretty neat. They are the preview images that are shown when you share your website on social media platforms. Well-designed OG images will  make your website look professional and help it stand out from the crowd. In this article, we'll go over how to implement dynamic Open Graph image generation during runtime in an Astro website using Astro API Endpoints, Satori and ReSVG.

## How It Works

---

Unlike the more common build time approach, we'll be going for a runtime approach. This means all of the OG images will be generated on demand, rather than being generated beforehand. When a page is visited, the client will make a HTTP request to our API.  The OG image API endpoint will obtain the meta title and description from the search parameters, and generate the image using Satori and ReSVG accordingly.


```d2
A: Astro Website
B: Astro API Endpoint
B.A: Satori & ReSVG
B.B: Title
B.C: Description
B.D: Template
B.E: Fonts
B.F: Images
B.G: Open Graph Image

B.style.double-border: false
B.style.fill: "#fff"
B.direction: right

A -> B: HTTP GET {style: { animated: true }}
B.B -> B.A {style: { animated: true }} 
B.C -> B.A {style: { animated: true }} 
B.D -> B.A {style: { animated: true }}
B.E -> B.A {style: { animated: true }}
B.F -> B.A {style: { animated: true }}
B.A -> B.G {style: { animated: true }}
B -> A: Open Graph Image {style: { animated: true }}
```

## Prerequisites

---

[Satori](https://github.com/vercel/satori) - This is a library used to convert HTML& CSS (or JSX in our case) to SVG. It allows us to programmatically define content and structure of the OG image (with support for assets like images and fonts).

```sh
npm install satori
```
[ReSVG](https://github.com/yisibl/resvg-js) - This is a SVG rendering toolkit that we'll use to convert our SVG output from Satori into PNG. We are doing this because PNG is the preferred format for OG images due to its compatibility.

```sh
npm install @resvg/resvg-js
```

## API Endpoint

---

The core image generation logic will live in an Astro API endpoint. Astro endpoints are a simple way to create API endpoints similar to [Next.js API routes](https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware). Create a `og.ts` file in the `src/api` directory and paste this code:

```ts
export const prerender = false;

import { Alice, Geist } from "@utils/getFonts";
import { template } from "@utils/getTemplate";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori from "satori";

export const GET: APIRoute = async ({ url: { searchParams } }) => {
    const title = searchParams.get("title") as string;
    const description = searchParams.get("description") as string;

    const svg = await satori(template({ title, description }), {
        width: 1200,
        height: 630,
        fonts: [Alice, Geist]
    });

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: "zoom",
            value: 2
        }
    });

    const image = resvg.render().asPng();

    return new Response(image, {
        headers: {
            "Content-Type": "image/png"
        }
    });
};
```

This file imports image template and required fonts form `src/lib`. This is to keep everything organized. Depending how your project is setup, you may need to change the import path. The images and fonts that  I use in the OG image are stored in an `assets` directory in the root of my project.

## Image Template

---

Now let's create the template that Satori will use. In this case, I have just created a div which contains an image, heading and paragraph tag. You may optionally style the layout using [TailwindCSS (experimental)](https://og-playground.vercel.app). Create a `getTemplate.ts` file and paste this code:

```ts
import path from "node:path";
import fs from "node:fs";

interface Props {
    title: string;
    description: string;
}

const template = ({ title, description }: Props) => {
    const logoPath = path.join(process.cwd(), "assets/logo.jpg");
    const logo = fs.readFileSync(logoPath);

    return {
        type: "div",
        props: {
            style: { fontFamily: "Geist Sans" },
            children: [
                {
                    type: "img",
                    props: {
                        src: logo.buffer,
                        width: 50,
                        height: 50
                    }
                },
                {
                    type: "h1",
                    props: {
                        style: { fontFamily: "Alice" },
                        children: title
                    }
                },
                {
                    type: "p",
                    props: {
                        style: { textWrap: "balance" },
                        children: description
                    }
                }
            ]
        }
    };
};

export { template };
```

## Image Fonts

---

The last thing to setup is the local font loading. If you don't have the fonts downloaded locally, you can get them from [FontShare](https://www.fontshare.com) or [Google Fonts](https://fonts.google.com). Create a `src/lib/getFonts.ts` file and paste this code:

```ts
import fs from "node:fs";

const Alice = {
    name: "Alice",
    data: fs.readFileSync("assets/Alice.ttf").buffer,
    weight: 400 as const,
    style: "normal" as const
};

const Geist = {
    name: "Geist Sans",
    data: fs.readFileSync("assets/Geist.ttf").buffer,
    weight: 400 as const,
    style: "normal" as const
};

export { Alice, Geist };
```

## Frontend

---

Finally, we just need to call this API endpoint from our Astro frontend. While this will work for every page on your website, it would be better to use this code in an Astro layout file to reduce code duplication.

```astro
---
const { title, description } = Astro.props;

 const queryParams = new URLSearchParams({ title, description });
---

<meta property="og:image" content={"/api/og?" + queryParams} />
```

## Conclusion

---

All in all, implementing open graph images is a great way to elevate your website. And using Astro API endpoints makes this feature super easy to implement. It works for all the pages and generates images on demand. If you are interested in a buildtime approach, feel free to check out [this guide](https://knaap.dev/posts/dynamic-og-images-with-any-static-site-generator) which uses Astro endpoints or [this guide](https://dietcode.io/p/astro-og) which uses Astro hooks.

