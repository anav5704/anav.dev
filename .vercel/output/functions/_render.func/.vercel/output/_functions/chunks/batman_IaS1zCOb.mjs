import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BCnasg2C.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"id":5,"title":"Batman","description":"This is a simple discord bot made using Google's Palm 2. Batman only speaks when spoken to (you need to @mention him for him to respond) and has been maintaining peace in my homies discord server."};
				const file = "C:/Users/anavk/code/web/anav.dev/src/content/projects/batman.md";
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
