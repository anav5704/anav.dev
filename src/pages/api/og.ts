export const prerender = false;

import { getFonts } from "@utils/getFonts";
import { template } from "@utils/getTemplate";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori from "satori";

export const GET: APIRoute = async ({ url, request }) => {
    const title = url.searchParams.get("title") as string;
    const description = url.searchParams.get("description") as string;
    const baseUrl = new URL(request.url).origin;

    const { Alice, Geist } = await getFonts();

    const svg = await satori(template({ title, description, baseUrl }), {
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
