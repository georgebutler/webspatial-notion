# WebSpatial Notion Architecture Guide

## Project Overview

WebSpatial Notion is a frontend-only React demo that explores a Notion-like productivity interface in both ordinary browsers and WebSpatial-compatible runtimes. It does not include authentication, persistence, collaboration, backend APIs, or production document editing.

The application is a Vite single-page app:

- `src/main.tsx` detects the runtime, applies browser/spatial root classes, conditionally loads the browser model polyfill, and mounts React.
- `src/App.tsx` performs lightweight pathname-based routing without a routing library.
- Route-level views are standalone React components such as `Dashboard`, `DocumentWorkspace`, `Todo`, `Ai`, and `Calendar`.
- `src/index.css` combines Tailwind CSS with the global browser/spatial theme overrides and model layout rules.
- Static PWA files and 3D assets are served directly from `public/`.

### Runtime Modes

`Spatial.prototype.runInSpatialWeb()` determines the runtime before React renders.

- Spatial mode adds `isSpatial` and transparent XR background settings to the document.
- Ordinary browser mode adds `is-web`, applies the light Notion-like theme, and loads `/model-element-polyfill.js` only when `HTMLModelElement` is unavailable.
- Do not load the vendored model polyfill unconditionally. It is incompatible with host-provided spatial model DOM objects.

### Routing

Routing is derived directly from `window.location.pathname` in `src/App.tsx`.

- `/` renders the dashboard shell.
- `/doc/the-solar-system` and other `/doc/:slug` paths render `DocumentWorkspace`.
- `/doc` is accepted but canonicalized to `/doc/the-solar-system`.
- `/todo`, `/ai`, and `/calendar` render their respective route components.
- `vercel.json` rewrites these paths to `index.html` so direct SPA navigation works after deployment.

Document selection uses `history.pushState` and listens for `popstate`. Sidebar scene navigation and dashboard cards use `window.open`, which is intentional for the spatial multi-window experience.

### Spatial UI and Models

The project uses WebSpatial JSX support through:

```json
"jsxImportSource": "@webspatial/react-sdk"
```

Spatialized 2D surfaces use the `enable-xr` JSX attribute and CSS custom properties such as:

- `--xr-background-material`
- `--xr-depth`
- `--xr-back`

`src/Model3D.tsx` is the shared native model wrapper. It imports `Model` from `@webspatial/react-sdk/default`, always enables XR, forwards the model ref, and currently emits lifecycle diagnostics. `src/DocumentWorkspace.tsx` owns model placement, load diagnostics, and the 30-degrees-per-second rotation behavior.

The active model source is `/usdz/vehicle-speedster.usdz`. Model card and detail depth rules live in `src/index.css`. Keep model elements attached to document flow; avoid viewport-fixed positioning. Be cautious with spatialized ancestor containers, clipping, opaque surfaces, and nested XR materials because they can hide native models even when the DOM placeholder exists.

The SDK may expose a proxy-like `ModelRef`; do not assume it passes `instanceof HTMLElement`. Use the documented ref fields such as `ready`, `currentSrc`, and `entityTransform`.

### State and Data

All content is local and in memory:

- Document metadata, Solar System content, and planet-detail state live in `src/DocumentWorkspace.tsx`.
- Todo state lives in `src/Todo.tsx` and resets on reload.
- Dashboard, AI, and calendar content is static.
- There are no network API calls or environment-driven data sources.

## Build & Commands

Use the existing npm scripts:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
npm run avp
```

- `npm run dev`: starts the Vite development server on an externally reachable host.
- `npm run build`: runs TypeScript project references, then creates the Vite production build in `dist/`.
- `npm run lint`: runs ESLint across the repository.
- `npm run preview`: builds and serves the production output on port `5173`.
- `npm run avp`: builds, then runs `webspatial-builder` against `http://localhost:5173`.

Before finalizing source changes, run:

```bash
npm run build
npm run lint
git diff --check
```

There are both `package-lock.json` and `pnpm-lock.yaml` files. Do not regenerate either lockfile unless dependency work is explicitly required. The WebSpatial SDK and builder packages are intentionally pinned to `1.7.0`.

## Code Style

