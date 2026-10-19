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

### Location and directions

The Location section displays the postal address with Google Maps, Apple Maps, and a copy-address option. `location_notes` remains separate for travel and lodging information; an existing `map_url` is offered as an additional Venue map link.

The confirmed Publix Sports Park address is available through `src/utils/camp.ts` defaults. New installations receive the optional `address` text field from the seed. On the existing CMS, add a Camp Info text field with slug `address` to make the street address editable in the admin; changing `seed.json` does not migrate the live schema. A CMS venue change will not inherit the original venue's address or Google place ID.

## Still needed from the camp

- Registration link (the link behind the flyer's QR code)
- How campers pay
- Instructor names and bios, lodging and travel notes
- Original logo files (the current ones are cropped from the flyer)

## Development

```bash
pnpm install
pnpm dev
```

See `AGENTS.md` for how the project is put together.
