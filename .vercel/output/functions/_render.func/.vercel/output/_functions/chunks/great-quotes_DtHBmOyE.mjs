import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BCnasg2C.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"id":2,"title":"Great Quotes","description":"This is a website that hosts a collection of great quotes said by my great friends throughout highschool and university. They talk too much and I needed to preserve their words."};
				const file = "C:/Users/anavk/code/web/anav.dev/src/content/projects/great-quotes.md";
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
