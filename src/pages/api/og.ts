export const prerender = false;

import { Alice, Geist } from "@utils/getFonts";
import template from "@utils/getTemplate";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";

import satori from "satori";

export const GET: APIRoute = async ({ request, url: { searchParams } }) => {
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
