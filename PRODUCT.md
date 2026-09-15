# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Professional network and peers — tech community, colleagues, and other developers encountering the site through GitHub, Medium, or professional channels. Not scoped to a specific recruiter-screening or client-sales funnel; the site is a general professional presence.

## Product Purpose

A personal portfolio site for Lyonnel Dzotang Tchassen, Senior IT Developer, presenting his profile, technical skills, experience, and project work. It exists to give the professional community a clear, credible view of his background and technical range.

## Positioning

11+ years of full-stack, backend-leaning experience spanning Java/Spring Boot microservices, AWS cloud-native development, DevOps/CI-CD (GitLab, Terraform), and earlier full-stack (AngularJS/Node.js) and native Android work — depth across the whole delivery chain rather than a single narrow specialty.

## Operating Context

- Deployed as a static site via GitHub Pages: https://coccoonx.github.io/lyonneldzotang/
- Bilingual: `index.html` (French, primary) and `en-ca.html` (English/Canada), fully parallel pages.
- Also containerizable via the included nginx `Dockerfile`.

## Capabilities and Constraints

- Sections: Hero, About, Skills, Experience, Projects, Contact — present on both language versions.
- Skills catalogued by category: Java/JVM, APIs & Services, Cloud AWS, plus DevOps/CI-CD and frontend/mobile stacks referenced in About and Projects.
- Projects section lists real, named GitHub repositories (e.g. Vending Machine API, QG-Gochiver, Dashboard Full-Stack, Gefi, Relieferd, Série Snacks) with year, description, and tech tags — all linking to https://github.com/Coccoonx.
- Dark/light theme toggle (localStorage-persisted, OS-preference fallback) and mobile hamburger nav are existing functional requirements, not incidental.
- No backend, no build tooling, no package manager currently in the repo — plain HTML/CSS/JS.

## Brand Commitments

- Name: Lyonnel Dzotang Tchassen. Current role stated: Senior Consultant @ CGI, Québec, Canada.
- Voice/tagline used in both About and Hero: "L'humain au cœur de l'action" / "L'humain au cœur de l'entreprise" — a human-centered framing of technical work.
- External identity links treated as binding/real: GitHub (github.com/Coccoonx), Medium (medium.com/@dtlyonnel).

## Evidence on Hand

- Career facts (employer, years of experience, certifications, degree — Master IT from Université de Douala, Oracle & AWS certifications), skills, and project list are sourced directly from the existing site content and are treated as factual; future work must not invent additional testimonials, employers, metrics, or projects beyond what's already stated or explicitly provided by the user.
- No constraints were flagged beyond what the current implementation already embodies (static, bilingual, GitHub Pages-deployable); future work has latitude to introduce build tooling or frameworks if it clearly helps, without being required to preserve zero-build as a hard rule.

## Product Principles

1. Content must stay factual and traceable to the user's real career — no fabricated proof, metrics, or projects.
2. Parity between French and English versions is a product requirement, not a nice-to-have: both languages carry the same sections and substance.
3. The site targets broad professional credibility (peers/community) over a narrow conversion funnel — success is a clear, trustworthy technical presence, not a specific CTA metric.
4. Depth across the stack (backend, cloud, DevOps, and full-stack/mobile history) is the core positioning; new content should reinforce breadth-with-depth rather than narrowing to one skill.
