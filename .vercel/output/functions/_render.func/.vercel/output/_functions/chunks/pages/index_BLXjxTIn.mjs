/* empty css                           */
import { A as AstroError, i as UnknownContentCollectionError, e as createComponent, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, r as renderTemplate, n as renderComponent, u as unescapeHTML, h as createAstro, g as addAttribute, o as renderHead, p as renderSlot, m as maybeRenderHead } from '../astro_BCnasg2C.mjs';
import 'kleur/colors';
import { $ as $$Image } from './generic_BWZstfbN.mjs';
import pLimit from 'p-limit';
import { p as prependForwardSlash } from '../astro/assets-service_D4vd2qET.mjs';
import 'clsx';
import { format } from 'date-fns';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blogs/5-amazign-tips-that-can-help-you-learn-coding-faster.md": () => import('../5-amazign-tips-that-can-help-you-learn-coding-faster_4p36GtWX.mjs'),"/src/content/blogs/basic-computer-specs-for-beginner-level-programming-2023.md": () => import('../basic-computer-specs-for-beginner-level-programming-2023_DzaWSvSU.mjs'),"/src/content/projects/batman.md": () => import('../batman_DPUHhsz3.mjs'),"/src/content/projects/great-quotes.md": () => import('../great-quotes_grOswt87.mjs'),"/src/content/projects/note-app.md": () => import('../note-app_BfeOSvD5.mjs'),"/src/content/projects/online-pass.md": () => import('../online-pass_Dl_P15Cg.mjs'),"/src/content/projects/previous-js.md": () => import('../previous-js_DyX6nzKL.mjs'),"/src/content/research/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion.md": () => import('../how-chatbots-work-and-their-ethical-concerns-in-assessment-completion_VqFFi5aS.mjs'),"/src/content/research/the-evolution-of-software-engineering-roles-due-to-emerging-technologies.md": () => import('../the-evolution-of-software-engineering-roles-due-to-emerging-technologies_CFw6Kusj.mjs'),"/src/content/skills/backend.md": () => import('../backend_D9PwiIFd.mjs'),"/src/content/skills/devops.md": () => import('../devops_DsKpgy_K.mjs'),"/src/content/skills/frontend.md": () => import('../frontend_B0rwJJ1d.mjs'),"/src/content/skills/languages.md": () => import('../languages_DiSyDU05.mjs'),"/src/content/skills/testing.md": () => import('../testing_BJns5ua-.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blogs":{"type":"content","entries":{"5-amazign-tips-that-can-help-you-learn-coding-faster":"/src/content/blogs/5-amazign-tips-that-can-help-you-learn-coding-faster.md","basic-computer-specs-for-beginner-level-programming-2023":"/src/content/blogs/basic-computer-specs-for-beginner-level-programming-2023.md"}},"projects":{"type":"content","entries":{"note-app":"/src/content/projects/note-app.md","previous-js":"/src/content/projects/previous-js.md","batman":"/src/content/projects/batman.md","great-quotes":"/src/content/projects/great-quotes.md","online-pass":"/src/content/projects/online-pass.md"}},"research":{"type":"content","entries":{"how-chatbots-work-and-their-ethical-concerns-in-assessment-completion":"/src/content/research/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion.md","the-evolution-of-software-engineering-roles-due-to-emerging-technologies":"/src/content/research/the-evolution-of-software-engineering-roles-due-to-emerging-technologies.md"}},"skills":{"type":"content","entries":{"backend":"/src/content/skills/backend.md","devops":"/src/content/skills/devops.md","frontend":"/src/content/skills/frontend.md","languages":"/src/content/skills/languages.md","testing":"/src/content/skills/testing.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blogs/5-amazign-tips-that-can-help-you-learn-coding-faster.md": () => import('../5-amazign-tips-that-can-help-you-learn-coding-faster_C-YXYfmD.mjs'),"/src/content/blogs/basic-computer-specs-for-beginner-level-programming-2023.md": () => import('../basic-computer-specs-for-beginner-level-programming-2023_CTpibTYf.mjs'),"/src/content/projects/batman.md": () => import('../batman_CUatlcsr.mjs'),"/src/content/projects/great-quotes.md": () => import('../great-quotes_BS8WYk4X.mjs'),"/src/content/projects/note-app.md": () => import('../note-app_CqqEL0h-.mjs'),"/src/content/projects/online-pass.md": () => import('../online-pass_Cwa9vBoQ.mjs'),"/src/content/projects/previous-js.md": () => import('../previous-js_Ca9pdJVS.mjs'),"/src/content/research/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion.md": () => import('../how-chatbots-work-and-their-ethical-concerns-in-assessment-completion_BpexOmSX.mjs'),"/src/content/research/the-evolution-of-software-engineering-roles-due-to-emerging-technologies.md": () => import('../the-evolution-of-software-engineering-roles-due-to-emerging-technologies_CNp7kn8i.mjs'),"/src/content/skills/backend.md": () => import('../backend_CJDNssEF.mjs'),"/src/content/skills/devops.md": () => import('../devops_BiMs0mIY.mjs'),"/src/content/skills/frontend.md": () => import('../frontend_Du4qx1uE.mjs'),"/src/content/skills/languages.md": () => import('../languages_CY_jcDfx.mjs'),"/src/content/skills/testing.md": () => import('../testing_Bh5cHefg.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$2 = createAstro();
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} `;
}, "C:/Users/anavk/code/web/anav.dev/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

const $$Astro$1 = createAstro();
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Main;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "SpeedInsights", $$Index$1, {})}<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><title>${title}</title>${renderHead()}</head> <body class="py-20"> <main class="w-11/12 md:w-3/4 lg:w-1/2 mx-auto"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/anavk/code/web/anav.dev/src/layouts/main.astro", void 0);

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { mainContent, fadedContent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h1 class="text-3xl md:text-4xl font-black tracking-normal leading-none first-of-type:mt-0 mt-20 mb-5"> ${mainContent} <span class="faded">${fadedContent}</span> </h1>`;
}, "C:/Users/anavk/code/web/anav.dev/src/components/Header.astro", void 0);

