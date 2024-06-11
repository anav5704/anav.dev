import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BCnasg2C.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"id":1,"title":"Languages","description":"Proficient in a variety of programming languages & capable of building high quality software.","examples":["C++","GoLang","TypeScript","JavaScript"]};
				const file = "C:/Users/anavk/code/web/anav.dev/src/content/skills/languages.md";
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
