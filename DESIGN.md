# Design

<!-- impeccable:design-schema 1 -->

## World

**Drafting Plate** — an engineering-drawing register for a senior backend/cloud engineer's portfolio. The composition borrows from technical drafting: measured grids, ruled plates, corner-tick registration marks (in place of colored stripes or glow), and one committed warm-copper accent against a cool ink or vellum ground. Built to replace a generic purple/teal SaaS-template identity (emoji avatar, pill badges, gradient glow, top-stripe cards) flagged in `/impeccable critique` as category-interchangeable.

## Palette

Single committed accent (Committed strategy), not a multi-color system.

- `--primary` / `--accent`: warm copper — `#E0923F` (dark theme), `#A8571C` (light theme)
- `--primary-dark`: `#C97727` (dark) / `#8C4715` (light) — hover state
- `--bg`: `#0A1420` (dark, deep ink navy) / `#EDF2F6` (light, cool vellum paper — deliberately not warm cream, to avoid the default AI-portfolio cream+serif cluster)
- `--bg-card`: `#101F32` (dark) / `#FFFFFF` (light)
- `--border` / `--border-strong`: `#23374C` / `#35506B` (dark), `#CBD8E2` / `#A9BDCC` (light)
- `--text-primary`: `#EAF1F8` (dark) / `#10202E` (light)
- `--text-secondary` / `--text-muted`: `#C1D0DF` / `#93A8BC` (dark) — in light theme these are collapsed to one value, `#3C5468`, to guarantee no low-contrast muted tier (this was a confirmed WCAG AA failure in the prior system: 19 detector-flagged instances).

Dark is the default; light is a deliberate cool-paper alternate, not a category default — chosen because the "use scene" (a technical peer skimming on a laptop, day or night) doesn't force either.

## Type

- Display (`--font-display`): **Overpass** — chosen for its US highway/interstate signage heritage, a concrete engineering/signage lineage rather than an arbitrary "distinctive" pick. (Space Grotesk was the first choice but is itself now a detector-flagged overused AI-portfolio face; swapped out.)
- Body (`--font-body`): **IBM Plex Sans**.
- Data/mono (`--font-mono`): **IBM Plex Mono** — used only for literal data: tech tags, dates, timeline periods, mono labels. Not used as a "technical" costume.

## Components

- **`.plate`**: the site's one recurring card signature. Thin 1px rule border, small radius (6px), corner-tick registration marks (`::before`/`::after`, 2px L-shaped copper ticks) that fade in on hover — replaces the incumbent's colored top-stripe (`.project-card::before` gradient bar) and glow-shadow hover states. Applied to skill categories, project cards, timeline content, highlight items, and the CV panel.
- **Hero mark**: a real portrait photo (`assets/lyonnel-portrait.jpg`, resized/compressed to ~63KB) in a drafting-plate frame — a thin border plus corner-tick registration marks (SVG overlay) at each corner, replacing the emoji avatar (👨‍💻). Frame ratio is portrait (260×320) to match the source photo's aspect.
- **Icon system**: hand-drawn 24×24 stroke icons (1.75px stroke, round caps, single color) for backend/cloud/frontend/mobile/database/devops concepts, replacing all emoji glyphs (skill category icons, About highlight icons, cert/education icons, hero badge dot, flags). Brand marks (GitHub/LinkedIn/Medium logos) remain filled SVGs, since they're literal identity marks, not decorative icon-language.
- **Body grid**: a faint two-axis hairline grid (`background-image`, 64px cells, ~30% border-color opacity, `background-attachment: fixed`) — a deliberate blueprint/graph-paper texture tied directly to the Drafting Plate world, not a decorative default.
- **Skills**: tiered — a "Core stack" row of filled accent pills above a `<details>`-collapsed full breakdown by category, with Certifications/Formations split into a separate ruled list (`.credentials`), distinct from the self-reported skill-tag grid.
- **Contact**: one primary CTA (email, `.btn-primary`, full-width) above a demoted secondary list (`.contact-secondary`); the non-clickable location line uses `.contact-location` (a `<p>`, not a link-styled element) to avoid the false-affordance the incumbent had.

## Motion

One grammar: `0.25s ease` for hover/interactive transitions (color, border, transform, box-shadow — never layout properties like padding/width/height). A `prefers-reduced-motion: reduce` block collapses all transitions/animations to near-zero and disables hover transforms.

## Accessibility carried by the system

- Text contrast: light-theme muted/secondary collapsed to one WCAG-AA-safe value; dark theme's light-on-navy tones sit well above 4.5:1.
- Skip link (`.skip-link`) to `#main` on both pages.
- `:focus-visible` outline in the accent color, globally.
- Theme toggle carries `aria-pressed` and a dynamic `aria-label`, updated in the inline theme script.
- Heading hierarchy fixed (no h2→h4 skip in About; highlight items now use h3).

## Known open item

The CV download links still route through bit.ly shortlinks (user chose to leave as-is for this pass, a P2 in the critique — not addressed).
