# WebSpatial Notion

WebSpatial Notion is a frontend demo designed to showcase what a productivity app like Notion might look like as a WebSpatial app.

This is not a fully functional Notion client. It is a functional frontend demo focused on spatial UI concepts, layout ideas, and interaction patterns rather than production-ready workspace, document editing, authentication, collaboration, or data-sync features.

## What this demo includes

- A dashboard-style home view
- A library view
- A Notion AI-inspired view
- A todo/checklist view
- A calendar view
- Route query support for opening specific views
- WebSpatial environment detection and spatial-specific styling

## What this is not

This is not a complete productivity application or a fully functional client. It is a frontend-only demo intended to communicate the feel of a spatial productivity experience.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- WebSpatial SDK
- WebSpatial Builder

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Preview

Build and preview the app locally:

```bash
npm run preview
```

Run with WebSpatial Builder:

```bash
npm run avp
```

## Notes

The app detects whether it is running in a spatial web environment and adjusts styling accordingly. In non-spatial browsers, it still runs as a regular frontend demo.

### Model element polyfill

The Solar System document uses individual centered USDZ assets for the Sun and each planet. In WebSpatial, the document places those individual `<model>` elements around the Sun and updates their spatial translations in code to create slow orbits. Native `<model>` support is currently limited, so regular browsers load the Immersive Web model-element polyfill from `public/model-element-polyfill.js` during startup. The polyfill renders each individual model independently as a static browser preview; it does not provide one shared camera for a multi-model collection.

The vendored polyfill source is the upstream file at `https://raw.githubusercontent.com/immersive-web/model-element-samples/refs/heads/main/model-element-polyfill/model-element-polyfill.js`. When updating the polyfill, compare the upstream file before replacing `public/model-element-polyfill.js` so renderer, animation, and fallback behavior stay current. There is no app-specific polyfill patch or camera override.

If you change the model markup, keep the `<source type="model/vnd.usdz+zip">` child and a useful fallback image. The polyfill is loaded automatically by `src/main.tsx` only when the browser does not already expose `HTMLModelElement`; WebSpatial environments continue using the SDK's native `<Model>` integration. The old pre-animated `/usdz/Planets.usdz` asset is no longer used by the Solar System document.
