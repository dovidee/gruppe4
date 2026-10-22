# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Confirmed audiences (2026-10-21), all three primary:

- **Companies** looking for a student group to take on a real IT problem, idea or challenge as a bachelor project (the current partner is Sør-Tre).
- **Employers** evaluating individual members for jobs or internships: who they are, what they can do, what they have built, how to reach them.
- **UiA / course** supervisors and graders following the bachelor project (IS-310) through the blog.

## Product Purpose

The website of resonansIT (Gruppe 4), a group of IT and information systems bachelor students at the University of Agder. It presents the group, its members, their projects and a project blog, and invites companies to get in touch. Success: a company understands what the group offers and makes contact; an employer finds a member's skills, projects and profiles quickly; course staff can follow progress on the blog.

## Positioning

A small, creative group with deliberately different skill sets (product ownership, frontend, UX/UI, security, project management) whose strength is critiquing each other constructively, so the project never moves forward blindly. Partners: Universitetet i Agder (University of Agder) and Sør-Tre.

## Operating Context

- Content is managed in Sanity (project `4t5fwbp6`, dataset `production`, studio in `studio/`); the site is Next.js in `web/`, deployed on Vercel (`gruppe4.vercel.app`).
- Contact goes through `/api/contact` (Web3Forms plus a Discord webhook).
- The site is bilingual: Norwegian (default) and English, switchable in the UI.

## Capabilities and Constraints

- Partners are named in text only ("Sør-Tre", "Universitetet i Agder" / "University of Agder"); their logos are trademarked and must not be used.
- Group projects (e.g. the three IS-202 Kartverket repos) are one project with per-member GitHub links; members can also have personal projects.
- Blog categories are defined in Sanity. No article search.

## Brand Commitments

- Name: resonansIT. Logo and assets in `resonansIT/` (see `resonansIT/RESONANS.md` for logo rules: the two arcs of the standing-wave "o" keep different tones, no stretching, outlines or shadows).
- Palette (user-pinned, expressed in OKLCH only): Marine `#0A1D3D`, Royal `#305CDE`, Sky `#7C9BF0`, Mist `#F7F9FD`, White `#FFFFFF`; a milder white such as `#F5F5F5` is allowed. CTA accents pinned by the user: light green `#90EE90`, dark magenta `#8B008B`, orange-yellow `#F8D568`.
- Display type pinned by the user: Inter at 800, 6rem/100% (free stand-in for TWK Lausanne).

## Evidence on Hand

- Five member profiles with portraits, bios, skills, LinkedIn, GitHub and email (Sanity `member`).
- Three IS-202 Kartverket repos (Sanity `project`), one blog post (Sanity `post`), the "For bedrifter" copy (Sanity `forCompanies`), a group video (Sanity `home.introVideo`).
- No testimonials, client quotes or metrics exist; do not invent any.

## Product Principles

1. Less text, larger type: every section exists for one reason and says it in one line.
2. One thing at a time: titles appear before the content they introduce, and animations are sequenced rather than simultaneous.
3. Real people, real work: members and projects are shown with their own photos, links and repos.
4. Interactive things look interactive; static things do not pretend to be buttons.
