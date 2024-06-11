import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BCnasg2C.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"id":3,"title":"Backend","description":"Well versed in API development & experienced with database engines + data modelling.","examples":["Node JS","Express JS","Prisma","Drizzle","PostgreSQL","SQLite","MongoDB"]};
				const file = "C:/Users/anavk/code/web/anav.dev/src/content/skills/backend.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
