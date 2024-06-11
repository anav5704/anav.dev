import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_BCnasg2C.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var u=\"@vercel/speed-insights\",l=\"1.0.11\",f=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function v(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function a(){return p()===\"development\"}function w(e,n){if(!e||!n)return e;let r=e;try{const s=Object.entries(n);for(const[i,t]of s)if(!Array.isArray(t)){const o=c(t);o.test(r)&&(r=r.replace(o,`/[${i}]`))}for(const[i,t]of s)if(Array.isArray(t)){const o=c(t.join(\"/\"));o.test(r)&&(r=r.replace(o,`/[...${i}]`))}return r}catch{return e}}function c(e){return new RegExp(`/${m(e)}(?=[/?#]|$)`)}function m(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,S=`${d}/script.debug.js`,g=\"/_vercel/speed-insights/script.js\";function R(e={}){var n;if(!v()||e.route===null)return null;f();const s=!!e.dsn?h:g,i=e.scriptSrc||(a()?S:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=u+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=l,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),a()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=w(this.dataset.pathname??\"\",r);R({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});\n"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_slug_.BCTYJiwL.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/anavk/code/web/anav.dev/src/pages/blogs/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blogs/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/anavk/code/web/anav.dev/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/anavk/code/web/anav.dev/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/anavk/code/web/anav.dev/src/pages/research/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/research/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_DMNuYsPY.mjs","C:/Users/anavk/code/web/anav.dev/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_B8re1KS1.mjs","\u0000@astro-page:src/pages/blogs/[...slug]@_@astro":"chunks/_.._BpJY6nF_.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"chunks/_.._ot66oJFY.mjs","\u0000@astro-page:src/pages/research/[...slug]@_@astro":"chunks/_.._0O8tdt9H.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CK07TbmI.mjs","C:/Users/anavk/code/web/anav.dev/src/content/blogs/5-amazign-tips-that-can-help-you-learn-coding-faster.md?astroContentCollectionEntry=true":"chunks/5-amazign-tips-that-can-help-you-learn-coding-faster_4p36GtWX.mjs","C:/Users/anavk/code/web/anav.dev/src/content/blogs/basic-computer-specs-for-beginner-level-programming-2023.md?astroContentCollectionEntry=true":"chunks/basic-computer-specs-for-beginner-level-programming-2023_DzaWSvSU.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/batman.md?astroContentCollectionEntry=true":"chunks/batman_DPUHhsz3.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/great-quotes.md?astroContentCollectionEntry=true":"chunks/great-quotes_grOswt87.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/note-app.md?astroContentCollectionEntry=true":"chunks/note-app_BfeOSvD5.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/online-pass.md?astroContentCollectionEntry=true":"chunks/online-pass_Dl_P15Cg.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/previous-js.md?astroContentCollectionEntry=true":"chunks/previous-js_DyX6nzKL.mjs","C:/Users/anavk/code/web/anav.dev/src/content/research/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion.md?astroContentCollectionEntry=true":"chunks/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion_VqFFi5aS.mjs","C:/Users/anavk/code/web/anav.dev/src/content/research/the-evolution-of-software-engineering-roles-due-to-emerging-technologies.md?astroContentCollectionEntry=true":"chunks/the-evolution-of-software-engineering-roles-due-to-emerging-technologies_CFw6Kusj.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/backend.md?astroContentCollectionEntry=true":"chunks/backend_D9PwiIFd.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/devops.md?astroContentCollectionEntry=true":"chunks/devops_DsKpgy_K.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/frontend.md?astroContentCollectionEntry=true":"chunks/frontend_B0rwJJ1d.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/languages.md?astroContentCollectionEntry=true":"chunks/languages_DiSyDU05.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/testing.md?astroContentCollectionEntry=true":"chunks/testing_BJns5ua-.mjs","C:/Users/anavk/code/web/anav.dev/src/content/blogs/5-amazign-tips-that-can-help-you-learn-coding-faster.md?astroPropagatedAssets":"chunks/5-amazign-tips-that-can-help-you-learn-coding-faster_C-YXYfmD.mjs","C:/Users/anavk/code/web/anav.dev/src/content/blogs/basic-computer-specs-for-beginner-level-programming-2023.md?astroPropagatedAssets":"chunks/basic-computer-specs-for-beginner-level-programming-2023_CTpibTYf.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/batman.md?astroPropagatedAssets":"chunks/batman_CUatlcsr.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/great-quotes.md?astroPropagatedAssets":"chunks/great-quotes_BS8WYk4X.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/note-app.md?astroPropagatedAssets":"chunks/note-app_CqqEL0h-.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/online-pass.md?astroPropagatedAssets":"chunks/online-pass_Cwa9vBoQ.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/previous-js.md?astroPropagatedAssets":"chunks/previous-js_Ca9pdJVS.mjs","C:/Users/anavk/code/web/anav.dev/src/content/research/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion.md?astroPropagatedAssets":"chunks/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion_BpexOmSX.mjs","C:/Users/anavk/code/web/anav.dev/src/content/research/the-evolution-of-software-engineering-roles-due-to-emerging-technologies.md?astroPropagatedAssets":"chunks/the-evolution-of-software-engineering-roles-due-to-emerging-technologies_CNp7kn8i.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/backend.md?astroPropagatedAssets":"chunks/backend_CJDNssEF.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/devops.md?astroPropagatedAssets":"chunks/devops_BiMs0mIY.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/frontend.md?astroPropagatedAssets":"chunks/frontend_Du4qx1uE.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/languages.md?astroPropagatedAssets":"chunks/languages_CY_jcDfx.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/testing.md?astroPropagatedAssets":"chunks/testing_Bh5cHefg.mjs","C:/Users/anavk/code/web/anav.dev/src/content/blogs/5-amazign-tips-that-can-help-you-learn-coding-faster.md":"chunks/5-amazign-tips-that-can-help-you-learn-coding-faster_B32LLA0D.mjs","C:/Users/anavk/code/web/anav.dev/src/content/blogs/basic-computer-specs-for-beginner-level-programming-2023.md":"chunks/basic-computer-specs-for-beginner-level-programming-2023_BKLIn6Ok.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/batman.md":"chunks/batman_IaS1zCOb.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/great-quotes.md":"chunks/great-quotes_DtHBmOyE.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/note-app.md":"chunks/note-app_DDpeyXf7.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/online-pass.md":"chunks/online-pass_B8l4pq9S.mjs","C:/Users/anavk/code/web/anav.dev/src/content/projects/previous-js.md":"chunks/previous-js_DkbvZsp_.mjs","C:/Users/anavk/code/web/anav.dev/src/content/research/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion.md":"chunks/how-chatbots-work-and-their-ethical-concerns-in-assessment-completion_BES9maB8.mjs","C:/Users/anavk/code/web/anav.dev/src/content/research/the-evolution-of-software-engineering-roles-due-to-emerging-technologies.md":"chunks/the-evolution-of-software-engineering-roles-due-to-emerging-technologies_BSoS-41O.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/backend.md":"chunks/backend_DPbRqoBq.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/devops.md":"chunks/devops_DBLMlWUk.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/frontend.md":"chunks/frontend_MMHe8mef.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/languages.md":"chunks/languages_r99b6nBX.mjs","C:/Users/anavk/code/web/anav.dev/src/content/skills/testing.md":"chunks/testing_BLm0wTpD.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DMUWg4dc.js","@astrojs/react/client.js":"_astro/client.5I5BMcNS.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.BCTYJiwL.css","/anav.webp","/favicon.svg","/short1.jpg","/short2.jpg","/short3.jpg","/tall1.jpg","/tall3.jpg","/fonts/DMSans-Variable.ttf","/fonts/PlusJakartaSans-Variable.ttf","/_astro/client.5I5BMcNS.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