const formatDate = (date) => {
  return format(date, "PPP");
};

const $$ImageGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="mt-10 grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-5"> ${renderComponent($$result, "Image", $$Image, { "src": "/short1.jpg", "alt": "img", "width": 200, "height": 200, "class": "hero-image hidden md:block md:h-40", "loading": "lazy" })} ${renderComponent($$result, "Image", $$Image, { "src": "/anav.webp", "alt": "img", "width": 200, "height": 200, "class": "hero-image row-span-2" })} ${renderComponent($$result, "Image", $$Image, { "src": "/short2.jpg", "alt": "img", "width": 200, "height": 200, "class": "hero-image md:h-40", "loading": "lazy" })} ${renderComponent($$result, "Image", $$Image, { "src": "/tall1.jpg", "alt": "img", "width": 200, "height": 200, "class": "hero-image row-span-2" })} ${renderComponent($$result, "Image", $$Image, { "src": "/tall3.jpg", "alt": "img", "width": 200, "height": 200, "class": "hero-image hidden md:block md:row-span-2" })} ${renderComponent($$result, "Image", $$Image, { "src": "/short3.jpg", "alt": "img", "width": 200, "height": 200, "class": "hero-image md:h-40", "loading": "lazy" })} </section>`;
}, "C:/Users/anavk/code/web/anav.dev/src/components/ImageGrid.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const unsortedSkills = await getCollection("skills");
  const skills = unsortedSkills.sort((a, b) => a.data.id - b.data.id);
  const unsortedProjects = await getCollection("projects");
  const projects = unsortedProjects.sort((a, b) => a.data.id - b.data.id);
  const unfiltereedBlgos = await getCollection("blogs");
  const blogs = unfiltereedBlgos.filter((blog) => blog.data.featured == true);
  const unfilderedResearch = await getCollection("research");
  const research = unfilderedResearch.filter(
    (research2) => research2.data.featured == true
  );
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "title": "v3.0.0" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Header", $$Header, { "mainContent": "Anav", "fadedContent": "aan-avv" })} ${maybeRenderHead()}<article> <p>
Hey! I'm a 1st year Software Engineering student at the
<a href="https://www.usp.ac.fj/" target="_blank">
University of the South Pacific
</a>
who might be a little <em>too</em> passionate about web development.
</p> </article> ${renderComponent($$result2, "ImageGrid", $$ImageGrid, {})}  ${renderComponent($$result2, "Header", $$Header, { "mainContent": "My Skills", "fadedContent": "" })} <article class="space-y-3"> ${skills.map((skill) => renderTemplate`<p> <span class="font-bold">${skill.data.title}</span> ${" - "} ${skill.data.description} ${skill.data.examples.map((example) => renderTemplate`<code class="mr-2">${example}</code>`)} </p>`)} </article>  ${renderComponent($$result2, "Header", $$Header, { "mainContent": "Top Projects", "fadedContent": "" })} <article class="space-y-3"> ${projects.map((project) => renderTemplate`<p> <a${addAttribute("projects/" + project.slug, "href")} class="font-bold"> ${project.data.title} </a> ${" - "} ${project.data.description} </p>`)} </article>  ${renderComponent($$result2, "Header", $$Header, { "mainContent": "Blogs & Research", "fadedContent": "" })} <article class="space-y-3"> ${research.map((research2) => renderTemplate`<div class="text-xl"> <a${addAttribute("research/" + research2.slug, "href")} class="font-bold"> ${research2.data.title} </a> <div class="text-zinc-500 mt-1">
Research • ${formatDate(research2.data.date)} </div> </div>`)} ${blogs.map((blog) => renderTemplate`<div class="text-xl"> <a${addAttribute("blogs/" + blog.slug, "href")} class="font-bold"> ${blog.data.title} </a> <div class="text-zinc-500 mt-1">
Blog • ${formatDate(blog.data.date)} </div> </div>`)} </article> ` })}`;
}, "C:/Users/anavk/code/web/anav.dev/src/pages/index.astro", void 0);

const $$file = "C:/Users/anavk/code/web/anav.dev/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Main as $, $$Header as a, formatDate as f, getCollection as g, index as i };
