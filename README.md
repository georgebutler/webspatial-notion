# WebSpatial Notion

WebSpatial Notion is a frontend demo designed to showcase what a productivity app like Notion might look like as a web spatial app.

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
