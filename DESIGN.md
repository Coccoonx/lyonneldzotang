---
name: Élégance éditoriale
description: A restrained editorial identity for Lyonnel Dzotang Tchassen.
colors:
  primary: "#7e623e"
  primary-hover: "#604826"
  bg: "#f5f1e8"
  bg-soft: "#ece7dc"
  text-primary: "#252620"
  text-secondary: "#58594e"
  border: "#d2cabc"
  border-strong: "#948773"
  button-text: "#f5f1e8"
  dark-primary: "#c6ad83"
  dark-primary-hover: "#e0c9a4"
  dark-bg: "#22231f"
  dark-bg-soft: "#2b2c26"
  dark-text-primary: "#f5f1e8"
  dark-text-secondary: "#bdb9ac"
  dark-border: "#47483d"
  dark-border-strong: "#827966"
  dark-button-text: "#22231f"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3.75rem, 6.7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.3rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-.025em"
  title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.85rem"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: ".85rem"
    lineHeight: 1.6
spacing:
  section: "7rem"
  section-mobile: "4rem"
  row-career: "2.5rem"
  row-project: "2.75rem"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.bg}"
    padding: ".8rem 1.3rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.button-text}"
  button-outline:
    textColor: "{colors.text-primary}"
    padding: ".8rem 1.3rem"
  button-outline-hover:
    backgroundColor: "{colors.bg-soft}"
  tag:
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
---

# Design System: Élégance éditoriale

## Overview

**Creative North Star: "Élégance éditoriale"**

A calm, cultivated personal presence. Aristocratic restraint comes from fine serif typography, generous space, a real portrait and precise rules. The user approved this replacement identity for both French and Canadian English pages.

**Key Characteristics:**

- Ivory, ink and a restrained bronze accent, with a charcoal alternate theme.
- Serif display typography paired with clear sans-serif reading text.
- Open rows, fine separators and square silhouettes.
- Brief entrance motion with immediately visible content under reduced motion.

## Colors

### Primary

Bronze marks selected words, links, small icons and interactive emphasis. The dark theme uses a lighter bronze with the same role. Hover colors are separate tokens. The light bronze is minimally darkened from the proposed swatch to support text contrast on the soft ground.

### Neutral

Ivory is the light page ground; ink is its primary text. The softer ground groups career and contact sections. Charcoal and warm ivory reverse these roles in dark mode. A saved theme overrides the operating-system preference, resolved before painting; without a saved choice the site follows system changes.

Token names match CSS custom properties; `dark-` entries replace their unprefixed counterparts under `data-theme='dark'`. The portrait loading ground and white certification tiles are local asset presentation treatments, not additional brand accents.

## Typography

**Display Font:** Bodoni Moda, with Georgia and serif fallbacks. Used for the personal name, section headings, project and company titles, core skills and the email invitation.

**Body Font:** Source Sans 3, with Segoe UI and sans-serif fallbacks. Used for prose, navigation, dates and technical labels. Dates use tabular numerals. There is no separate mono family.

The frontmatter records desktop roles. About paragraphs run to 70 characters and career lists to 72 characters. Category titles use semibold sans-serif. Mobile project/company titles reduce to 1.6rem.

Both Google Fonts families are self-hosted through `assets/fonts/fonts.css`, using `font-display: swap`. Bodoni Moda ships weights 400/500 and Source Sans 3 ships 400/500/600. Their SIL Open Font License notices remain in `assets/fonts/bodoni-moda-OFL.txt` and `assets/fonts/source-sans-3-OFL.txt`.

## Layout

The shared container is `min(100% - 6rem, 1184px)`. Broad sections use generous vertical spacing and a top rule. About and Contact use two reading columns. Career dates occupy a 210px left column. Projects are open three-column entries: title/date, description/technologies, then a 44px repository link.

- At 1050px and below: gutters become 2rem per side, career dates use 170px, and credentials become two columns.
- At 780px and below: gutters become 1.25rem, the masthead becomes 72px high and exposes the mobile menu. About, Contact and career become one column; project descriptions span the row. Skills use two columns. The name sits beside a compact 130px portrait, with introduction and actions below both.
- At 420px and below: portrait width becomes 98px; skills and credentials become one column. The name uses `clamp(2rem, 8.1vw, 2.7rem)`.

## Elevation & Depth

No box shadows. Depth comes from alternating page grounds, whitespace and fine rules. The sticky masthead is opaque; the mobile menu occupies a fixed layer below it with bounded height and vertical scrolling.

## Shapes

Square buttons, a rectangular portrait and unboxed content rows define the form language. Borders are one pixel. The portrait is cropped to 3:4 with `object-position: 42% 40%`, up to 390px wide on desktop. Technical tags are plain text separated by slashes.

## Components

### Buttons and links

Primary actions use primary text as their fill and page ground as their text; hovering applies bronze. Outline actions use the stronger rule and a soft ground on hover. Buttons have a minimum 48px height; navigation and icon actions have 44px targets. Text actions reveal an underline and move the arrow 4px on hover. Global keyboard focus uses a 2px bronze outline offset by 5px. The email invitation is large serif text with a bronze underline.

### Navigation

An 88px sticky desktop masthead pairs the serif monogram with restrained links. The active section has an underline and `aria-current`. The mobile menu closes on selection, Escape, outside click, focus leaving it or return to desktop width. Theme and language controls use the same visual hierarchy on both pages.

### Open entries

Career entries, projects, highlights and skill categories use top or bottom rules instead of enclosing cards. Core skills are serif words; the full skills catalogue remains a native disclosure. Credentials pair literal badge artwork with readable titles and details. CV actions sit between two stronger horizontal rules.

### Motion

The name arrives over 700ms; the portrait reveals over 700ms after a 140ms delay. Career rows enter once over 600ms when observed at an 8% intersection threshold. Entrance motion uses `cubic-bezier(.16, 1, .3, 1)`. Color/background states take 220ms; underlines and arrows take 350ms. Content remains visible without JavaScript or observation support. Reduced motion disables animations, transitions, smooth scrolling and hover arrow movement.

### Image provenance

The existing user portrait is `assets/lyonnel-portrait.jpg`; it is not synthetic. Nine existing certification graphics were localized unchanged to `assets/badges/`; exact source URLs are recorded in `assets/badges/provenance.json`. Preserve their authentic colors inside the white badge tile in both themes. Small supporting icons remain inline SVG. No generated imagery or separate composition artifact is part of this identity.

## Do's and Don'ts

### Do:

- **Do** apply the same visual rules to French and Canadian English.
- **Do** use open rows and fine separators to organize dense professional content.
- **Do** preserve readable text, keyboard focus and immediately available content.
- **Do** retain provenance and licenses with local identity assets.

### Don't:

- **Don't** reintroduce the drafting grid, corner ticks or enclosing portfolio plates.
- **Don't** make animation a prerequisite for reading content.
- **Don't** recolor or fabricate certification artwork.
