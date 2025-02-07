import type { AstroIntegrationLogger } from "astro"
import { Resvg } from "@resvg/resvg-js"
import { Alice, Geist } from "./fonts"
import template from "./template"
import matter from "gray-matter"
import path from "node:path"
import satori from "satori"
import fs from "node:fs"

interface Params {
    logger: AstroIntegrationLogger,
    pages: {
        pathname: string
    }[]
}

const opengraph = () => ({
    name: "opengraph",
    hooks: {
        "astro:build:done": ({ logger, pages }: Params) => {

            pages.forEach(async ({ pathname }) => {
                if (pathname == "projects/" || pathname == "blogs/") return

                if (pathname.startsWith("projects") || pathname.startsWith("blogs")) {
                    const file = fs.readFileSync(path.join("src/content/", pathname.slice(0, -1) + ".md"))
                    const { title, description } = matter(file).data

                    const svg = await satori(template({ title, description }), {
                        width: 1200,
                        height: 630,
                        fonts: [Alice, Geist],
                    })

                    const resvg = new Resvg(svg, {
                        fitTo: {
                            mode: "width",
                            value: 1200,
                        },
                    })

                    fs.writeFileSync(path.join("dist", pathname, "og.png"), resvg.render().asPng())

                    logger.info(path.join("dist", pathname, "og.png"))
                }
            })
        }
    }
})

export default opengraph