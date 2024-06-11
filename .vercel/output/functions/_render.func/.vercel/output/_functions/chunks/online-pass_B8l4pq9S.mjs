import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BCnasg2C.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"id":1,"title":"Online PASS","description":"Online PASS is a real-time, full-stack progressive web application designed to streamline and enhance the peer assisted study sessions at the University of the South Pacific."};
				const file = "C:/Users/anavk/code/web/anav.dev/src/content/projects/online-pass.md";
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
