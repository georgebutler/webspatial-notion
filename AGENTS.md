# Project Instructions

## Validation

- Run `npm run build`, `npm run lint`, and `git diff --check` before finalizing source changes.
- There is no automated test suite. Manually verify affected browser routes and spatial model behavior when the change touches runtime-specific UI.

## Runtime and Routing

- Keep one shared React route tree for browser and spatial modes.
- Preserve the `html.is-web` and `html.isSpatial` runtime classes set by `src/main.tsx`.
- Load `public/model-element-polyfill.js` only in ordinary browsers without native `HTMLModelElement` support. Never load it in a native spatial runtime.
- Keep pathname-based routing. `/doc` must continue to canonicalize to `/doc/the-solar-system`.
- Add matching `vercel.json` rewrites for new top-level routes.
- Preserve `noopener,noreferrer` on `window.open` navigation.

## Spatial Models

- Keep inline models attached to normal document flow. Do not use viewport-fixed positioning.
- Preserve separate browser and spatial model assets when texture or runtime compatibility requires them.
- Clamp Reality drag movement. Unbounded meter-space translations can push models outside the inline volume.
- Keep model attachments parented with the entity they describe so they follow repositioning.
- Treat `ModelRef` as a proxy-like SDK object and use documented fields such as `ready`, `currentSrc`, and `entityTransform`.
- Keep `@webspatial/core-sdk`, `@webspatial/react-sdk`, `@webspatial/builder`, and `@webspatial/platform-visionos` pinned to `1.7.0`.

## Code and Dependencies

- Follow the existing TypeScript style: no semicolons, single quotes, React function components, and `import type` for type-only imports.
- Keep route state local. The app has no global state layer, backend, persistence, or environment variables.
- Maintain accessible button semantics, keyboard activation, labels, and `aria-current`.
- Do not regenerate `package-lock.json` or `pnpm-lock.yaml` unless dependency work requires it.
- Treat everything under `public/` as publicly downloadable. Do not add secrets or private endpoints.

## README Screenshot

- Run `npm run screenshots:readme` after visible changes to the Dashboard, navigation rail, or shared browser theme.
- Do not refresh the screenshot for document-only, spatial-only, data-only, or validation-only changes that do not affect the captured Dashboard.
- Visually inspect `docs/images/webspatial-notion-dashboard.webp`. It must remain exactly `1600×1035`.
- Commit the updated screenshot in the same change as the UI that affected it.
- Use the package script instead of ad hoc capture commands so viewport checks and process cleanup remain reproducible.
