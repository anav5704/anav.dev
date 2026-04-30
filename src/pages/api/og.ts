export const prerender = false;

import { getFonts } from "@utils/getFonts";
import { template } from "@utils/getTemplate";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, request }) => {
    const title = url.searchParams.get("title") as string;
    const description = url.searchParams.get("description") as string;
    const baseUrl = new URL(request.url).origin;

    const { Alice, Geist } = await getFonts();

    return new ImageResponse(template({ title, description, baseUrl }), {
        width: 1200,
        height: 600,
        fonts: [Alice, Geist]
    });
};
