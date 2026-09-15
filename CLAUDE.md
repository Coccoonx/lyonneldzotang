# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static personal portfolio site for Lyonnel Dzotang Tchassen (Senior IT Developer), deployed via GitHub Pages at https://coccoonx.github.io/lyonneldzotang/. No build system, package manager, or framework — plain HTML5, CSS3, and vanilla JS embedded directly in the HTML pages.

## Commands

There is no build/lint/test tooling in this repo (no `package.json`). Development is edit-and-preview:

- Preview locally: open `index.html` / `en-ca.html` directly in a browser, or serve the directory with any static file server (e.g. `npx serve .`).
- Docker: `docker build -t lyonneldzotang .` then `docker run -p 8080:80 lyonneldzotang` serves the site via nginx (`Dockerfile` just copies the repo root into `/usr/share/nginx/html`).

## Architecture

- **Two parallel, fully self-contained HTML pages** — `index.html` (French) and `en-ca.html` (English/Canada). There is no templating or shared includes: each page duplicates the full markup, and both embed the same inline `<script>` logic at the bottom of the file. **Any structural, styling, or behavioral change must be applied to both files identically** — this is the single most important thing to remember when editing.
- **Shared stylesheet**: `styles.css` is the one shared asset between both pages, using CSS custom properties defined in `:root` for theming.
- **Theming**: dark/light mode is controlled via `data-theme` attribute on `<html>`, set by inline JS (localStorage-backed, falling back to `prefers-color-scheme`). Light-theme overrides live under `[data-theme="light"]` selectors in `styles.css`; dark is the default/base style.
- **Page sections** (same section `id`s in both language versions): `#home` (hero), `#about`, `#skills`, `#experience`, `#projects`, `#contact`. Nav links and the scroll-spy `IntersectionObserver` in the inline script rely on these ids matching between the nav markup and the sections.
- **Inline JS responsibilities** (duplicated per page): theme toggle persistence, mobile hamburger menu open/close, and active-nav-link-on-scroll via `IntersectionObserver`.
- `favicon.svg` is the shared site icon.
