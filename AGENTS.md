This is the Two-Man Instructional Camp website (9.01c Officials Group and 850 Officials). It is an EmDash site: a CMS built on Astro, running on Cloudflare Workers with D1 (database) and R2 (media).

## Where the design comes from

The look comes from the "Two-Man Camp" design system and the page designs in Claude Design (Home, Camp Details, Register & Contact). Tokens and component styles are copied into `src/styles/site.css`. Keep that file the single source for colors, fonts and components; don't add inline colors in pages.

- Night theme (dark stadium navy, one red accent `--brand-red`) for all main pages.
- Day theme (white) only for reading pages: blog posts and extra pages (`.article`).
- Fonts: Anton (headlines, uppercase), Permanent Marker (slogan only), Barlow Condensed (labels, buttons, checklists), Barlow (body). Loaded from Google Fonts in `src/layouts/Site.astro`.
- Slanted ribbons and section tabs use `--slant-angle`; panels are square, buttons get `--radius-sm`.

## What the client edits in the admin (`/_emdash/admin`)

- **Camp Info** (collection `camp`, one entry with slug `two-man-camp`): dates, venue, prices, deadline, registration link, payment info, contact info, focus checklist, daily schedule, instructors, gear note, location notes, map link. Pages read it through `src/utils/camp.ts`, which falls back to defaults for any empty field.
- **Blog Posts** (collection `posts`) at `/blog` and `/blog/[slug]`.
- **Extra Pages** (collection `pages`) at `/pages/[slug]`.
- **Primary menu** (menu `primary`).

## Key files

| File | Purpose |
| --- | --- |
| `src/layouts/Site.astro` | Header, nav, contact bar, footer, EmDash head/body wiring |
| `src/styles/site.css` | Design tokens and all component styles |
| `src/utils/camp.ts` | Loads Camp Info with defaults |
| `src/pages/index.astro`, `camp-details.astro`, `register.astro` | The three main pages |
| `src/pages/blog/` | Blog list and post pages |
| `seed/seed.json` | Schema plus starter content (camp info, one blog post, menu) |
| `public/images/` | Logos (cropped from the flyer; replace with originals when available) |

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:4321, admin at /_emdash/admin
pnpm build
pnpm deploy     # build + wrangler deploy (needs Cloudflare login, D1 + R2 created)
```

Skills for EmDash work are in `.agents/skills/` (start with building-emdash-site). EmDash docs MCP: `https://docs.emdashcms.com/mcp`.

## Rules

- All pages are server-rendered (`output: "server"`); no `getStaticPaths()` for CMS content.
- Image fields are objects; use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug; `entry.data.id` is the database ULID.
- The automatic first-boot seed creates the schema only. Starter content (Camp Info, the first post) is added when someone runs the setup wizard with sample content, or with `npx emdash seed seed/seed.json`. The site still works without it because `camp.ts` has defaults.
- No invented facts: anything not confirmed by the client shows a "coming soon" line until it is filled in the admin.
