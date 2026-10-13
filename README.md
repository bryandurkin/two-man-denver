# Two-Man Instructional Camp website

Website for the Two-Man Instructional Camp (December 10-13, Publix Sports Park, Panama City Beach, Florida), run by 9.01c Officials Group and 850 Officials.

Built with [EmDash](https://emdashcms.com) on Astro, hosted on Cloudflare. The design comes from the "Two-Man Camp" design system in Claude Design.

## Pages

- `/` Home
- `/camp-details` Camp Details
- `/register` Register & Contact
- `/blog` Blog (posts managed in the admin)

## Editing content

Log in at `/_emdash/admin`.

- **Camp Info** holds the dates, prices, registration link, schedule, instructors and contact details used across every page.
- **Blog Posts** for news and articles.
- **Menus > Primary Navigation** for the top menu.

## Still needed from the camp

- Registration link (the link behind the flyer's QR code)
- How campers pay
- Daily schedule, instructor names, map link, lodging and travel notes
- Original logo files (the current ones are cropped from the flyer)

## Development

```bash
pnpm install
pnpm dev
```

See `AGENTS.md` for how the project is put together.
