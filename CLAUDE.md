# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static personal portfolio site for Lyonnel Dzotang Tchassen (Senior IT Developer), deployed via GitHub Pages at https://coccoonx.github.io/lyonneldzotang/. No build system, package manager, or framework — plain HTML5, CSS3, and vanilla JS embedded directly in the HTML pages.

## Commands

There is no build/lint/test tooling in this repo (no `package.json`). Development is edit-and-preview:

- Preview locally: open `index.html` / `en-ca.html` directly in a browser, or serve the directory with any static file server (e.g. `npx serve .`).
- Docker: `docker build -t lyonneldzotang .` then `docker run -p 8080:80 lyonneldzotang` serves the site via nginx (`Dockerfile` just copies the repo root into `/usr/share/nginx/html`).

## Architecture

- **Two parallel, fully self-contained HTML pages** — `index.html` (French) and `en-ca.html` (English/Canada). There is no templating or shared includes: each page duplicates the full markup. **Any structural, styling, or behavioral change must be applied to both files identically** — this is the single most important thing to remember when editing.
- **Shared assets**: `styles.css` (CSS custom properties in `:root`), `theme-init.js` (loaded synchronously in `<head>`, resolves state before paint) and `script.js` (deferred, all behavior). Language-specific strings in `script.js` branch on `document.documentElement.lang`.
- **Theming**: `data-theme` on `<html>`, resolved in `theme-init.js` (localStorage `theme`, falling back to `prefers-color-scheme`). Light is the `:root` base; dark overrides live under `[data-theme='dark']`.
- **Professional profile switch** (`all` | `tech` | `management`): `data-profile` on `<html>`, resolved in `theme-init.js` from `?profil=` / `?profile=` (aliases `tout`, `gestion`), then localStorage `profile`, default `all`. Content is tagged with `data-profiles="tech management"` (space-separated) at two levels: `.timeline-item` (shown if any of its roles match) and `.timeline-role-block` (one per role when an employer has several, e.g. GUCE). Filtering is pure CSS in `styles.css`; `script.js` syncs both `.profile-switch` radiogroups (hero + Experience toolbar), the `#profileStatus` live count, the URL and the language-switch links, and sends a GA4 `profile_switch` event. Without JS no `data-profile` is set, so everything shows and the switches are hidden. When adding an experience, give it `data-profiles`: without it, the entry shows in every view and is left out of the count. The same `data-profiles` filter also tags skill categories, certifications and project cards. Alternative wordings (hero focus line under the switch, About paragraphs and highlights, Skills title and core list, the Management-only note under Projects) use `data-variant="all tech"` / `"management"` etc.: exactly one variant per mode must match, and without JS the `all` variant shows. Any `[data-profile-set]` button switches the profile.
- **Page sections** (same section `id`s in both language versions): `#home` (hero), `#about`, `#skills`, `#experience`, `#projects`. `#contact` is not a section: it is the `.about-contact` block closing `#about` (no CV download links; the CV is available on request). Nav links and the scroll spy in `script.js` rely on these ids matching between the nav markup and the sections.
- **`script.js` responsibilities**: theme toggle persistence, mobile hamburger menu, active nav link on scroll, timeline entry animation, GA4 custom events, profile switch.
- `favicon.svg` is the shared site icon.