The codebase uses TypeScript, React function components, Tailwind utility classes, and a small amount of global CSS.

- Follow the existing no-semicolon, single-quote style.
- Use PascalCase for components and component files.
- Use camelCase for functions, hooks, state, and local values.
- Prefix custom hooks with `use`.
- Keep route-specific state close to the route component; there is no global state layer.
- Use `import type` for type-only imports because `verbatimModuleSyntax` is enabled.
- Keep imports explicit and preserve `.tsx` extensions where the existing file uses them.
- Prefer existing Tailwind utility patterns for component layout; use `src/index.css` for cross-route theme rules, responsive model rules, or selectors that cannot be expressed cleanly as utilities.
- Preserve the browser/spatial split through `html.is-web` and `html.isSpatial`; do not fork the route tree by runtime.
- Keep accessibility behavior present in the code: button semantics, keyboard activation for clickable cards, labels, and `aria-current`.

TypeScript enables unused-variable checks, bundler module resolution, `erasableSyntaxOnly`, and no fallthrough cases. ESLint applies the recommended JavaScript, TypeScript, React Hooks, and Vite React Refresh rule sets.

Avoid speculative refactors around WebSpatial wrappers. The JSX runtime, `enable-xr` handling, model refs, polyfill startup, and spatial CSS custom properties are tightly coupled to the SDK.

## Testing

There is currently no automated test framework, test script, or test directory.

Validation therefore consists of:

1. `npm run build` for TypeScript and production bundling.
2. `npm run lint` for static analysis and React hook rules.
3. `git diff --check` for whitespace errors.
4. Manual browser checks for routing, responsive layouts, keyboard interaction, and the model polyfill fallback.
5. Manual WebSpatial device/runtime checks for spatial surfaces, native model loading, depth, scrolling attachment, and rotation.

For model debugging, inspect the existing `[WebSpatial model]` console messages and verify whether the ref exposes `ready` and `currentSrc`. A hidden DOM host is expected in spatial mode because the SDK renders the visible model natively.

If tests are introduced later, add a documented `test` script and follow one consistent colocated or dedicated-directory convention rather than mixing both.

## Security

The application has no authentication, backend, secrets, or user-data persistence.

Codebase-specific security constraints:

- Do not add credentials, access tokens, or private endpoints to source files or Vite-exposed client variables.
- Treat everything under `public/` as publicly downloadable.
- Preserve `noopener,noreferrer` on `window.open` calls to prevent opener access.
- Keep document routing based on the known local document list. Do not inject untrusted path or HTML content directly into the DOM.
- Do not modify or replace `public/model-element-polyfill.js` without verifying its upstream source and browser-only loading behavior.
- Validate any new remote model or image source before use. Current models are same-origin static assets.
- Avoid adding `dangerouslySetInnerHTML`; content is currently rendered through React text nodes.

## Configuration

No `.env` files or runtime environment variables are currently used.

Important configuration files:

- `vite.config.ts`: React and Tailwind Vite plugins; development server uses `host: true`.
- `tsconfig.app.json`: browser TypeScript settings and WebSpatial JSX import source.
- `tsconfig.node.json`: TypeScript settings for `vite.config.ts`.
- `eslint.config.js`: flat ESLint configuration; ignores `dist`.
- `vercel.json`: SPA rewrites for all supported routes.
- `public/manifest.webmanifest`: PWA identity, start URL, colors, and icons.
- `index.html`: document metadata, manifest/icon links, root mount, and Vite entry.

The build has no configured `base`, so asset and route references assume deployment at the origin root. Static model URLs use absolute root paths such as `/usdz/vehicle-speedster.usdz`.

When adding a new route:

1. Add pathname handling in `src/App.tsx`.
2. Add any navigation entry that should expose it.
3. Add a matching rewrite in `vercel.json`.
4. Verify direct loading and browser history behavior.

When adding or replacing a model:

1. Store the asset under `public/usdz/` or `public/glb/`.
2. Reference it with a root-relative URL.
3. Keep ordinary-browser fallback behavior separate from the native spatial path.
4. Verify both browser and spatial runtimes before changing SDK versions, the polyfill, or lockfiles.
